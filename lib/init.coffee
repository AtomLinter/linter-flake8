module.exports =
  config:
    executableDir:
      type: 'string'
      default: 'None'
    binaryName:
      type: 'string'
      default: 'flake8'
      description: 'You might need a different binary name for python2 ' +
                   '(e.g. flake8-python2)'
    maxLineLength:
      type: 'integer'
      default: 79
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

  activate: ->
    console.log 'activate linter-flake8'
