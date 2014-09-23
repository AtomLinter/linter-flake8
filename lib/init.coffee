module.exports =
  configDefaults:
    executableDir: null
    maxLineLength: 79
    ignoreErrorCodes: []
    maxComplexity: 10
    selectErrors: null

  activate: ->
    console.log 'activate linter-flake8'
