module.exports =
  configDefaults:
    executableDir: null
    maxLineLength: 79
    ignoreErrorCodes: []

  activate: ->
    console.log 'activate linter-flake8'
