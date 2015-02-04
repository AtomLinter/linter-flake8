module.exports =
  configDefaults:
    executableDir: null
    maxLineLength: 79
    ignoreErrorCodes: []
    maxComplexity: 10
    hangClosing: false
    selectErrors: null

  activate: ->
    console.log 'activate linter-flake8'
