# linter-python-flake8 package

This is a **linter-python-flake8** plugin for [Linter](https://github.com/AtomLinter/Linter). It
is an interface to [flake8](https://pypi.python.org/pypi/flake8).

### Requirements
*Linter* package must be installed in order to use this plugin. If *Linter* is not
installed, please follow the instructions [here](https://github.com/AtomLinter/Linter).

### Installation
To use a plugin, you must ensure that `flake8` is installed on your
system.

Install [flake8](https://pypi.python.org/pypi/flake8) by typing the following
in a terminal:
   ```
   pip install pyflakes
   ```

Install plugin by typing:
   ```
   $ apm install linter-python-flake8
   ```

## Settings
You can configure linter-python-flake8 as nearly all [Atom](https://atom.io/) modules by editing *~/.atom/config.cson* (click *Open Your Config*
in *Atom* menu).
In configuration you can specify executable directory if node hasn't it in **$PATH**. Example:

```
'linter-python-flake8':
  'executablyDirectory': '/usr/local/bin/'
```

##Screenshot
![img](https://raw.githubusercontent.com/badray/linter-python-flake8/master/screenshot.png)
