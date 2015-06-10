# linter-flake8 package

This is a **linter-flake8** plugin for [Linter](https://github.com/AtomLinter/Linter). It
is an interface to [flake8](https://pypi.python.org/pypi/flake8).

![img](https://raw.githubusercontent.com/badray/linter-flake8/master/in_action.gif)

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

##### Bult-in docstrings check (Optional)
To include built-in docstrings (pep257) support you will also need to install:
   ```
   pip install flake8-docstrings
   ```
or:
   ```
   pip install flake8-pep257
   ```

##### OpenStack Style Guidelines check (Optional)
To support [OpenStack Style Guidelines](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html), you will also need to install [hacking](https://github.com/openstack-dev/hacking) module:
  ```
  pip install hacking
  ```

### Settings
You can configure linter-flake8 as nearly all [Atom](https://atom.io/) modules by editing plugin settings in *Atom->Preferences->Packages->linter-flake-8*.

![img](https://raw.githubusercontent.com/badray/linter-flake8/master/screenshot_settings.png)

Or if you prefere you can use Atom *config.cson* file *~/.atom/config.cson* (click *Open Your Config*
in *Atom* menu).

In configuration you can specify executable directory if node hasn't it in **$PATH**. Example:

```
'linter-flake8':
  'executableDir': '/usr/local/bin/'
```

## Donation
[![Share the love!](https://chewbacco-stuff.s3.amazonaws.com/donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KXUYS4ARNHCN8)
