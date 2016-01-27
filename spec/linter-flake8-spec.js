'use babel';

import * as path from 'path';

const goodPath = path.join(__dirname, 'fixtures', 'good.py');
const badPath = path.join(__dirname, 'fixtures', 'bad.py');

describe('The flake8 provider for Linter', () => {
  const lint = require('../lib/main').provideLinter().lint;

  beforeEach(() => {
    waitsForPromise(() =>
      Promise.all([
        atom.packages.activatePackage('linter-flake8'),
        atom.packages.activatePackage('language-python').then(() =>
          atom.workspace.open(goodPath)
        )
      ])
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
        atom.workspace.open(badPath).then(openEditor => editor = openEditor)
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
        lint(editor).then(messages => {
          expect(messages[0].type).toBeDefined();
          expect(messages[0].type).toEqual('Warning');
          expect(messages[0].html).not.toBeDefined();
          expect(messages[0].text).toBeDefined();
          expect(messages[0].text).toEqual('F821 — undefined name \'asfd\'');
          expect(messages[0].filePath).toBeDefined();
          expect(messages[0].filePath).toMatch(/.+spec[\\\/]fixtures[\\\/]bad\.py$/);
          expect(messages[0].range).toBeDefined();
          expect(messages[0].range.length).toEqual(2);
          expect(messages[0].range).toEqual([[0, 0], [0, 4]]);
        })
      )
    );
  });

  it('finds nothing wrong with a valid file', () => {
    waitsForPromise(() =>
      atom.workspace.open(goodPath).then(editor =>
        lint(editor).then(messages =>
          expect(messages.length).toEqual(0)
        )
      )
    );
  });
});
