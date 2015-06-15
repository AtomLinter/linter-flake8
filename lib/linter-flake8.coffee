linterPath = atom.packages.getLoadedPackage("linter").path

Linter = require "#{linterPath}/lib/linter"
{findFile} = require "#{linterPath}/lib/utils"

arrayEqual = (a, b) ->
  a.length is b.length and a.every (elem, i) -> elem is b[i]

class LinterFlake8 extends Linter
  @syntax: ['source.python']

  executablePath: null

  cmd: ['flake8']

  linterName: 'flake8'

  # A regex pattern used to extract information from the executable's output.
  regex:
    '(.*?):(?<line>\\d+):(?<col>\\d+): ' +
    '(?<message>((?<error>E11|E9)|' +
    '(?<warning>W|E|F4|F84|N*|C|D|Q|H)|F)\\d+ .*?)\r?\n'

  constructor: (editor)->
    super(editor)

    @conf_file_names = []
    @configFile = ''
    @updateConfigFile()

    @executableDirListener = atom.config.observe 'linter-flake8.executableDir', =>
      executableDir = atom.config.get 'linter-flake8.executableDir'

      if executableDir
        @executablePath = if executableDir.length > 0 then executableDir else null

    @binaryNameListener = atom.config.observe 'linter-flake8.binaryName', =>
      @updateCommand()

    @configFileNamesListener = atom.config.observe 'linter-flake8.configFileNames', =>
      @updateCommand()

    @maxLineLengthListener = atom.config.observe 'linter-flake8.maxLineLength', =>
      @updateCommand()

    @ignoreErrorCodesListener = atom.config.observe 'linter-flake8.ignoreErrorCodes', =>
      @updateCommand()

    @maxComplexityListener = atom.config.observe 'linter-flake8.maxComplexity', =>
      @updateCommand()

    @selectErrorsListener = atom.config.observe 'linter-flake8.selectErrors', =>
      @updateCommand()

    @hangClosingListener = atom.config.observe 'linter-flake8.hangClosing', =>
      @updateCommand()

  destroy: ->
    @executableDirListener.dispose()
    @binaryNameListener.dispose()
    @maxLineLengthListener.dispose()
    @ignoreErrorCodesListener.dispose()
    @maxComplexityListener.dispose()
    @selectErrorsListener.dispose()
    @hangClosingListener.dispose()

  updateConfigFile: ->
    # get the config file value, if it is different to what is stored in this
    # object (i.e. it has changed), parse the value and search for a matching
    # file
    n_conf_file_names = atom.config.get 'linter-flake8.configFileNames'
    if not arrayEqual n_conf_file_names, @conf_file_names
      console.log 'need update'
      @conf_file_names = n_conf_file_names

      # strip whitespace from each name and remove any empy strings
      tmp_file_names = (i.replace /^\s+|\s+$/g, "" for i in @conf_file_names)
      tmp_file_names = (i for i in tmp_file_names when i isnt '')
      @configFile = ''
      if tmp_file_names.length > 0
        @configFile = findFile @cwd, tmp_file_names
    else
      console.log 'no udpate needed, equal.'

  updateCommand: ->
    binary_name = atom.config.get 'linter-flake8.binaryName'
    maxLineLength = atom.config.get 'linter-flake8.maxLineLength'
    errorCodes = atom.config.get 'linter-flake8.ignoreErrorCodes'
    maxComplexity = atom.config.get 'linter-flake8.maxComplexity'
    selectErrors = atom.config.get 'linter-flake8.selectErrors'
    hangClosing = atom.config.get 'linter-flake8.hangClosing'
    @updateConfigFile()

    cmd = [binary_name]

    if @configFile
      # skip plugins settings if config file is found
      cmd.push '--config', @configFile
    else
      # give a dummy value for the config file if the user didn't want to
      # use one, to stop Flake8 from looking for one in the CWD.
      cmd.push '--config', ''

      if maxLineLength
        cmd.push '--max-line-length', maxLineLength

      if errorCodes and errorCodes.length > 0
        cmd.push '--ignore', errorCodes.toString()

      if maxComplexity
        cmd.push '--max-complexity', maxComplexity

      if selectErrors
        cmd.push '--select', selectErrors.toString()

      if hangClosing
        cmd.push '--hang-closing'
    @cmd = cmd

module.exports = LinterFlake8
