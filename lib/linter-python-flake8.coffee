linterPath = atom.packages.getLoadedPackage("linter").path

Linter = require "#{linterPath}/lib/linter"

class LinterFlake8 extends Linter
  @syntax: ['source.python']

  cmd: 'flake8'

  executablePath: null

  linterName: 'flake8'

  # A regex pattern used to extract information from the executable's output.
  regex:
    '(.*?):(?<line>\\d+):(?<col>\\d+): (?<message>((?<error>E11|E9)|(?<warning>W|E|F4|N*|C)|F)\\d+ .*?)\n'

  constructor: (editor)->
    super(editor)

    atom.config.observe 'linter-python-flake8.executableDir', =>
      @executablePath = atom.config.get 'linter-python-flake8.executableDir'

  destroy: ->
    atom.config.unobserve 'linter-python-flake8.executableDir'

module.exports = LinterFlake8
