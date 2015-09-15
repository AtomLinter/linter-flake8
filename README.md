linter-flake8
=============

linter-flake8 is a [flake8](https://pypi.python.org/pypi/flake8) provider for the Atom [Linter](https://github.com/atom-community/linter) package.

![img](https://cloud.githubusercontent.com/assets/4278113/8768482/52f975c6-2e3f-11e5-87e4-27c8359fd36c.gif)

### Requirements
The `Linter` package must be installed in order to use this package. If it's not installed, please follow [Linter's installation instructions](https://github.com/atom-community/linter#how-to--installation).

### Installation
First, ensure that [flake8](https://pypi.python.org/pypi/flake8) is installed on your system. If not, install it by typing the following in a terminal:
   ```
   pip install flake8
   ```

then install the linter package by typing:
   ```
   apm install linter-flake8
   ```

#### Virtualenv

To ensure `flake8` targets the proper Python version for each project you work on, it is highly recommended to install `flake8` in each project's [virtualenv](https://virtualenv.pypa.io/en/latest/):

* If you are okay with installing `flake8` in each virtualenv, just do that.
* If you'd rather use system-wide `flake8` versions (e.g. `flake8` and `flake8-python2`), create a `flake8` symlink in each virtualenv pointing to your desired flake8 version. For example: `ln -s /usr/bin/flake8-python2 ~/.virtualenvs/random_python2_project/bin/flake8`

Then [activate your virtualenv](https://virtualenv.pypa.io/en/latest/userguide.html#activate-script) from the command line before starting Atom, and you're good to go!

##### Built-in docstrings check (Optional)
To include built-in docstrings (pep257) support you will also need to install:
   ```
   pip install flake8-docstrings
   ```
or:
   ```
   pip install flake8-pep257
   ```

##### OpenStack Style Guidelines check (Optional)
To support the [OpenStack Style Guidelines](http://google.github.io/styleguide/pyguide.html), you will also need to install the [hacking](https://github.com/openstack-dev/hacking) module:
  ```
  pip install hacking
  ```

### Settings
You can configure `linter-flake8` as any Atom package, by editing the package Settings in *Atom -> Preferences -> Packages -> linter-flake8*.

![img](https://cloud.githubusercontent.com/assets/4278113/8768488/91fffae2-2e3f-11e5-9783-9513b882cbc0.png)

Or if you prefer, you can use Atom's `~/.atom/config.cson` file (in Atom, click *Menu -> Open Your Config*).

If you installed `flake8` in a location not in your `$PATH`, the Settings panel will let you specify where it lives. For example,

```
'linter-flake8':
  'executableDir': '/usr/local/bin/'
```

### Project configuration files
Linter also supports reading `flake8` configuration files. To use them, you need specify their names manually into *Config Files Names* in package settings. Note that package settings from the Settings panel will be **ignored** if a configuration file was found.

![img](https://cloud.githubusercontent.com/assets/4278113/8768510/0d3769f2-2e40-11e5-8e27-d31991973246.png)
