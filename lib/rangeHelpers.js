'use babel';

const tokenizedLineForRow = (textEditor, lineNumber) =>
  // Uses non-public parts of the Atom API, liable to break at any time!
  textEditor.tokenizedBuffer.tokenizedLineForRow(lineNumber);

export default {
  tooComplex(textEditor, message, lineNumber) {
    // C901 - 'FUNCTION' is too complex
    // C901 - 'CLASS.METHOD' is too complex

    // // Get the raw symbol
    const symbol = /'(?:[^.]+\.)?([^']+)'/.exec(message)[1];

    // Some variables
    const lineCount = textEditor.getLineCount();
    let line;

    // Parse through the lines, starting where `flake8` says it starts
    for (line = lineNumber; line < lineCount; line += 1) {
      let offset = 0;
      const tokenizedLine = tokenizedLineForRow(textEditor, line);
      if (tokenizedLine === undefined) {
        // Doesn't exist if the line is folded
        break;
      }

      let foundDecorator = false;
      for (let i = 0; i < tokenizedLine.tokens.length; i += 1) {
        const token = tokenizedLine.tokens[i];
        if (token.scopes.includes('meta.function.python')) {
          if (token.value === symbol) {
            return {
              line,
              col: offset,
              endCol: offset + token.value.length,
            };
          }
        }
        // Flag whether we have found the decorator, must be after symbol checks
        if (token.scopes.includes('meta.function.decorator.python')) {
          foundDecorator = true;
        }
        offset += token.value.length;
      }

      if (!foundDecorator) {
        break;
      }
    }

    // Fixing couldn't determine a point, let rangeFromLineNumber make up a range
    return {
      line,
    };
  },

  importedUnused(textEditor, message, lineNumber) {
    // F401 - 'SYMBOL' imported but unused

    // Get the raw symbol and split it into the word(s)
    let symbol = /'([^']+)'/.exec(message)[1];
    [symbol] = symbol.split('.').slice(-1);
    const symbolParts = symbol.split(/\s/);

    // Some variables
    let foundImport = false;
    const lineCount = textEditor.getLineCount();
    let line;
    let start;
    let end;

    // Parse through the lines, starting where `flake8` says it starts
    for (line = lineNumber; line < lineCount; line += 1) {
      let offset = 0;
      const tokenizedLine = tokenizedLineForRow(textEditor, line);
      if (tokenizedLine === undefined) {
        // Doesn't exist if the line is folded
        break;
      }
      // Check each token in the line
      for (let i = 0; i < tokenizedLine.tokens.length; i += 1) {
        const token = tokenizedLine.tokens[i];
        // Only match on the name if we have already passed the "import" statement
        if (foundImport && token.value === symbolParts[0]) {
          start = { line, col: offset };
          end = { line, col: offset + token.value.length };
        }
        // For multi-word symbols('foo as bar'), grab the end point as well
        if (foundImport && symbolParts.length > 1
          && token.value === symbolParts[symbolParts.length - 1]
        ) {
          end = { line, col: offset + token.value.length };
        }
        // Flag whether we have found the import, must be after symbol checks
        if (token.value === 'import' && token.scopes.includes('keyword.control.import.python')) {
          foundImport = true;
        }
        // If we didn't find what we were looking for, move on in the line
        offset += token.value.length;
      }
    }
    if (start !== undefined && end !== undefined) {
      // We found a valid range
      return {
        line: start.line,
        col: start.col,
        endCol: end.col,
      };
    }
    // Fixing couldn't determine a point, let rangeFromLineNumber make up a range
    return {
      line,
    };
  },

  noLocalsString(textEditor, lineNumber) {
    // H501 - do not use locals() for string formatting
    const tokenizedLine = tokenizedLineForRow(textEditor, lineNumber);
    if (tokenizedLine === undefined) {
      return {
        line: lineNumber,
      };
    }
    let offset = 0;
    for (let i = 0; i < tokenizedLine.tokens.length; i += 1) {
      const token = tokenizedLine.tokens[i];
      if (token.scopes.includes('meta.function-call.python')) {
        if (token.value === 'locals') {
          return {
            line: lineNumber,
            col: offset,
            endCol: offset + token.value.length,
          };
        }
      }
      offset += token.value.length;
    }
    return {
      line: lineNumber,
    };
  },
};
