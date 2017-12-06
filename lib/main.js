'use babel';

// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import { CompositeDisposable } from 'atom';

let fs;
let path;
let helpers;
let semver;

function loadDeps() {
  if (!semver) {
    semver = require('semver');
  }
  if (!fs) {
    fs = require('fs-plus');
  }
  if (!helpers) {
    helpers = require('atom-linter');
  }
  if (!path) {
    path = require('path');
  }
}

// Local variables
const parseRegex = /(\d+):(\d+):\s(([A-Z])\d{2,3})\s+(.*)/g;
const execPathVersions = new Map();

const applySubstitutions = (givenExecPath, projDir) => {
  let execPath = givenExecPath;
  const projectName = path.basename(projDir);
  execPath = execPath.replace(/\$PROJECT_NAME/ig, projectName);
  execPath = execPath.replace(/\$PROJECT/ig, projDir);
  const paths = execPath.split(';');
  for (let i = 0; i < paths.length; i += 1) {
    if (fs.existsSync(paths[i])) {
      return paths[i];
    }
  }
  return execPath;
};

const getVersionString = async (versionPath) => {
  if (!Object.hasOwnProperty.call(getVersionString, 'cache')) {
    getVersionString.cache = new Map();
  }
  if (!getVersionString.cache.has(versionPath)) {
    getVersionString.cache.set(
      versionPath,
      await helpers.exec(versionPath, ['--version']),
    );
  }
  return getVersionString.cache.get(versionPath);
};

const generateInvalidPointTrace = async (execPath, match, filePath, textEditor, point) => {
  const flake8Version = await getVersionString(execPath);
  const issueURL = 'https://github.com/AtomLinter/linter-flake8/issues/new';
  const title = encodeURIComponent(`Flake8 rule '${match[3]}' reported an invalid point`);
  const body = encodeURIComponent([
    `Flake8 reported an invalid point for the rule \`${match[3]}\`, ` +
    `with the messge \`${match[5]}\`.`,
    '', '',
    '<!-- If at all possible, please include code that shows this issue! -->',
    '', '',
    'Debug information:',
    `Atom version: ${atom.getVersion()}`,
    `Flake8 version: \`${flake8Version}\``,
  ].join('\n'));
  const newIssueURL = `${issueURL}?title=${title}&body=${body}`;
  return {
    type: 'Error',
    severity: 'error',
    html: 'ERROR: Flake8 provided an invalid point! See the trace for details. ' +
      `<a href="${newIssueURL}">Report this!</a>`,
    filePath,
    range: helpers.generateRange(textEditor, 0),
    trace: [
      {
        type: 'Trace',
        text: `Original message: ${match[3]} — ${match[5]}`,
        filePath,
        severity: 'info',
      },
      {
        type: 'Trace',
        text: `Requested point: ${point.line + 1}:${point.col + 1}`,
        filePath,
        severity: 'info',
      },
    ],
  };
};

const determineExecVersion = async (execPath) => {
  const versionString = await helpers.exec(execPath, ['--version'], { ignoreExitCode: true });
  const versionPattern = /^[^\s]+/g;
  const match = versionString.match(versionPattern);
  if (match !== null) {
    execPathVersions.set(execPath, match[0]);
  }
};

const getFlake8Version = async (execPath) => {
  if (!execPathVersions.has(execPath)) {
    await determineExecVersion(execPath);
  }
  return execPathVersions.get(execPath);
};

