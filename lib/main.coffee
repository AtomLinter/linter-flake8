exec = (require 'child_process').exec

PYTHON_MAJOR_VERSION = 3

setDetectedPythonMajorVersion = ->
  python = exec 'python --version', {}, (err, stdout, stderr) ->
    if not err
      # Python 2 returns in stderr, Python 3 in stdout. Go figure.
      versionString = stdout.trim() + stderr.trim()

      # We extract the major version by position. Works for all of:
      #   - CPython: "Python 3.4.3", "Python 2.7.10"
      #   - PyPy:    "Python 2.7.9 (295ee98b6928, Jun 02 2015, 16:33:44)
      #               [PyPy 2.6.0 with GCC 5.1.0]"
      #   - Jython:  "Jython 2.7.0"
      majorVersion = parseInt(versionString.slice(7, 8), 10)
      if majorVersion > 0
        PYTHON_MAJOR_VERSION = majorVersion

getFlakeBinary = ->
  # Will be inaccurate during initialization, while the (async) `exec` in
  # setDetectedPythonMajorVersion didn't finish its callback.
  # Fine, it will be ready by the time a first lint is requested.
  if PYTHON_MAJOR_VERSION == 2
    return atom.config.get('linter-flake8.executablePathPython2')
  else
    return atom.config.get('linter-flake8.executablePath')

setDetectedPythonMajorVersion()

module.exports =
  config:
    executablePath:
      type: 'string'
      default: 'flake8'
      description: 'Full path to the binary used when the $PATH/virtualenv ' +
        'Python is Python *3*. Wrong Python version detected? ' +
        'Run Atom from a virtualenv!'
    executablePathPython2:
      type: 'string'
      default: 'flake8-python2'
      description: 'Full path to the binary used when the $PATH/virtualenv ' +
        'Python is Python *2*. Wrong Python version detected? ' +
        'Run Atom from a virtualenv!'
    projectConfigFile:
      type: 'string'
      default: ''
      description: 'flake config file relative path from project (e.g. tox.ini or .flake8rc)'
    maxLineLength:
      type: 'integer'
      default: 0
    ignoreErrorCodes:
      type: 'array'
      default: []
      items:
        type: 'string'
    maxComplexity:
      type: 'integer'
      default: 10
    hangClosing:
      type: 'boolean'
      default: false
    selectErrors:
      description: 'input "E, W" to include all errors/warnings'
      type: 'array'
      default: []
      items:
        type: 'string'

  provideLinter: ->
    helpers = require('atom-linter')
    path = require('path')

    provider =
      grammarScopes: ['source.python', 'source.python.django']
      scope: 'file' # or 'project'
      lintOnFly: true # must be false for scope: 'project'
      lint: (textEditor) ->
        filePath = textEditor.getPath()
        fileText = textEditor.getText()
        parameters = []

        if maxLineLength = atom.config.get('linter-flake8.maxLineLength')
          parameters.push('--max-line-length', maxLineLength)
        if (ignoreErrorCodes = atom.config.get('linter-flake8.ignoreErrorCodes')).length
          parameters.push('--ignore', ignoreErrorCodes.join(','))
        if maxComplexity = atom.config.get('linter-flake8.maxComplexity')
          parameters.push('--max-complexity', maxComplexity)
        if atom.config.get('linter-flake8.hangClosing')
          parameters.push('--hang-closing')
        if (selectErrors = atom.config.get('linter-flake8.selectErrors')).length
          parameters.push('--select', selectErrors.join(','))
        if (projectConfigFile = atom.config.get('linter-flake8.projectConfigFile'))
          parameters.push('--config', path.join(atom.project.getPaths()[0], projectConfigFile))
        parameters.push('-')

        return helpers.exec(getFlakeBinary(), parameters, stdin: fileText).then (result) ->
          toReturn = []
          regex = /(\d+):(\d+):\s((E|W|F|C|N)\d{2,3})\s(.*)/g

          while (match = regex.exec(result)) isnt null
            line = parseInt(match[1]) or 0
            col = parseInt(match[2]) or 0
            toReturn.push({
              type: if match[4] is 'E' then 'Error' else 'Warning'
              text: match[3] + '- ' + match[5]
              filePath
              range: [[line - 1, col - 1], [line - 1, col]]
            })
          return toReturn
