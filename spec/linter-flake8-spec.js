'use babel';

import * as path from 'path';

const goodPath = path.join(__dirname, 'fixtures', 'good.py');
const badPath = path.join(__dirname, 'fixtures', 'bad.py');
const errwarnPath = path.join(__dirname, 'fixtures', 'errwarn.py');
const fixturePath = path.join(__dirname, 'fixtures');

describe('The flake8 provider for Linter', () => {
  const lint = require('../lib/main.coffee').provideLinter().lint;

  beforeEach(() => {
    waitsForPromise(() =>
      Promise.all([
        atom.packages.activatePackage('linter-flake8'),
        atom.packages.activatePackage('language-python'),
      ]).then(() =>
        atom.workspace.open(goodPath)
      )
    );
  });

  it('should be in the packages list', () =>
    expect(atom.packages.isPackageLoaded('linter-flake8')).toBe(true)
  );

  it('should be an active package', () =>
    expect(atom.packages.isPackageActive('linter-flake8')).toBe(true)
  );

  describe('checks bad.py and', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(badPath).then((openEditor) => { editor = openEditor; })
      );
    });

    it('finds at least one message', () =>
      waitsForPromise(() =>
        lint(editor).then(messages =>
          expect(messages.length).toBeGreaterThan(0)
        )
      )
    );

    it('verifies that message', () =>
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          expect(messages[0].type).toBe('Warning');
          expect(messages[0].html).not.toBeDefined();
          expect(messages[0].text).toBe('F821 — undefined name \'asfd\'');
          expect(messages[0].filePath).toBe(badPath);
          expect(messages[0].range).toEqual([[0, 0], [0, 4]]);
        })
      )
    );

    it('checks that the message is an error if flakeErrors is set', () => {
      atom.config.set('linter-flake8.flakeErrors', true);
      waitsForPromise(() =>
        lint(editor).then(messages =>
          expect(messages[0].type).toBe('Error')
        )
      );
    });
  });

  describe('checks errwarn.py and', () => {
    let editor = null;

    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(errwarnPath).then((openEditor) => { editor = openEditor; })
      );
    });

    it('finds at least one message', () =>
      waitsForPromise(() =>
        lint(editor).then(messages =>
          expect(messages.length).toBeGreaterThan(0)
        )
      )
    );

    it('finds the message is a warning if pep8ErrorsToWarnings is set', () => {
      atom.config.set('linter-flake8.pep8ErrorsToWarnings', true);
      waitsForPromise(() =>
        lint(editor).then(messages =>
          expect(messages[0].type).toBe('Warning')
        )
      );
    });

    it('finds the message is an error if pep8ErrorsToWarnings is set', () => {
      atom.config.set('linter-flake8.pep8ErrorsToWarnings', false);
      waitsForPromise(() =>
        lint(editor).then(messages =>
          expect(messages[0].type).toBe('Error')
        )
      );
    });
  });

  it('finds nothing wrong with a valid file', () => {
    waitsForPromise(() =>
      atom.workspace.open(goodPath).then(editor =>
        lint(editor).then(messages =>
          expect(messages.length).toBe(0)
        )
      )
    );
  });

  describe('executable path', () => {
    const helpers = require('atom-linter');

    let editor = null;
    const realExec = helpers.exec;
    const execParams = [];
    function fakeExec(...parameters) {
      execParams.push(parameters);
      return Promise.resolve('');
    }

    beforeEach(() => {
      atom.project.addPath(fixturePath);

      Object.defineProperty(helpers, 'exec', {
        enumerable: true,
        value: fakeExec,
      });

      waitsForPromise(() =>
        atom.workspace.open(badPath).then((openEditor) => { editor = openEditor; })
      );
    });

    afterEach(() => {
      Object.defineProperty(helpers, 'exec', {
        enumerable: true,
        value: realExec,
      });
    });

    it('finds executable relative to project', () => {
      atom.config.set('linter-flake8.executablePath',
        path.join('$PROJECT', 'flake8')
      );
      waitsForPromise(() =>
        lint(editor).then(() =>
          expect(execParams.pop()[0]).toBe(path.join(fixturePath, 'flake8'))
        )
      );
    });

    it('finds executable using project name', () => {
      atom.config.set('linter-flake8.executablePath',
        path.join('$PROJECT_NAME', 'flake8')
      );
      waitsForPromise(() =>
        lint(editor).then(() =>
          expect(execParams.pop()[0]).toBe(path.join('fixtures', 'flake8'))
        )
      );
    });

    it('normalizes executable path', () => {
      atom.config.set('linter-flake8.executablePath',
        path.join(fixturePath, '..', 'fixtures', 'flake8')
      );
      waitsForPromise(() =>
        lint(editor).then(() =>
          expect(execParams.pop()[0]).toBe(path.join(fixturePath, 'flake8'))
        )
      );
    });

    it('finds backup executable', () => {
      const flakeNotFound = path.join('$PROJECT', 'flake8_notfound');
      const flakeBackup = path.join(fixturePath, 'flake8_backup');
      atom.config.set('linter-flake8.executablePath',
        `${flakeNotFound};${flakeBackup}`
      );
      waitsForPromise(() =>
        lint(editor).then(() =>
          expect(execParams.pop()[0]).toBe(path.join(fixturePath, 'flake8_backup'))
        )
      );
    });
  });
});
