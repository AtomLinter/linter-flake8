module.exports =
  config:
    executableDir:
      type: 'string'
      default: 'None'
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
