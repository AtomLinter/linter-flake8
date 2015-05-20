linterPath = atom.packages.getLoadedPackage("linter").path

Linter = require "#{linterPath}/lib/linter"
{findFile} = require "#{linterPath}/lib/utils"

class LinterFlake8 extends Linter
  @syntax: ['source.python']

  executablePath: null

  cmd: ['flake8']

  linterName: 'flake8'

  # A regex pattern used to extract information from the executable's output.
  regex:
    '(.*?):(?<line>\\d+):(?<col>\\d+): ' +
    '(?<message>((?<error>E11|E9)|' +
    '(?<warning>W|E|F4|F84|N*|C|D|Q)|F)\\d+ .*?)\r?\n'

  constructor: (editor)->
    super(editor)

    @configFile = findFile @cwd, ['setup.cfg', 'tox.ini', '.pep8']

    @executableDirListener = atom.config.observe 'linter-flake8.executableDir', =>
      executableDir = atom.config.get 'linter-flake8.executableDir'

      if executableDir
        @executablePath = if executableDir.length > 0 then executableDir else null

    @binaryNameListener = atom.config.observe 'linter-flake8.binaryName', =>
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

  updateCommand: ->
    binary_name = atom.config.get 'linter-flake8.binaryName'
    maxLineLength = atom.config.get 'linter-flake8.maxLineLength'
    errorCodes = atom.config.get 'linter-flake8.ignoreErrorCodes'
    maxComplexity = atom.config.get 'linter-flake8.maxComplexity'
    selectErrors = atom.config.get 'linter-flake8.selectErrors'
    hangClosing = atom.config.get 'linter-flake8.hangClosing'

    cmd = [binary_name]

    if @configFile
      # skip plugins settings if config file is found
      cmd.push '--config', @configFile
    else
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
