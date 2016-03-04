# Changelog

## 1.13.0

*   $PROJECT_NAME substitution (#167)

## 1.12.1

*   Fix a regression in path normalization (#162)

## 1.12.0

*   Add support for $PROJECT substitution (#143)

## 1.11.0

*   Expand `~` in paths for *NIX users (#154)

## 1.10.1

*   Fix an error in F401 handling (#148)

## 1.10.0

*   Fix matching of imports (#142)

*   Allow forcing `flake` warnings to errors and `pep8` errors to
    warnings (#145)

## 1.9.3

*   Fix custom highlighting issue (#128)
*   Change default to disable McCabe complexity checking (#129)

## 1.9.2

*   Check the return value of an Atom function (#113)

## 1.9.1

*   Fix a bug with the new range extraction (#98)

## 1.9.0

*   Update readme (#94)
*   Add corrected range extraction for many errors (#81)

## 1.8.0

*   Update CHANGELOG.md (#85) and other repository settings (#90, #91, #92)
*   Allow all error classification letters (#88)
*   Specify the working directory to allow custom scripts to work better (#93)

## 1.7.0

*   Auto installs `linter` package if not installed already
*   Add name to flake8 messages

## 1.0.0

*   First working release

## 1.0.1

*   Fixed trailing period causing parsing error in package

## 1.0.2

*   Mistake in repo url

## 1.0.3

*   Release on atom.io

## 1.0.4

*   Updated README

## 1.0.5

*   F841 are now considered as warnings

## 1.0.6

*   Fixed formatting in README

## 1.0.7

*   Fixed mistakes in README.md pyflakes -> flake8

    `flake8` path should be specified in key: `executableDir`

## 1.0.8

*   Changed repo name to linter-flake8
*   Added new options in config
*   Fixed a typo in config

## 1.1.0

*   Repo moved to AtomLinter organization

## 1.1.1

*   Handled windows line endings

## 1.2.0

*   Add maxComplexity and selectErrors options to config

## 1.3.0

*   `pep257` errors are now handled, minor patches

## 1.4.0

*   `flake8` config files is now handled

## 1.4.1

*   Fixed deprecation warnings

## 1.4.2

*   Prepared package to new version of Linter

## 1.5.0

*   Added Hacking module support, added ability to choose config name

## 1.6.0

*   Migrated to new Linter API
