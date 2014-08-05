linterPath = atom.packages.getLoadedPackage("linter").path

Linter = require "#{linterPath}/lib/linter"

class LinterFlake8 extends Linter
  @syntax: ['source.python']

  cmd: 'flake8'

  executablePath: null

  linterName: 'flake8'

  # A regex pattern used to extract information from the executable's output.
  regex:
    '(.*?):(?<line>\\d+):(?<col>\\d+): (?<message>((?<error>E11|E9)|(?<warning>W|E|F4|F84|N*|C)|F)\\d+ .*?)\r?\n'

  constructor: (editor)->
    super(editor)

    atom.config.observe 'linter-flake8.executableDir', =>
      @executablePath = atom.config.get 'linter-flake8.executableDir'

    atom.config.observe 'linter-flake8.maxLineLength', =>
      @updateCommand()

    atom.config.observe 'linter-flake8.ignoreErrorCodes', =>
      @updateCommand()

  destroy: ->
    atom.config.unobserve 'linter-flake8.maxLineLength'
    atom.config.unobserve 'linter-flake8.ignoreErrorCodes'
    atom.config.unobserve 'linter-flake8.executableDir'

  updateCommand: ->
    cmd = 'flake8'
    maxLineLength = atom.config.get 'linter-flake8.maxLineLength'
    errorCodes = atom.config.get 'linter-flake8.ignoreErrorCodes'

    if maxLineLength
      cmd = "#{cmd} --max-line-length=#{maxLineLength}"

    if errorCodes and errorCodes.length > 0
      cmd += " --ignore=#{errorCodes.toString()}"

    @cmd = cmd
module.exports = LinterFlake8
