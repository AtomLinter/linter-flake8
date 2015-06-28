module.exports =
  config:
    useToxIni:
      type: 'boolean'
      default: false
      title: 'Use tox.ini'
      description: 'Use `tox.ini` in your project folder if found. This will
                    override any settings that have been specified manually and
                    will take precedence over `Use setup.cfg` and
                    `Use .pep8 Config`'
    useSetupCfg:
      type: 'boolean'
      default: false
      title: 'Use setup.cfg'
      description: 'Use `setup.cfg` in your project folder if found. This will
                    override any settings that have been specified manually
                    and will take precedence over `Use .pep8 Config`.'
    useDotPep8Config:
      type: 'boolean'
      default: false
      title: 'Use .pep8 Config'
      description: 'Use `.pep8` in your project folder if found. This will
                    override any settings that have been specified manually.'
    executableDir:
      type: 'string'
      default: ''
    binaryName:
      type: 'string'
      default: 'flake8'
      description: 'You might need a different binary name for python2 ' +
                   '(e.g. flake8-python2)'
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

  activate: ->
    console.log 'activate linter-flake8'
