tokenizedLineForRow = (textEditor, lineNumber) ->
  textEditor.displayBuffer.tokenizedBuffer.tokenizedLineForRow(lineNumber)
fs = require('fs')
path = require('path')


extractRange = ({code, message, lineNumber, colNumber, textEditor}) ->
  switch code
    when 'C901'
      # C901 - 'FUNCTION' is too complex
      # C901 - 'CLASS.METHOD' is too complex
      symbol = /'(?:[^.]+\.)?([^']+)'/.exec(message)[1]
      while true
        offset = 0
        tokenizedLine = tokenizedLineForRow(textEditor, lineNumber)
        if tokenizedLine is undefined
          break
        foundDecorator = false
        for token in tokenizedLine.tokens
          if 'meta.function.python' in token.scopes
            if token.value is symbol
              return [[lineNumber, offset], [lineNumber, offset + token.bufferDelta]]
          if 'meta.function.decorator.python' in token.scopes
            foundDecorator = true
          offset += token.bufferDelta
        if not foundDecorator
          break
        lineNumber += 1
    when 'E125', 'E127', 'E128', 'E131'
      # E125 - continuation line with same indent as next logical line
      # E127 - continuation line over-indented for visual indent
      # E128 - continuation line under-indented for visual indent
      # E131 - continuation line unaligned for hanging indent
      tokenizedLine = tokenizedLineForRow(textEditor, lineNumber)
      if tokenizedLine is undefined
        break
      offset = 0
      for token in tokenizedLine.tokens
        if not token.firstNonWhitespaceIndex
          return [[lineNumber, 0], [lineNumber, offset]]
        if token.firstNonWhitespaceIndex isnt token.bufferDelta
          return [[lineNumber, 0], [lineNumber, offset + token.firstNonWhitespaceIndex]]
        offset += token.bufferDelta
    when 'E262', 'E265'
      # E262 - inline comment should start with '# '
      # E265 - block comment should start with '# '
      return [[lineNumber, colNumber - 1], [lineNumber, colNumber + 1]]
    when 'F401'
      # F401 - 'SYMBOL' imported but unused
      symbol = /'([^']+)'/.exec(message)[1]
      foundImport = false
      while true
        offset = 0
        tokenizedLine = tokenizedLineForRow(textEditor, lineNumber)
        if tokenizedLine is undefined
          break
        for token in tokenizedLine.tokens
          if foundImport and token.value is symbol
            return [[lineNumber, offset], [lineNumber, offset + token.bufferDelta]]
          if token.value is 'import' and 'keyword.control.import.python' in token.scopes
            foundImport = true
          offset += token.bufferDelta
        lineNumber += 1
    when 'F821', 'F841'
      # F821 - undefined name 'SYMBOL'
      # F841 - local variable 'SYMBOL' is assigned but never used
      symbol = /'([^']+)'/.exec(message)[1]
      tokenizedLine = tokenizedLineForRow(textEditor, lineNumber)
      if tokenizedLine is undefined
        break
      offset = 0
      for token in tokenizedLine.tokens
        if token.value is symbol and offset >= colNumber - 1
          return [[lineNumber, offset], [lineNumber, offset + token.bufferDelta]]
        offset += token.bufferDelta
    when 'H101'
      # H101 - use TODO(NAME)
      return [[lineNumber, colNumber - 1], [lineNumber, colNumber + 3]]
    when 'H201'
      # H201 - no 'except:' at least use 'except Exception:'
      return [[lineNumber, colNumber - 7], [lineNumber, colNumber]]
    when 'H231'
      # H231 - Python 3.x incompatible 'except x,y' construct
      return [[lineNumber, colNumber - 1], [lineNumber, colNumber + 5]]
    when 'H233'
      # H233 - Python 3.x incompatible use of print operator
      return [[lineNumber, colNumber - 1], [lineNumber, colNumber + 4]]
    when 'H236'
      # H236 - Python 3.x incompatible __metaclass__, use six.add_metaclass()
      return [[lineNumber, colNumber - 1], [lineNumber, colNumber + 12]]
    when 'H238'
      # H238 - old style class declaration, use new style (inherit from `object`)
      return [[lineNumber, colNumber - 1], [lineNumber, colNumber + 4]]
    when 'H501'
      # H501 - do not use locals() for string formatting
      tokenizedLine = tokenizedLineForRow(textEditor, lineNumber)
      if tokenizedLine is undefined
        break
      offset = 0
      for token in tokenizedLine.tokens
        if 'meta.function-call.python' in token.scopes
          if token.value is 'locals'
            return [[lineNumber, offset], [lineNumber, offset + token.bufferDelta]]
        offset += token.bufferDelta
    when 'W291'
      # W291 - trailing whitespace
      screenLine = tokenizedLineForRow(textEditor, lineNumber)
      if screenLine is undefined
        break
      return [[lineNumber, colNumber - 1], [lineNumber, screenLine.length]]
  return [[lineNumber, colNumber - 1], [lineNumber, colNumber]]

