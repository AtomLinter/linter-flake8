# Change Log

## [v2.3.0](https://github.com/AtomLinter/linter-flake8/tree/v2.3.0) (2017-12-06)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.2.1...v2.3.0)

**Implemented enhancements:**

- Files not being excluded via Atom, but command line flake8 does [\#454](https://github.com/AtomLinter/linter-flake8/issues/454)
- Update eslint-config-airbnb-base to version 12.0.0 🚀 [\#496](https://github.com/AtomLinter/linter-flake8/pull/496) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Pass filename to Flake8 [\#482](https://github.com/AtomLinter/linter-flake8/pull/482) ([lucasdf](https://github.com/lucasdf))
- Update eslint to version 4.3.0 🚀 [\#460](https://github.com/AtomLinter/linter-flake8/pull/460) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

**Fixed bugs:**

- Object.dirname is deprecated. [\#527](https://github.com/AtomLinter/linter-flake8/issues/527)
- Linter-flake8 doesn't resolve the configuration as flake8 [\#124](https://github.com/AtomLinter/linter-flake8/issues/124)
- Guard against invalid TextEditor and empty paths [\#544](https://github.com/AtomLinter/linter-flake8/pull/544) ([Arcanemagus](https://github.com/Arcanemagus))
- Use Trusty image on Travis-CI [\#448](https://github.com/AtomLinter/linter-flake8/pull/448) ([Arcanemagus](https://github.com/Arcanemagus))
- Add support to default config files [\#447](https://github.com/AtomLinter/linter-flake8/pull/447) ([gpiress](https://github.com/gpiress))

## [v2.2.1](https://github.com/AtomLinter/linter-flake8/tree/v2.2.1) (2017-04-25)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.2.0...v2.2.1)

**Fixed bugs:**

- Report when flake8 crashes! [\#414](https://github.com/AtomLinter/linter-flake8/pull/414) ([Arcanemagus](https://github.com/Arcanemagus))

## [v2.2.0](https://github.com/AtomLinter/linter-flake8/tree/v2.2.0) (2017-04-25)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.1.5...v2.2.0)

**Implemented enhancements:**

- Max Line Length default value is 79 [\#379](https://github.com/AtomLinter/linter-flake8/issues/379)
- Builtins support? [\#163](https://github.com/AtomLinter/linter-flake8/issues/163)
- Defer package dependency check [\#413](https://github.com/AtomLinter/linter-flake8/pull/413) ([Arcanemagus](https://github.com/Arcanemagus))
- Uniquely spawn lint runs [\#412](https://github.com/AtomLinter/linter-flake8/pull/412) ([Arcanemagus](https://github.com/Arcanemagus))
- Asyncify the specs [\#411](https://github.com/AtomLinter/linter-flake8/pull/411) ([Arcanemagus](https://github.com/Arcanemagus))
- Add support for builtins [\#410](https://github.com/AtomLinter/linter-flake8/pull/410) ([Arcanemagus](https://github.com/Arcanemagus))
- Update atom-linter to version 10.0.0 🚀 [\#393](https://github.com/AtomLinter/linter-flake8/pull/393) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update default line-length value [\#381](https://github.com/AtomLinter/linter-flake8/pull/381) ([Arcanemagus](https://github.com/Arcanemagus))

## [v2.1.5](https://github.com/AtomLinter/linter-flake8/tree/v2.1.5) (2017-03-18)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.1.4...v2.1.5)

**Implemented enhancements:**

- Update to eslint-config-airbnb-base v11.1.1 [\#368](https://github.com/AtomLinter/linter-flake8/pull/368) ([Arcanemagus](https://github.com/Arcanemagus))
- Update CI configuration [\#367](https://github.com/AtomLinter/linter-flake8/pull/367) ([Arcanemagus](https://github.com/Arcanemagus))
- Update fs-plus to version 3.0.0 🚀 [\#361](https://github.com/AtomLinter/linter-flake8/pull/361) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update atom-linter to version 9.0.0 🚀 [\#349](https://github.com/AtomLinter/linter-flake8/pull/349) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v2.1.4](https://github.com/AtomLinter/linter-flake8/tree/v2.1.4) (2016-12-12)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.1.3...v2.1.4)

**Implemented enhancements:**

- Update eslint-config-airbnb-base to version 11.0.0 🚀 [\#306](https://github.com/AtomLinter/linter-flake8/pull/306) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

**Fixed bugs:**

- Atom blocked editing files with plenty of errors [\#295](https://github.com/AtomLinter/linter-flake8/issues/295)
- Underline mispositioned when attribute name matches unused import [\#268](https://github.com/AtomLinter/linter-flake8/issues/268)
- Update CI configuration [\#308](https://github.com/AtomLinter/linter-flake8/pull/308) ([Arcanemagus](https://github.com/Arcanemagus))
- Remove custom range fixers [\#304](https://github.com/AtomLinter/linter-flake8/pull/304) ([Arcanemagus](https://github.com/Arcanemagus))

## [v2.1.3](https://github.com/AtomLinter/linter-flake8/tree/v2.1.3) (2016-11-30)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.1.2...v2.1.3)

**Fixed bugs:**

- Multiple $PROJECT not work [\#290](https://github.com/AtomLinter/linter-flake8/issues/290)
- Added "g" flag to project path replacement [\#291](https://github.com/AtomLinter/linter-flake8/pull/291) ([hiroaki-yamamoto](https://github.com/hiroaki-yamamoto))

## [v2.1.2](https://github.com/AtomLinter/linter-flake8/tree/v2.1.2) (2016-11-29)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.1.1...v2.1.2)

**Implemented enhancements:**

- Add activationHooks for django-atom [\#287](https://github.com/AtomLinter/linter-flake8/pull/287) ([jjlorenzo](https://github.com/jjlorenzo))

## [v2.1.1](https://github.com/AtomLinter/linter-flake8/tree/v2.1.1) (2016-11-21)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.1.0...v2.1.1)

**Fixed bugs:**

- activationHooks breaks package loading [\#280](https://github.com/AtomLinter/linter-flake8/issues/280)
- Activate on more grammars [\#281](https://github.com/AtomLinter/linter-flake8/pull/281) ([walles](https://github.com/walles))

## [v2.1.0](https://github.com/AtomLinter/linter-flake8/tree/v2.1.0) (2016-11-19)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.0.2...v2.1.0)

**Implemented enhancements:**

- Handle errors more gracefully [\#277](https://github.com/AtomLinter/linter-flake8/pull/277) ([Arcanemagus](https://github.com/Arcanemagus))
- Improve Atom startup time [\#276](https://github.com/AtomLinter/linter-flake8/pull/276) ([walles](https://github.com/walles))
- Update eslint-config-airbnb-base to version 10.0.0 🚀 [\#272](https://github.com/AtomLinter/linter-flake8/pull/272) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Move to a generated changelog [\#264](https://github.com/AtomLinter/linter-flake8/pull/264) ([Arcanemagus](https://github.com/Arcanemagus))

## [v2.0.2](https://github.com/AtomLinter/linter-flake8/tree/v2.0.2) (2016-10-18)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.0.1...v2.0.2)

**Fixed bugs:**

- Workaround a bug with E999 reporting [\#262](https://github.com/AtomLinter/linter-flake8/pull/262) ([Arcanemagus](https://github.com/Arcanemagus))

## [v2.0.1](https://github.com/AtomLinter/linter-flake8/tree/v2.0.1) (2016-10-17)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v2.0.0...v2.0.1)

**Implemented enhancements:**

- Throw nicer error message [\#260](https://github.com/AtomLinter/linter-flake8/pull/260) ([Arcanemagus](https://github.com/Arcanemagus))
- Update eslint-config-airbnb-base to version 9.0.0 🚀 [\#258](https://github.com/AtomLinter/linter-flake8/pull/258) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

**Fixed bugs:**

- chore\(package\): update fs-plus to version 2.9.3 [\#261](https://github.com/AtomLinter/linter-flake8/pull/261) ([Arcanemagus](https://github.com/Arcanemagus))

## [v2.0.0](https://github.com/AtomLinter/linter-flake8/tree/v2.0.0) (2016-10-15)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.13.4...v2.0.0)

**Implemented enhancements:**

- Update eslint-config-airbnb-base to version 8.0.0 🚀 [\#250](https://github.com/AtomLinter/linter-flake8/pull/250) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update eslint-config-airbnb-base to version 7.0.0 🚀 [\#246](https://github.com/AtomLinter/linter-flake8/pull/246) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

**Fixed bugs:**

- Incorrectly reporting unused imports for the 'as' syntax [\#253](https://github.com/AtomLinter/linter-flake8/issues/253)
- Ignore option does nothing [\#249](https://github.com/AtomLinter/linter-flake8/issues/249)
- Linter fails at start on atom git: Uncaught TypeError: Invalid Point: \(1, NaN\) [\#196](https://github.com/AtomLinter/linter-flake8/issues/196)
- Rewrite in ES2017 [\#255](https://github.com/AtomLinter/linter-flake8/pull/255) ([Arcanemagus](https://github.com/Arcanemagus))

## [v1.13.4](https://github.com/AtomLinter/linter-flake8/tree/v1.13.4) (2016-09-06)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.13.3...v1.13.4)

**Implemented enhancements:**

- Error: Process execution timed out [\#169](https://github.com/AtomLinter/linter-flake8/issues/169)
- Update eslint-config-airbnb-base to version 6.0.0 🚀 [\#245](https://github.com/AtomLinter/linter-flake8/pull/245) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

**Fixed bugs:**

- fix flake8 config param [\#244](https://github.com/AtomLinter/linter-flake8/pull/244) ([urbaniak](https://github.com/urbaniak))

## [v1.13.3](https://github.com/AtomLinter/linter-flake8/tree/v1.13.3) (2016-09-02)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.13.2...v1.13.3)

**Implemented enhancements:**

- Update the CI configuration [\#242](https://github.com/AtomLinter/linter-flake8/pull/242) ([Arcanemagus](https://github.com/Arcanemagus))
- Update atom-linter to version 8.0.0 🚀 [\#239](https://github.com/AtomLinter/linter-flake8/pull/239) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update eslint to version 3.4.0 🚀 [\#238](https://github.com/AtomLinter/linter-flake8/pull/238) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update atom-linter to version 7.0.0 🚀 [\#224](https://github.com/AtomLinter/linter-flake8/pull/224) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update atom-linter to version 6.0.0 🚀 [\#210](https://github.com/AtomLinter/linter-flake8/pull/210) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

**Fixed bugs:**

- Import-errors on lines that don't exist at the bottom of the file instead of the top? [\#211](https://github.com/AtomLinter/linter-flake8/issues/211)
- Fix reference to PEP8 in config setting [\#199](https://github.com/AtomLinter/linter-flake8/issues/199)
- New flake8 shows full module path for F401, Fixes \#211 [\#218](https://github.com/AtomLinter/linter-flake8/pull/218) ([hvdklauw](https://github.com/hvdklauw))
- Force the format to default [\#217](https://github.com/AtomLinter/linter-flake8/pull/217) ([Arcanemagus](https://github.com/Arcanemagus))
- Remove references to PEP8 [\#205](https://github.com/AtomLinter/linter-flake8/pull/205) ([Arcanemagus](https://github.com/Arcanemagus))
- Fix per-project configuration behaviour [\#201](https://github.com/AtomLinter/linter-flake8/pull/201) ([rarguelloF](https://github.com/rarguelloF))

## [v1.13.2](https://github.com/AtomLinter/linter-flake8/tree/v1.13.2) (2016-06-13)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.13.1...v1.13.2)

## [v1.13.1](https://github.com/AtomLinter/linter-flake8/tree/v1.13.1) (2016-06-13)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.13.0...v1.13.1)

**Implemented enhancements:**

- Update eslint-config-airbnb-base to version 3.0.1 🚀 [\#194](https://github.com/AtomLinter/linter-flake8/pull/194) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update atom-linter to version 5.0.0 🚀 [\#192](https://github.com/AtomLinter/linter-flake8/pull/192) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update eslint-config-airbnb-base to version 2.0.0 🚀 [\#190](https://github.com/AtomLinter/linter-flake8/pull/190) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Move to eslint-config-airbnb-base [\#187](https://github.com/AtomLinter/linter-flake8/pull/187) ([Arcanemagus](https://github.com/Arcanemagus))
- Update eslint-config-airbnb to version 7.0.0 🚀 [\#182](https://github.com/AtomLinter/linter-flake8/pull/182) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Add an option to disable execution timeout [\#181](https://github.com/AtomLinter/linter-flake8/pull/181) ([Arcanemagus](https://github.com/Arcanemagus))
- Update dependencies [\#180](https://github.com/AtomLinter/linter-flake8/pull/180) ([Arcanemagus](https://github.com/Arcanemagus))

**Fixed bugs:**

- Update the specs for atom-linter 4.7.0 [\#189](https://github.com/AtomLinter/linter-flake8/pull/189) ([Arcanemagus](https://github.com/Arcanemagus))
- Handle some internal API changes in Atom v1.9.0 [\#188](https://github.com/AtomLinter/linter-flake8/pull/188) ([Arcanemagus](https://github.com/Arcanemagus))

## [v1.13.0](https://github.com/AtomLinter/linter-flake8/tree/v1.13.0) (2016-03-04)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.12.1...v1.13.0)

**Implemented enhancements:**

- Allow only one flake8 instance [\#117](https://github.com/AtomLinter/linter-flake8/issues/117)
- $PROJECT\_NAME substitution [\#167](https://github.com/AtomLinter/linter-flake8/pull/167) ([trsanders](https://github.com/trsanders))

## [v1.12.1](https://github.com/AtomLinter/linter-flake8/tree/v1.12.1) (2016-03-01)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.12.0...v1.12.1)

**Fixed bugs:**

- Ensure fs.normalize\(\) applied to exec path. [\#162](https://github.com/AtomLinter/linter-flake8/pull/162) ([lexicalunit](https://github.com/lexicalunit))

## [v1.12.0](https://github.com/AtomLinter/linter-flake8/tree/v1.12.0) (2016-02-24)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.11.0...v1.12.0)

**Implemented enhancements:**

- Update eslint to version 2.2.0 🚀 [\#156](https://github.com/AtomLinter/linter-flake8/pull/156) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Add support for $PROJECT substitution [\#143](https://github.com/AtomLinter/linter-flake8/pull/143) ([keras](https://github.com/keras))

## [v1.11.0](https://github.com/AtomLinter/linter-flake8/tree/v1.11.0) (2016-02-19)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.10.1...v1.11.0)

**Implemented enhancements:**

- Update .travis.yml [\#155](https://github.com/AtomLinter/linter-flake8/pull/155) ([Arcanemagus](https://github.com/Arcanemagus))
- Normalize executable path. [\#154](https://github.com/AtomLinter/linter-flake8/pull/154) ([lexicalunit](https://github.com/lexicalunit))
- Update babel-eslint to version 5.0.0 🚀 [\#153](https://github.com/AtomLinter/linter-flake8/pull/153) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update atom-package-deps to version 4.0.1 🚀 [\#152](https://github.com/AtomLinter/linter-flake8/pull/152) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

## [v1.10.1](https://github.com/AtomLinter/linter-flake8/tree/v1.10.1) (2016-02-05)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.10.0...v1.10.1)

**Implemented enhancements:**

- Unused import \(F401\) reported at the bottom of the file [\#148](https://github.com/AtomLinter/linter-flake8/pull/148) ([hvdklauw](https://github.com/hvdklauw))
- Update eslint-config-airbnb to version 5.0.0 🚀 [\#147](https://github.com/AtomLinter/linter-flake8/pull/147) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

## [v1.10.0](https://github.com/AtomLinter/linter-flake8/tree/v1.10.0) (2016-01-28)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.9.3...v1.10.0)

**Implemented enhancements:**

- Add unit test for regexp [\#16](https://github.com/AtomLinter/linter-flake8/issues/16)
- Add options to adjust what are linter errors and warnings [\#145](https://github.com/AtomLinter/linter-flake8/pull/145) ([eteq](https://github.com/eteq))
- Update eslint-config-airbnb to version 4.0.0 🚀 [\#144](https://github.com/AtomLinter/linter-flake8/pull/144) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update eslint-config-airbnb to version 3.0.0 🚀 [\#135](https://github.com/AtomLinter/linter-flake8/pull/135) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

**Fixed bugs:**

- Underline mispositionned [\#126](https://github.com/AtomLinter/linter-flake8/issues/126)
- Leaving "Max complexity" default settings overwrite configuration file [\#121](https://github.com/AtomLinter/linter-flake8/issues/121)
- Only match imports after the `import` keyword [\#142](https://github.com/AtomLinter/linter-flake8/pull/142) ([patrys](https://github.com/patrys))

## [v1.9.3](https://github.com/AtomLinter/linter-flake8/tree/v1.9.3) (2015-12-16)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.9.2...v1.9.3)

**Implemented enhancements:**

- Add specs [\#120](https://github.com/AtomLinter/linter-flake8/issues/120)
- Set maxComplexity default to -1 with a description [\#129](https://github.com/AtomLinter/linter-flake8/pull/129) ([toxinu](https://github.com/toxinu))
- Add specs [\#125](https://github.com/AtomLinter/linter-flake8/pull/125) ([Arcanemagus](https://github.com/Arcanemagus))
- Update all dependencies 🌴 [\#119](https://github.com/AtomLinter/linter-flake8/pull/119) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

**Fixed bugs:**

- Add --exit-zero to flake8 invocation [\#105](https://github.com/AtomLinter/linter-flake8/issues/105)
- Message underline breaks when code is folded [\#99](https://github.com/AtomLinter/linter-flake8/issues/99)
- Don't rely on screen rows and respect offsets [\#128](https://github.com/AtomLinter/linter-flake8/pull/128) ([patrys](https://github.com/patrys))

## [v1.9.2](https://github.com/AtomLinter/linter-flake8/tree/v1.9.2) (2015-11-12)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.9.1...v1.9.2)

**Fixed bugs:**

- Error with old-style print function  [\#108](https://github.com/AtomLinter/linter-flake8/issues/108)
- Error: ~/.config/flake8 ignored by linter-flake8 [\#57](https://github.com/AtomLinter/linter-flake8/issues/57)
- Check the return of lineTextForScreenRow [\#113](https://github.com/AtomLinter/linter-flake8/pull/113) ([Arcanemagus](https://github.com/Arcanemagus))
- Removed flake8-pep257 from README \(\#106\) [\#110](https://github.com/AtomLinter/linter-flake8/pull/110) ([cemsbr](https://github.com/cemsbr))

## [v1.9.1](https://github.com/AtomLinter/linter-flake8/tree/v1.9.1) (2015-10-19)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.9.0...v1.9.1)

**Fixed bugs:**

- Lint error if code folded [\#97](https://github.com/AtomLinter/linter-flake8/issues/97)
- Verify tokenizedLine is set [\#98](https://github.com/AtomLinter/linter-flake8/pull/98) ([Arcanemagus](https://github.com/Arcanemagus))

## [v1.9.0](https://github.com/AtomLinter/linter-flake8/tree/v1.9.0) (2015-10-13)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.8.0...v1.9.0)

**Implemented enhancements:**

- Add support for highlighting unused imports [\#81](https://github.com/AtomLinter/linter-flake8/pull/81) ([patrys](https://github.com/patrys))

**Fixed bugs:**

- Unused imports are not shown [\#95](https://github.com/AtomLinter/linter-flake8/issues/95)
- Update README.md [\#94](https://github.com/AtomLinter/linter-flake8/pull/94) ([Arcanemagus](https://github.com/Arcanemagus))

## [v1.8.0](https://github.com/AtomLinter/linter-flake8/tree/v1.8.0) (2015-10-08)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.7.0...v1.8.0)

**Implemented enhancements:**

- Add Landon as a collaborator [\#87](https://github.com/AtomLinter/linter-flake8/issues/87)
- Show more detailed error about not found executable [\#2](https://github.com/AtomLinter/linter-flake8/issues/2)
- Use container based Travis [\#92](https://github.com/AtomLinter/linter-flake8/pull/92) ([Arcanemagus](https://github.com/Arcanemagus))
- Add Travis-CI [\#90](https://github.com/AtomLinter/linter-flake8/pull/90) ([Arcanemagus](https://github.com/Arcanemagus))
- Allow for custom error letters. [\#88](https://github.com/AtomLinter/linter-flake8/pull/88) ([beck](https://github.com/beck))

**Fixed bugs:**

- configFileNames is completely ignored [\#66](https://github.com/AtomLinter/linter-flake8/issues/66)
- Remove executableDir setting [\#63](https://github.com/AtomLinter/linter-flake8/issues/63)
- Tilde \(~\) fails to expand in Config File Names [\#58](https://github.com/AtomLinter/linter-flake8/issues/58)
- Ignore Error Codes not working [\#43](https://github.com/AtomLinter/linter-flake8/issues/43)
- flake8 not found [\#18](https://github.com/AtomLinter/linter-flake8/issues/18)
- Specify current working directory [\#93](https://github.com/AtomLinter/linter-flake8/pull/93) ([Arcanemagus](https://github.com/Arcanemagus))
- Add coffeelint [\#91](https://github.com/AtomLinter/linter-flake8/pull/91) ([Arcanemagus](https://github.com/Arcanemagus))
- Remove errant paren in regex [\#89](https://github.com/AtomLinter/linter-flake8/pull/89) ([beck](https://github.com/beck))
- Fix version number in CHANGELOG [\#85](https://github.com/AtomLinter/linter-flake8/pull/85) ([frewsxcv](https://github.com/frewsxcv))

## [v1.7.0](https://github.com/AtomLinter/linter-flake8/tree/v1.7.0) (2015-10-02)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.6.1...v1.7.0)

**Implemented enhancements:**

- Install `linter` automatically. [\#76](https://github.com/AtomLinter/linter-flake8/issues/76)
- Why is lintOnFly disabled? [\#61](https://github.com/AtomLinter/linter-flake8/issues/61)
- Add linter name [\#83](https://github.com/AtomLinter/linter-flake8/pull/83) ([Arcanemagus](https://github.com/Arcanemagus))
- Auto-install linter [\#79](https://github.com/AtomLinter/linter-flake8/pull/79) ([Arcanemagus](https://github.com/Arcanemagus))
- Capture OpenStack hacking module errors [\#78](https://github.com/AtomLinter/linter-flake8/pull/78) ([GheRivero](https://github.com/GheRivero))
- Include docstring errors [\#73](https://github.com/AtomLinter/linter-flake8/pull/73) ([Arcanemagus](https://github.com/Arcanemagus))

**Fixed bugs:**

- PEP257 not being run [\#72](https://github.com/AtomLinter/linter-flake8/issues/72)
- Compromise for passing a config file to flake8 [\#68](https://github.com/AtomLinter/linter-flake8/pull/68) ([jeremyosborne](https://github.com/jeremyosborne))

## [v1.6.1](https://github.com/AtomLinter/linter-flake8/tree/v1.6.1) (2015-08-14)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.6.0...v1.6.1)

**Implemented enhancements:**

- change lintOnFly to true [\#65](https://github.com/AtomLinter/linter-flake8/pull/65) ([Ryex](https://github.com/Ryex))

## [v1.6.0](https://github.com/AtomLinter/linter-flake8/tree/v1.6.0) (2015-08-03)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.5.0...v1.6.0)

**Implemented enhancements:**

- Upgrade to the latest API [\#56](https://github.com/AtomLinter/linter-flake8/pull/56) ([steelbrain](https://github.com/steelbrain))
- Grab I\*\*\* warning messages [\#52](https://github.com/AtomLinter/linter-flake8/pull/52) ([apalkowski](https://github.com/apalkowski))

**Fixed bugs:**

- LinterFlake8.Linter is deprecated. [\#51](https://github.com/AtomLinter/linter-flake8/issues/51)
- Object.activate is deprecated. [\#50](https://github.com/AtomLinter/linter-flake8/issues/50)
- Fix small typo [\#54](https://github.com/AtomLinter/linter-flake8/pull/54) ([c0dr](https://github.com/c0dr))

## [v1.5.0](https://github.com/AtomLinter/linter-flake8/tree/v1.5.0) (2015-07-04)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.4.2...v1.5.0)

**Implemented enhancements:**

- Setting to ignore or specify configuration file? [\#41](https://github.com/AtomLinter/linter-flake8/issues/41)
- Support for selecting configuration file [\#42](https://github.com/AtomLinter/linter-flake8/pull/42) ([pjuren](https://github.com/pjuren))
- Add hacking module support. [\#39](https://github.com/AtomLinter/linter-flake8/pull/39) ([okdtsk](https://github.com/okdtsk))

**Fixed bugs:**

- Upcoming linter changes [\#40](https://github.com/AtomLinter/linter-flake8/issues/40)

## [v1.4.2](https://github.com/AtomLinter/linter-flake8/tree/v1.4.2) (2015-05-27)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.4.1...v1.4.2)

**Fixed bugs:**

- Uncaught TypeError: undefined is not a function [\#28](https://github.com/AtomLinter/linter-flake8/issues/28)

## [v1.4.1](https://github.com/AtomLinter/linter-flake8/tree/v1.4.1) (2015-05-20)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.4.0...v1.4.1)

**Implemented enhancements:**

- README: information on docstrings \(pep257\) support [\#26](https://github.com/AtomLinter/linter-flake8/pull/26) ([ghost](https://github.com/ghost))

**Fixed bugs:**

- Package.getActivationCommands is deprecated. [\#29](https://github.com/AtomLinter/linter-flake8/issues/29)
- Config.unobserve is deprecated. [\#24](https://github.com/AtomLinter/linter-flake8/issues/24)
- update to use dispose instead of deprecated config.unobserve [\#38](https://github.com/AtomLinter/linter-flake8/pull/38) ([awatts](https://github.com/awatts))
- Update package.json to be APIv1.0-compliant [\#32](https://github.com/AtomLinter/linter-flake8/pull/32) ([idan](https://github.com/idan))

## [v1.4.0](https://github.com/AtomLinter/linter-flake8/tree/v1.4.0) (2015-04-19)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.3.0...v1.4.0)

**Implemented enhancements:**

- Add a "select" field in settings to include codes skipped by default [\#19](https://github.com/AtomLinter/linter-flake8/issues/19)
- python 2 support [\#10](https://github.com/AtomLinter/linter-flake8/issues/10)
- Use setup file [\#8](https://github.com/AtomLinter/linter-flake8/issues/8)
- Add new options to README.md [\#5](https://github.com/AtomLinter/linter-flake8/issues/5)
- Flake8 python2 fix [\#22](https://github.com/AtomLinter/linter-flake8/pull/22) ([ChaoticMind](https://github.com/ChaoticMind))
- Use project config \(Fix for \#8\) [\#17](https://github.com/AtomLinter/linter-flake8/pull/17) ([matthewwithanm](https://github.com/matthewwithanm))

**Fixed bugs:**

- Fixed config to adhere to the API docs. Fixes \#19 [\#20](https://github.com/AtomLinter/linter-flake8/pull/20) ([ChaoticMind](https://github.com/ChaoticMind))

## [v1.3.0](https://github.com/AtomLinter/linter-flake8/tree/v1.3.0) (2015-02-04)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.2.0...v1.3.0)

**Implemented enhancements:**

- Extract pep257 docstring errors [\#14](https://github.com/AtomLinter/linter-flake8/pull/14) ([matthewwithanm](https://github.com/matthewwithanm))
- Add hangClosing option to support flake8 argument [\#12](https://github.com/AtomLinter/linter-flake8/pull/12) ([cbenz](https://github.com/cbenz))

**Fixed bugs:**

- Grab Q\*\*\* linter error [\#15](https://github.com/AtomLinter/linter-flake8/pull/15) ([2m](https://github.com/2m))

## [v1.2.0](https://github.com/AtomLinter/linter-flake8/tree/v1.2.0) (2014-09-23)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.1.2...v1.2.0)

**Implemented enhancements:**

- add support for --select flag [\#11](https://github.com/AtomLinter/linter-flake8/pull/11) ([schepelin](https://github.com/schepelin))
- Add maxComplexity for mccabe. [\#9](https://github.com/AtomLinter/linter-flake8/pull/9) ([deybhayden](https://github.com/deybhayden))

## [v1.1.2](https://github.com/AtomLinter/linter-flake8/tree/v1.1.2) (2014-08-13)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.1.1...v1.1.2)

## [v1.1.1](https://github.com/AtomLinter/linter-flake8/tree/v1.1.1) (2014-08-13)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.1.0...v1.1.1)

**Merged pull requests:**

- modified regex to handle windows line endings [\#7](https://github.com/AtomLinter/linter-flake8/pull/7) ([ghost](https://github.com/ghost))

## [v1.1.0](https://github.com/AtomLinter/linter-flake8/tree/v1.1.0) (2014-07-28)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.0.8...v1.1.0)

## [v1.0.8](https://github.com/AtomLinter/linter-flake8/tree/v1.0.8) (2014-07-28)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.0.7...v1.0.8)

**Fixed bugs:**

- Uncaught Error: spawn EN0ENT [\#1](https://github.com/AtomLinter/linter-flake8/issues/1)
- Add options, fix typo in defaults [\#3](https://github.com/AtomLinter/linter-flake8/pull/3) ([bstrdsmkr](https://github.com/bstrdsmkr))

## [v1.0.7](https://github.com/AtomLinter/linter-flake8/tree/v1.0.7) (2014-07-23)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/v1.0.6...v1.0.7)

## [v1.0.6](https://github.com/AtomLinter/linter-flake8/tree/v1.0.6) (2014-07-11)

[Full Changelog](https://github.com/AtomLinter/linter-flake8/compare/c8fea6d554af10dc592c87073ec867a2477f226c...v1.0.6)



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
