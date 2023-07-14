# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.0.0] - 2023-07-??

### Added

- Adding Typescript support, including types [#12](https://github.com/rouftom/react-mui-scheduler/issues/12)
- Adding new event `onDateChange` prop [#11](https://github.com/rouftom/react-mui-scheduler/issues/11)
- Adding new option `toolbarProps.showOptions` as boolean type
- Adding new option `toolbarProps.optionMenus` to custom menu items
- Adding new locale `pt-BR` [#14](https://github.com/rouftom/react-mui-scheduler/pull/14)
- Adding new option `toolbarProps.showTodayAction` when opening DatePicker
- Adding new option `reverseTimelineOrder` to reverse order of timeline events from latest to older
- Adding new option `displayTimelineByGroupLabel` to display multiple timelines by group label
- Adding eslint config

### Fixed

- Bug with double-click on event [#10](https://github.com/rouftom/react-mui-scheduler/issues/10)
- Fix Chinese translation [#8](https://github.com/rouftom/react-mui-scheduler/pull/8)

### Change

- Rename properties `startHour` and `endHour` to `startDate` and `endDate`
- Change type from `string` to `Date` for `startDate` and `endDate`
- Update `toolbarProps.showSwitchModeButtons` from `boolean` to `object`

### Removed

- Remove field `event.date`, replaced by `startDate` and `endDate`

## [2.0.4] - 2022-05-10

### Fixed

- Fix current day display in month mode view

## [2.0.1] - 2022-05-03

### Fixed

- Fix current day display in month view mode

## [2.0.1] - 2022-05-03

### Fixed

- Fix week date change bug in toolbar

## [2.0.0] - 2022-05-01

### Added

- Add Internationalization. Languages available are `ar`, `de`, `en`, `es`, `fr`, `ja`, `ko`, `zh`
- Resolves [#2](https://github.com/rouftom/react-mui-scheduler/issues/2)

### Changed

- Add new display style

### Fixed

## [1.2.6] - 2022-04-26

### Changed

- 📢 Update dependencies versions.

### Fixed

- Fix #3 Correct rendering of months that start on a Sunday and update of dependencies

## [1.2.0] - 2021-10-02

### Added

- 🥳 Day and Timeline mode switch view.

### Changed

- 📢 Update alert notification behavior.

### Fixed

- Drag and drop capability is now stable.

## [1.1.0] - 2021-09-29

### Changed

- Change date selector margin styles.
- Update date selector styles in toolbar

### Fixed

- Hide features not ready and fix readme.md typo.

## [1.0.0] - 2021-09-29

### Changed

- Fix readme.md and package.json typo.
- Update package name.
