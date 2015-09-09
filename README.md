linter-flake8
=============

linter-flake8 is a [flake8](https://pypi.python.org/pypi/flake8) provider for [Linter](https://github.com/AtomLinter/Linter).

![img](https://cloud.githubusercontent.com/assets/4278113/8768482/52f975c6-2e3f-11e5-87e4-27c8359fd36c.gif)

### Installation
To use this plugin `flake8` will need to be installed on your
system. If it is not already installed, you can install [flake8](https://pypi.python.org/pypi/flake8) by typing the following
in a terminal:
```ShellSession
pip install flake8
```

You can then install this package from with Atom or by typing:
```ShellSession
$ apm install linter-flake8
```

_Note: If the `linter` package is not currently installed, it will be installed
for you._

##### Bult-in docstrings check (Optional)
To include built-in docstrings (pep257) support you will also need to install:
```ShellSession
pip install flake8-docstrings
```
or:
```ShellSession
pip install flake8-pep257
```

##### OpenStack Style Guidelines check (Optional)
To support [OpenStack Style Guidelines](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html), you will also need to install [hacking](https://github.com/openstack-dev/hacking) module:
  ```
  pip install hacking
  ```

### Settings
You can configure linter-flake8 as nearly all [Atom](https://atom.io/) modules by editing plugin settings in *Atom->Preferences->Packages->linter-flake-8*.

![img](https://cloud.githubusercontent.com/assets/4278113/8768488/91fffae2-2e3f-11e5-9783-9513b882cbc0.png)

Or if you prefere you can use Atom *config.cson* file *~/.atom/config.cson* (click *Open Your Config*
in *Atom* menu).

In configuration you can specify executable directory if node hasn't it in **$PATH**. Example:

```cson
'linter-flake8':
  'executableDir': '/usr/local/bin/'
```

### Project configuration files
Linter also supports reading flake8 configuration files. To use them, you need specify their names manually into *Config Files Names* in plugin settings. Please take a note, that  plugin settings from configuration panel will be **ignored** if configuration file was found.

![img](https://cloud.githubusercontent.com/assets/4278113/8768510/0d3769f2-2e40-11e5-8e27-d31991973246.png)
