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
        parameters.push('-')

        return helpers.exec(atom.config.get('linter-flake8.executablePath'), parameters, stdin: fileText).then (result) ->
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
