'use babel';

/*
 * These migrations can take one of two forms, a direct move or a general function.
 *
 * Direct move:
 *   These objects have an array of `moves`, which
 *   are objects containing an `old` setting name and a `new` setting name.
 *   Any existing config found in the `old` name will be moved over to (and overwrite)
 *   the `new` key.
 *
 * Functions:
 *   These have a `migrate` function, which takes the
 *   current linter-flake8 atom config as an argument, and can act on it however
 *   it needs to.
 */
const activeMigrations = [
  {
    added: 'January, 2019',
    description: 'Grouped setting overrides for flake8',
    moves: [
      {
        old: 'maxLineLength',
        new: 'flake8.maxLineLength',
      }, {
        old: 'ignoreErrorCodes',
        new: 'flake8.ignoreErrorCodes',
      }, {
        old: 'maxComplexity',
        new: 'flake8.maxComplexity',
      }, {
        old: 'hangClosing',
        new: 'flake8.hangClosing',
      }, {
        old: 'selectErrors',
        new: 'flake8.selectErrorCodes',
      }, {
        old: 'builtins',
        new: 'flake8.builtins',
      },
    ],
  },
];

/*
 * This function can be called when linter-flake8 first activates in order to
 * ensure that the user's settings are up-to-date with the current version of
 * linter-flake8.  Ideally, we would call this only when upgrading to a new
 * version.
 */
function migrateConfigOptions(migrations = activeMigrations) {
  if (migrations.length) {
    const linterConfig = atom.config.get('linter-flake8');
    migrations.forEach((migration) => {
      if (migration.moves && Array.isArray(migration.moves)) {
        // Copy old settings over to the new ones, then unset the old setting keys
        migration.moves.forEach((move) => {
          const oldSetting = linterConfig[move.old];
          if (oldSetting !== undefined) {
            atom.config.set(`linter-flake8.${move.new}`, oldSetting);
            atom.config.unset(`linter-flake8.${move.old}`);
          }
        });
      } else if (typeof migration.migrate === 'function') {
        migration.migrate(linterConfig);
      }
    });
  }
}

module.exports = migrateConfigOptions;
