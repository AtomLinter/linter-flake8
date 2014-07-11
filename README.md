# linter-python-flake8 package

This **linter-python-flake8** plugin for [Linter](https://github.com/AtomLinter/Linter)
provides an interface to [flake8](https://pypi.python.org/pypi/pyflakes). It will
be used with files that have the Python syntax.

## Requirements
*Linter* package must be installed in order to use this plugin. If *Linter* is not
installed, please follow the instructions [here](https://github.com/AtomLinter/Linter).

### Installation
Before using this plugin, you must ensure that `pyflakes` is installed on your
system. To install `pyflakes`, do the following:

1. Install [python](https://www.python.org/).

2. Install [pyflakes](https://pypi.python.org/pypi/pyflakes) by typing the following
in a terminal:
   ```
   pip install pyflakes
   ```
   $ apm install linter-python-pyflakes

Now you can proceed to install **the linter-python-pyflakes** plugin.

### Plugin installation
```
$ apm install linter-python-pyflakes
```

## Settings
You can configure linter-python-pyflakes by editing *~/.atom/config.cson* (choose *Open Your Config*
in *Atom* menu). You'll need to add the directory where your **pyflakes** executable
resides. Example:
```
'linter-python-pyflakes':
  'pyflakesDirToExecutable': '/usr/local/bin/'
```
