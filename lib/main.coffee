module.exports =
  config:
    executablePath:
      type: 'string'
      default: 'flake8'
      description: 'You might need a different binary name for python2 ' +
        '(e.g. flake8-python2)'
    configFileNames:
      type: 'array'
      default: []
      items:
        type: 'string'
      description: 'Use configuration for flake8 in this file (search is ' +
        'from CWD up until the file is found or the root is ' +
        'reached). If this is empty, or the file is not found, ' +
        'the configuration options from this settings panel will ' +
        'be used. Can be a comma-separated list, in which case ' +
        'filenames are searched left to right and the first one ' +
        'found is used.'
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
    provider =
      grammarScopes: ['source.python', 'source.python.django']
      scope: 'file' # or 'project'
      lintOnFly: false # must be false for scope: 'project'
      lint: (textEditor) ->
        filePath = textEditor.getPath()
        fileText = textEditor.getText()
        parameters = []