export default {
  activate() {
    this.idleCallbacks = new Set();

    let packageDepsID;
    const linterFlake8Deps = () => {
      this.idleCallbacks.delete(packageDepsID);

      // Request checking / installation of package dependencies
      if (!atom.inSpecMode()) {
        require('atom-package-deps').install('linter-flake8');
      }

      // FIXME: Remove after a few versions
      if (typeof atom.config.get('linter-flake8.disableTimeout') !== 'undefined') {
        atom.config.unset('linter-flake8.disableTimeout');
      }
      loadDeps();
    };
    packageDepsID = window.requestIdleCallback(linterFlake8Deps);
    this.idleCallbacks.add(packageDepsID);

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.config.observe('linter-flake8.projectConfigFile', (value) => {
        this.projectConfigFile = value;
      }),
      atom.config.observe('linter-flake8.maxLineLength', (value) => {
        this.maxLineLength = value;
      }),
      atom.config.observe('linter-flake8.ignoreErrorCodes', (value) => {
        this.ignoreErrorCodes = value;
      }),
      atom.config.observe('linter-flake8.maxComplexity', (value) => {
        this.maxComplexity = value;
      }),
      atom.config.observe('linter-flake8.selectErrors', (value) => {
        this.selectErrors = value;
      }),
      atom.config.observe('linter-flake8.hangClosing', (value) => {
        this.hangClosing = value;
      }),
      atom.config.observe('linter-flake8.executablePath', (value) => {
        this.executablePath = value;
      }),
      atom.config.observe('linter-flake8.pycodestyleErrorsToWarnings', (value) => {
        this.pycodestyleErrorsToWarnings = value;
      }),
      atom.config.observe('linter-flake8.flakeErrors', (value) => {
        this.flakeErrors = value;
      }),
      atom.config.observe('linter-flake8.builtins', (value) => {
        this.builtins = value;
      }),
    );
  },

  deactivate() {
    this.idleCallbacks.forEach(callbackID => window.cancelIdleCallback(callbackID));
    this.idleCallbacks.clear();
    this.subscriptions.dispose();
  },

  provideLinter() {
    return {
      name: 'Flake8',
      grammarScopes: ['source.python', 'source.python.django'],
      scope: 'file',
      lintOnFly: true,
      lint: async (textEditor) => {
        if (!atom.workspace.isTextEditor(textEditor)) {
          // Invalid TextEditor
          return null;
        }

        const filePath = textEditor.getPath();
        if (!filePath) {
          // Invalid path
          return null;
        }
        const fileText = textEditor.getText();

        // Load dependencies if they aren't already
        loadDeps();

        const parameters = ['--format=default'];

        const projectPath = atom.project.relativizePath(filePath)[0];
        const baseDir = projectPath !== null ? projectPath : path.dirname(filePath);
        const configFilePath = await helpers.findCachedAsync(baseDir, this.projectConfigFile);
        const execPath = fs.normalize(applySubstitutions(this.executablePath, baseDir));

        // get the version of Flake8
        const version = await getFlake8Version(execPath);

        // stdin-display-name available since 3.0.0
        if (semver.valid(version) && semver.gte(version, '3.0.0')) {
          parameters.push('--stdin-display-name', filePath);
        }

        if (this.projectConfigFile && baseDir !== null && configFilePath !== null) {
          parameters.push('--config', configFilePath);
        } else {
          if (this.maxLineLength) {
            parameters.push('--max-line-length', this.maxLineLength);
          }
          if (this.ignoreErrorCodes.length) {
            parameters.push('--ignore', this.ignoreErrorCodes.join(','));
          }
          if (this.maxComplexity !== 79) {
            parameters.push('--max-complexity', this.maxComplexity);
          }
          if (this.hangClosing) {
            parameters.push('--hang-closing');
          }
          if (this.selectErrors.length) {
            parameters.push('--select', this.selectErrors.join(','));
          }
          if (this.builtins.length) {
            parameters.push('--builtins', this.builtins.join(','));
          }
        }

        parameters.push('-');

        const forceTimeout = 1000 * 60 * 5; // (ms * s * m) = Five minutes
        const options = {
          stdin: fileText,
          cwd: baseDir,
          ignoreExitCode: true,
          timeout: forceTimeout,
          uniqueKey: `linter-flake8:${filePath}`,
        };

        let result;
        try {
          result = await helpers.exec(execPath, parameters, options);
        } catch (e) {
          const pyTrace = e.message.split('\n');
          const pyMostRecent = pyTrace[pyTrace.length - 1];
          atom.notifications.addError('Flake8 crashed!', {
            detail: 'linter-flake8:: Flake8 threw an error related to:\n' +
              `${pyMostRecent}\n` +
              "Please check Atom's Console for more details",
          });
          // eslint-disable-next-line no-console
          console.error('linter-flake8:: Flake8 returned an error', e.message);
          // Tell Linter to not update any current messages it may have
          return null;
        }

        if (result === null) {
          // Process was killed by a future invocation
          return null;
        }

        if (textEditor.getText() !== fileText) {
          // Editor contents have changed, tell Linter not to update
          return null;
        }

        const messages = [];

        let match = parseRegex.exec(result);
        while (match !== null) {
          // Note that these positions are being converted to 0-indexed
          const line = Number.parseInt(match[1], 10) - 1 || 0;
          const col = Number.parseInt(match[2], 10) - 1 || undefined;

          const isErr = (match[4] === 'E' && !this.pycodestyleErrorsToWarnings)
            || (match[4] === 'F' && this.flakeErrors);

          try {
            messages.push({
              type: isErr ? 'Error' : 'Warning',
              text: `${match[3]} — ${match[5]}`,
              filePath,
              range: helpers.generateRange(textEditor, line, col),
            });
          } catch (point) {
            // generateRange encountered an invalid point
            messages.push(generateInvalidPointTrace(execPath, match, filePath, textEditor, point));
          }

          match = parseRegex.exec(result);
        }
        // Ensure that any invalid point messages have finished resolving
        return Promise.all(messages);
      },
    };
  },
};
