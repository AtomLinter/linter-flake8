'use babel';

import { join } from 'path';
// eslint-disable-next-line no-unused-vars
import { it, fit, wait, beforeEach, afterEach } from 'jasmine-fix';

const { lint } = require('../lib/main.js').provideLinter();

const fixturePath = join(__dirname, 'fixtures');
const fixtureWithConfigPath = join(__dirname, 'fixtures', 'with-config-file');
const goodPath = join(fixturePath, 'good.py');
const badPath = join(fixturePath, 'bad.py');
const badIgnoredPath = join(fixtureWithConfigPath, 'bad-ignored.py');
const badSubdirIgnoredPath = join(fixtureWithConfigPath, 'subdir', 'bad-ignored.py');
const errwarnPath = join(fixturePath, 'errwarn.py');
const builtinsPath = join(fixturePath, 'builtins.py');

describe('The flake8 provider for Linter', () => {
  beforeEach(async () => {
    // Info about this beforeEach() implementation:
    // https://github.com/AtomLinter/Meta/issues/15
    const activationPromise = atom.packages.activatePackage('linter-flake8');

    await atom.packages.activatePackage('language-python');
    await atom.workspace.open(goodPath);

    atom.packages.triggerDeferredActivationHooks();
    await activationPromise;
  });

  it('should be in the packages list', () =>
    expect(atom.packages.isPackageLoaded('linter-flake8')).toBe(true));

  it('should be an active package', () =>
    expect(atom.packages.isPackageActive('linter-flake8')).toBe(true));

  describe('checks bad.py and', () => {
    let editor = null;
    beforeEach(async () => {
      editor = await atom.workspace.open(badPath);
    });

    it('finds at least one message', async () => {
      const messages = await lint(editor);
      expect(messages.length).toBeGreaterThan(0);
    });

    it('verifies that message', async () => {
      const messages = await lint(editor);
      expect(messages[0].type).toBe('Warning');
      expect(messages[0].html).not.toBeDefined();
      expect(messages[0].text).toBe('F821 — undefined name \'asfd\'');
      expect(messages[0].filePath).toBe(badPath);
      expect(messages[0].range).toEqual([[0, 0], [0, 4]]);
    });

    it('checks that the message is an error if flakeErrors is set', async () => {
      atom.config.set('linter-flake8.flakeErrors', true);
      const messages = await lint(editor);
      expect(messages[0].type).toBe('Error');
    });
  });

  describe('checks errwarn.py and', () => {
    let editor = null;

    beforeEach(async () => {
      editor = await atom.workspace.open(errwarnPath);
    });

    it('finds at least one message', async () => {
      const messages = await lint(editor);
      expect(messages.length).toBeGreaterThan(0);
    });

    it('finds the message is a warning if pycodestyleErrorsToWarnings is set', async () => {
      atom.config.set('linter-flake8.pycodestyleErrorsToWarnings', true);
      const messages = await lint(editor);
      expect(messages[0].type).toBe('Warning');
    });

    it("finds the message is an error if pycodestyleErrorsToWarnings isn't set", async () => {
      atom.config.set('linter-flake8.pycodestyleErrorsToWarnings', false);
      const messages = await lint(editor);
      expect(messages[0].type).toBe('Error');
    });
  });

  describe('use configuration file and', () => {
    let editor = null;

    beforeEach(async () => {
      atom.project.addPath(fixtureWithConfigPath);
      editor = await atom.workspace.open(badIgnoredPath);
    });

    it('ignores file excluded in configuration file', async () => {
      const messages = await lint(editor);
      expect(messages.length).toBe(0);
    });

    it('ignores file excluded in configuration file using relative path', async () => {
      editor = await atom.workspace.open(badSubdirIgnoredPath);
      const messages = await lint(editor);
      expect(messages.length).toBe(0);
    });
  });

  it('finds nothing wrong with a valid file', async () => {
    const editor = await atom.workspace.open(goodPath);
    const messages = await lint(editor);
    expect(messages.length).toBe(0);
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

    beforeEach(async () => {
      atom.project.addPath(fixturePath);

      Object.defineProperty(helpers, 'exec', {
        enumerable: true,
        value: fakeExec,
      });

      editor = await atom.workspace.open(badPath);
    });

    afterEach(() => {
      Object.defineProperty(helpers, 'exec', {
        enumerable: true,
        value: realExec,
      });
    });

    it('finds executable relative to project', async () => {
      atom.config.set('linter-flake8.executablePath', join('$PROJECT', 'flake8'));
      await lint(editor);
      expect(execParams.pop()[0]).toBe(join(fixturePath, 'flake8'));
    });

    it('finds executable relative to projects', async () => {
      const paths = [
        join('$project', 'null'),
        join('$pRoJeCt', 'flake1'),
        join('$PrOjEcT', 'flake2'),
        join('$PROJECT', 'flake8'),
      ].join(';');
      atom.config.set('linter-flake8.executablePath', paths);
      await lint(editor);
      expect(execParams.pop()[0]).toBe(join(fixturePath, 'flake8'));
    });

    it('finds executable using project name', async () => {
      atom.config.set('linter-flake8.executablePath', join('$PROJECT_NAME', 'flake8'));
      await lint(editor);
      expect(execParams.pop()[0]).toBe(join('fixtures', 'flake8'));
    });

    it('finds executable using project names', async () => {
      const paths = [
        join('$project_name', 'null'),
        join('$pRoJeCt_NaMe', 'flake1'),
        join('$PrOjEcT_nAmE', 'flake2'),
        join('$PROJECT_NAME', 'flake8'),
      ].join(';');
      const correct = [
        join('fixtures', 'null'),
        join('fixtures', 'flake1'),
        join('fixtures', 'flake2'),
        join('fixtures', 'flake8'),
      ].join(';');
      atom.config.set('linter-flake8.executablePath', paths);
      await lint(editor);
      expect(execParams.pop()[0]).toBe(correct);
    });

    it('normalizes executable path', async () => {
      atom.config.set(
        'linter-flake8.executablePath',
        join(fixturePath, '..', 'fixtures', 'flake8'),
      );
      await lint(editor);
      expect(execParams.pop()[0]).toBe(join(fixturePath, 'flake8'));
    });

    it('finds backup executable', async () => {
      const flakeNotFound = join('$PROJECT', 'flake8_notfound');
      const flakeBackup = join(fixturePath, 'flake8_backup');
      atom.config.set(
        'linter-flake8.executablePath',
        `${flakeNotFound};${flakeBackup}`,
      );
      await lint(editor);
      expect(execParams.pop()[0]).toBe(join(fixturePath, 'flake8_backup'));
    });
  });

  describe('works with defining builtins', () => {
    let editor;

    beforeEach(async () => {
      editor = await atom.workspace.open(builtinsPath);
    });

    it('shows all warnings when the setting is blank', async () => {
      const messages = await lint(editor);
      expect(messages.length).toBe(2);

      expect(messages[0].type).toBe('Warning');
      expect(messages[0].html).not.toBeDefined();
      expect(messages[0].text).toBe('F821 — undefined name \'bar\'');
      expect(messages[0].filePath).toBe(builtinsPath);
      expect(messages[0].range).toEqual([[0, 6], [0, 9]]);

      expect(messages[1].type).toBe('Warning');
      expect(messages[1].html).not.toBeDefined();
      expect(messages[1].text).toBe('F821 — undefined name \'foo_bar\'');
      expect(messages[1].filePath).toBe(builtinsPath);
      expect(messages[1].range).toEqual([[1, 9], [1, 16]]);
    });

    it('works with a single builtin', async () => {
      atom.config.set('linter-flake8.builtins', ['bar']);
      const messages = await lint(editor);
      expect(messages.length).toBe(1);

      expect(messages[0].type).toBe('Warning');
      expect(messages[0].html).not.toBeDefined();
      expect(messages[0].text).toBe('F821 — undefined name \'foo_bar\'');
      expect(messages[0].filePath).toBe(builtinsPath);
      expect(messages[0].range).toEqual([[1, 9], [1, 16]]);
    });

    it('works with multiple builtins', async () => {
      atom.config.set('linter-flake8.builtins', ['bar', 'foo_bar']);
      const messages = await lint(editor);
      expect(messages.length).toBe(0);
    });
  });
});
