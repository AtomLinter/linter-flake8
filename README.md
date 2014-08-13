# linter-flake8 package

This is a **linter-flake8** plugin for [Linter](https://github.com/AtomLinter/Linter). It
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
   pip install flake8
   ```

Install plugin by typing:
   ```
   $ apm install linter-flake8
   ```

### Settings
You can configure linter-flake8 as nearly all [Atom](https://atom.io/) modules by editing *~/.atom/config.cson* (click *Open Your Config*
in *Atom* menu).
In configuration you can specify executable directory if node hasn't it in **$PATH**. Example:

```
'linter-flake8':
  'executableDir': '/usr/local/bin/'
```

### Screenshot
![img](https://raw.githubusercontent.com/badray/linter-flake8/master/screenshot.png)

## Donation
[![Share the love!](https://chewbacco-stuff.s3.amazonaws.com/donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KXUYS4ARNHCN8)
