module.exports =
  configDefaults:
    executableDir: null
    maxLineLength: 79
    ignoreErrorCodes: []
    maxComplexity: 10

  activate: ->
    console.log 'activate linter-flake8'