module.exports =
  config:
    executablePath:
      type: 'string'
      default: 'flake8'
      description: 'Semicolon separated list of paths to a binary (e.g. /usr/local/bin/flake8). ' +
        'Use `$PROJECT` or `$PROJECT_NAME` substitutions for project specific paths ' +
        'e.g. `$PROJECT/.venv/bin/flake8;/usr/bin/flake8`'
    projectConfigFile:
      type: 'string'
      default: ''
      description: 'flake config file relative path from project (e.g. tox.ini or .flake8rc)'
    maxLineLength:
      type: 'integer'
      default: 0
    ignoreErrorCodes:
      type: 'array'
      default: []
      items:
        type: 'string'
    maxComplexity:
      description: 'McCabe complexity threshold (`-1` to disable)'
      type: 'integer'
      default: -1
    hangClosing:
      type: 'boolean'
      default: false
    selectErrors:
      description: 'input "E, W" to include all errors/warnings'
      type: 'array'
      default: []
      items:
        type: 'string'
    pep8ErrorsToWarnings:
      description: 'Convert PEP8 "E" messages to linter warnings'
      type: 'boolean'
      default: false
    flakeErrors:
      description: 'Convert Flake "F" messages to linter errors'
      type: 'boolean'
      default: false

  activate: ->
    require('atom-package-deps').install()

  getProjDir: (file) ->
    atom.project.relativizePath(file)[0]

  getProjName: (projDir) ->
    path.basename(projDir)

  applySubstitutions: (execPath, projDir) ->
    projectName = @getProjName(projDir)
    execPath = execPath.replace(/\$PROJECT_NAME/i, projectName)
    execPath = execPath.replace(/\$PROJECT/i, projDir)
    for p in execPath.split(';')
      if fs.existsSync(p)
        return p
    return execPath

  provideLinter: ->
    helpers = require('atom-linter')

    provider =
      name: 'Flake8'
      grammarScopes: ['source.python', 'source.python.django']
      scope: 'file' # or 'project'
      lintOnFly: true # must be false for scope: 'project'
      lint: (textEditor) =>
        filePath = textEditor.getPath()
        fileText = textEditor.getText()
        parameters = []

        if maxLineLength = atom.config.get('linter-flake8.maxLineLength')
          parameters.push('--max-line-length', maxLineLength)
        if (ignoreErrorCodes = atom.config.get('linter-flake8.ignoreErrorCodes')).length
          parameters.push('--ignore', ignoreErrorCodes.join(','))
        if maxComplexity = atom.config.get('linter-flake8.maxComplexity')
          parameters.push('--max-complexity', maxComplexity)
        if atom.config.get('linter-flake8.hangClosing')
          parameters.push('--hang-closing')
        if (selectErrors = atom.config.get('linter-flake8.selectErrors')).length
          parameters.push('--select', selectErrors.join(','))
        if (projectConfigFile = atom.config.get('linter-flake8.projectConfigFile'))
          parameters.push('--config', path.join(atom.project.getPaths()[0], projectConfigFile))
        parameters.push('-')

        fs = require('fs-plus')
        pep8warn = atom.config.get('linter-flake8.pep8ErrorsToWarnings')
        flakeerr = atom.config.get('linter-flake8.flakeErrors')
        projDir = @getProjDir(filePath) or path.dirname(filePath)
        execPath = fs.normalize(@applySubstitutions(atom.config.get('linter-flake8.executablePath'), projDir))
        cwd = path.dirname(textEditor.getPath())
        return helpers.exec(execPath, parameters, {stdin: fileText, cwd: cwd, stream: 'both'}).then (result) ->
          if (result.stderr and result.stderr.length and atom.inDevMode())
            console.log('flake8 stderr: ' + result.stderr)
          toReturn = []
          regex = /(\d+):(\d+):\s(([A-Z])\d{2,3})\s+(.*)/g

          while (match = regex.exec(result.stdout)) isnt null
            line = parseInt(match[1]) or 0
            col = parseInt(match[2]) or 0
            toReturn.push({
              type: if match[4] is 'E' and not pep8warn or match[4] is 'F' and flakeerr then 'Error' else 'Warning'
              text: match[3] + ' — ' + match[5]
              filePath
              range: extractRange({
                code: match[3]
                message: match[5]
                lineNumber: line - 1
                colNumber: col
                textEditor
              })
            })
          return toReturn
