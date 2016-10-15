'use babel';

// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import { CompositeDisposable } from 'atom';
import fs from 'fs-plus';
import path from 'path';
import * as helpers from 'atom-linter';
import rangeHelpers from './rangeHelpers';

// Local variables
const parseRegex = /(\d+):(\d+):\s(([A-Z])\d{2,3})\s+(.*)/g;

// Settings
let disableTimeout;
let projectConfigFile;
let maxLineLength;
let ignoreErrorCodes;
let maxComplexity;
let selectErrors;
let hangClosing;
let executablePath;
let pycodestyleErrorsToWarnings;
let flakeErrors;

const extractRange = ({ code, message, lineNumber, colNumber, textEditor }) => {
  let result;
  const line = lineNumber - 1;
  switch (code) {
    case 'C901':
      result = rangeHelpers.tooComplex(textEditor, message, line);
      break;
    case 'F401':
      result = rangeHelpers.importedUnused(textEditor, message, line);
      break;
    case 'H201':
      // H201 - no 'except:' at least use 'except Exception:'

      // For some reason this rule marks the ":" as the location by default
      result = {
        line,
        col: colNumber - 7,
        endCol: colNumber,
      };
      break;
    case 'H501':
      result = rangeHelpers.noLocalsString(textEditor, line);
      break;
    default:
      result = {
        line,
        col: colNumber - 1,
      };
      break;
  }
  if (Object.hasOwnProperty.call(result, 'endCol')) {
    return [
      [result.line, result.col],
      [result.line, result.endCol],
    ];
  }
  return helpers.rangeFromLineNumber(textEditor, result.line, result.col);
};

const applySubstitutions = (givenExecPath, projDir) => {
  let execPath = givenExecPath;
  const projectName = path.basename(projDir);
  execPath = execPath.replace(/\$PROJECT_NAME/i, projectName);
  execPath = execPath.replace(/\$PROJECT/i, projDir);
  const paths = execPath.split(';');
  for (let i = 0; i < paths.length; i += 1) {
    if (fs.existsSync(paths[i])) {
      return paths[i];
    }
  }
  return execPath;
};

export default {
  activate() {
    require('atom-package-deps').install('linter-flake8');

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.config.observe('linter-flake8.disableTimeout', (value) => {
        disableTimeout = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.projectConfigFile', (value) => {
        projectConfigFile = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.maxLineLength', (value) => {
        maxLineLength = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.ignoreErrorCodes', (value) => {
        ignoreErrorCodes = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.maxComplexity', (value) => {
        maxComplexity = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.selectErrors', (value) => {
        selectErrors = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.hangClosing', (value) => {
        hangClosing = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.executablePath', (value) => {
        executablePath = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.pycodestyleErrorsToWarnings', (value) => {
        pycodestyleErrorsToWarnings = value;
      })
    );
    this.subscriptions.add(
      atom.config.observe('linter-flake8.flakeErrors', (value) => {
        flakeErrors = value;
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  provideLinter() {
    return {
      name: 'Flake8',
      grammarScopes: ['source.python', 'source.python.django'],
      scope: 'file',
      lintOnFly: true,
      lint: async (textEditor) => {
        const filePath = textEditor.getPath();
        const fileText = textEditor.getText();

        const parameters = ['--format=default'];

        const projectPath = atom.project.relativizePath(filePath)[0];
        const baseDir = projectPath !== null ? projectPath : path.dirname(filePath);
        const configFilePath = await helpers.findCachedAsync(baseDir, projectConfigFile);

        if (projectConfigFile && baseDir !== null && configFilePath !== null) {
          parameters.push('--config', configFilePath);
        } else {
          if (maxLineLength) {
            parameters.push('--max-line-length', maxLineLength);
          }
          if (ignoreErrorCodes.length) {
            parameters.push('--ignore', ignoreErrorCodes.join(','));
          }
          if (maxComplexity) {
            parameters.push('--max-complexity', maxComplexity);
          }
          if (hangClosing) {
            parameters.push('--hang-closing');
          }
          if (selectErrors.length) {
            parameters.push('--select', selectErrors.join(','));
          }
        }

        parameters.push('-');

        const execPath = fs.normalize(applySubstitutions(executablePath, baseDir));
        const options = {
          stdin: fileText,
          cwd: path.dirname(textEditor.getPath()),
          stream: 'both',
        };
        if (disableTimeout) {
          options.timeout = Infinity;
        }

        const result = await helpers.exec(execPath, parameters, options);

        if (textEditor.getText() !== fileText) {
          // Editor contents have changed, tell Linter not to update
          return null;
        }

        if (result.stderr && result.stderr.length && atom.inDevMode()) {
          // eslint-disable-next-line no-console
          console.log(`flake8 stderr: ${result.stderr}`);
        }
        const messages = [];

        let match = parseRegex.exec(result.stdout);
        while (match !== null) {
          const line = Number.parseInt(match[1], 10) || 0;
          const col = Number.parseInt(match[2], 10) || 0;
          const isErr = (match[4] === 'E' && !pycodestyleErrorsToWarnings)
            || (match[4] === 'F' && flakeErrors);
          const range = extractRange({
            code: match[3],
            message: match[5],
            lineNumber: line,
            colNumber: col,
            textEditor,
          });

          messages.push({
            type: isErr ? 'Error' : 'Warning',
            text: `${match[3]} — ${match[5]}`,
            filePath,
            range,
          });

          match = parseRegex.exec(result.stdout);
        }
        return messages;
      },
    };
  },
};
