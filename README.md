# linter-flake8

[![Build Status](https://travis-ci.org/AtomLinter/linter-flake8.svg)](https://travis-ci.org/AtomLinter/linter-flake8)

linter-flake8 is a [flake8](https://pypi.python.org/pypi/flake8) provider for
[linter](https://github.com/atom-community/linter).

![img](https://cloud.githubusercontent.com/assets/4278113/8768482/52f975c6-2e3f-11e5-87e4-27c8359fd36c.gif)

## Installation

To use this plugin `flake8` will need to be installed on your
system. If it is not already installed, you can install
[flake8](https://pypi.python.org/pypi/flake8) by typing the following in a
terminal:

```ShellSession
pip install flake8
```

You can then install this package from with Atom or by typing:

```ShellSession
$ apm install linter-flake8
```

_Note: If the `linter` package is not currently installed, it will be installed
for you._

### Built-in docstrings check (Optional)

To include built-in docstrings (pep257) support you will also need to install:

```ShellSession
pip install flake8-docstrings
```

### OpenStack Style Guidelines check (Optional)

To support
[OpenStack Style Guidelines](http://google.github.io/styleguide/pyguide.html),
you will also need to install the
[hacking](https://github.com/openstack-dev/hacking) module:

```ShellSession
pip install hacking
```

### Virtualenv

To ensure `flake8` targets the proper Python version for each project you work
on, it is highly recommended to install `flake8` in each project's
[virtualenv](https://virtualenv.pypa.io/en/latest/):

*   If you are okay with installing `flake8` inside each virtualenv, just do
    that.

*   If you'd rather use the system-wide `flake8` versions (e.g. `flake8` and
    `flake8-python2`), create a `flake8` symlink in each virtualenv pointing to
    your desired flake8 version. For example: `ln -s /usr/bin/flake8-python2
    ~/.virtualenvs/random_python2_project/bin/flake8`

Then [activate your virtualenv](https://virtualenv.pypa.io/en/latest/userguide.html#activate-script)
from the command line before starting Atom, and you're good to go!

## Settings

You can configure linter-flake8 like any [Atom](https://atom.io/) package by
editing the settings in _Atom -> Preferences -> Packages -> linter-flake8_.

![image](https://cloud.githubusercontent.com/assets/427137/10375451/758567d2-6dad-11e5-9b5e-3e820f4c3d57.png)

Or if you prefer you can use Atom _config.cson_ file _~/.atom/config.cson_
(click _Open Your Config_ in _Atom_ menu).

If you installed `flake8` in a location not in your `$PATH`, the Settings panel
will let you specify where it lives. For example:

```cson
'linter-flake8':
  'executablePath': '/usr/bin/flake8'
```

The `executablePath` setting may use `$PROJECT` and `$PROJECT_NAME` for the path or name of the current project, respectively.



### Project configuration files

Linter also supports reading `flake8` configuration files. To use them, you
need specify their names manually into _Config Files Names_ in the package
settings. Note that package settings from Settings panel will be **ignored** if
a configuration file was found.

![img](https://cloud.githubusercontent.com/assets/4278113/8768510/0d3769f2-2e40-11e5-8e27-d31991973246.png)
