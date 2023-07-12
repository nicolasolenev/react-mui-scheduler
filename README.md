<p align="center"><a href="" target="_blank"><img align="center" src="https://user-images.githubusercontent.com/12144793/166131609-62c6fa1d-c8fc-4147-8adc-78260836b94b.gif"></a></p>

<!-- ![month-mode-preview.png](https://user-images.githubusercontent.com/12144793/166131609-62c6fa1d-c8fc-4147-8adc-78260836b94b.gif "Month mode preview") -->

<h1 align="center">📅 React Material Scheduler</h1>
<p align="center">developed with <a target="_blank" href="https://mui.com">@mui v5</a> </p>

<p align="center">
  <img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/rouftom/react-mui-scheduler">
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/rouftom/react-mui-scheduler">
  <img alt="Snyk Vulnerabilities for GitHub Repo" src="https://img.shields.io/snyk/vulnerabilities/github/rouftom/react-mui-scheduler">
</p>

---

React mui scheduler is a react component based on @mui v5 that allows you to manage data in a calendar.
<p><a href="https://rouftom.github.io/react-mui-scheduler-demo/" target="_blank">Demo here</a></p>

## 🚀 Installation

```nodejs
  npm install react-mui-scheduler
```

## 💻 Usage

```typescript jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Scheduler, { Event, Mode, StartWeek, TransitionMode } from "react-mui-scheduler";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArchiveIcon from "@mui/icons-material/Archive";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const App = () => {
  const [state] = useState({
    options: {
      transitionMode: TransitionMode.ZOOM, // or TransitionMode.FADE
      startWeekOn: StartWeek.MON,     // or StartWeek.SUN
      defaultMode: Mode.MONTH,    // or Mode.WEEK | Mode.DAY | Mode.TIMELINE
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
      reverseTimelineOrder: false,
    },
    alertProps: {
      open: true,
      color: "info",          // info | success | warning | error
      severity: "info",       // info | success | warning | error
      message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
      showActionButton: true,
      showNotification: true,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: {
        showMonthButton: true,
        showWeekButton: true,
        showDayButton: true,
        showTimelineButton: true,
      },
      showDatePicker: true,
      showOptions: true,
      optionMenus: [
        {
          label: "Read events",
          icon: <PlayCircleOutlineIcon fontSize="small"/>,
        },
        {
          label: "Refresh",
          icon: <AutorenewIcon fontSize="small"/>,
        },
        {
          label: "Export",
          icon: <ArchiveIcon fontSize="small"/>,
        },
        {
          label: "Print",
          icon: <LocalPrintshopIcon fontSize="small"/>,
        },
      ],
    },
  });

  const events = [
    {
      id: "event-1",
      label: "Medical consultation",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startDate: new Date("2022-05-05 04:00"),
      endDate: new Date("2022-05-05 05:00"),
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-2",
      label: "Medical consultation",
      groupLabel: "Dr Claire Brown",
      user: "Dr Claire Brown",
      color: "#099ce5",
      startDate: new Date("2022-05-09 09:00"),
      endDate: new Date("2022-05-09 10:00"),
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-3",
      label: "Medical consultation",
      groupLabel: "Dr Menlendez Hary",
      user: "Dr Menlendez Hary",
      color: "#263686",
      startDate: new Date("2022-05-10 13:00"),
      endDate: new Date("2022-05-10 14:00"),
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-4",
      label: "Consultation prénatale",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startDate: new Date("2022-05-11 08:00"),
      endDate: new Date("2022-05-11 09:00"),
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
  ];

  const handleCellClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: any, day: any) => {
    // Do something...
  };

  const handleEventClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => {
    // Do something...
  };

  const handleEventsChange = (item: Event) => {
    // Do something...
  };

  const handleAlertCloseButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Do something...
  };

  const handleDateChange = (day: number, date: number | Date | null) => {
    // Do something...
  };

  return (
    <Scheduler
      locale="en"
      events={ events }
      legacyStyle={ false }
      options={ state?.options }
      alertProps={ state?.alertProps }
      toolbarProps={ state?.toolbarProps }
      onEventsChange={ handleEventsChange }
      onCellClick={ handleCellClick }
      onTaskClick={ handleEventClick }
      onAlertCloseButtonClicked={ handleAlertCloseButtonClicked }
      onDateChange={ handleDateChange }
    />
  );
};

ReactDOM.render(<App/>, document.querySelector("#yourComponentRootId"));

```

## Event structure

| Name       | Type               | Required | Details                                                    |
|------------|--------------------|----------|------------------------------------------------------------|
| id         | `number \| string` | `true`   | Unique id for every event                                  |
| label      | `string`           | `true`   |                                                            |
| color      | `string`           | `false`  | If not set, the primary color of the theme will be applied |
| groupLabel | `string`           | `true`   |                                                            |
| startDate  | `Date`             | `true`   | Starting Date object of the event                          |
| endDate    | `string`           | `true`   | Ending Date object of the event                            |

For more details about date formats, see [date-fns docs](https://date-fns.org/v2.24.0/docs/)

## Props

| Name                      | Type         | Default | Description                                                      | Values                                                 |
|---------------------------|--------------|---------|------------------------------------------------------------------|--------------------------------------------------------|
| locale                    | string       | `enUS`  | This prop is used to set the locale of the scheduler             | `ar`, `br`, `de`, `enUS`, `es`, `fr`, `ja`, `ko`, `zh` |
| events                    | Event[]      |         | This prop sets event data                                        |                                                        |
| legacyStyle               | boolean      | `false` | This prop allows to use the old display style                    | `false`, `true`                                        |
| options                   | Option       |         | This prop is used to set scheduler properties                    |                                                        |
| alertProps                | AlertProps   |         | This prop is used to set scheduler properties                    |                                                        |
| toolbarProps              | ToolbarProps |         | This prop is used to set toolbar properties                      |                                                        |
| onEventsChange            | event        |         | This event is fired when the event change occurs                 |                                                        |
| onCellClick               | event        |         | This event is fired when a cell is clicked                       |                                                        |
| onTaskClick               | event        |         | This event is fired when a task is clicked                       |                                                        |
| onAlertCloseButtonClicked | event        |         | This event is fired when the close button of the alert component |                                                        |
| onDateChange              | event        |         | This event is fired when a date from the DatePicker is clicked   |                                                        |

## Options

| Name                 | Type           | Default               | Description                                                                     | Values                                                               |
|----------------------|----------------|-----------------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------|
| transitionMode       | TransitionMode | `TransitionMode.ZOOM` | This option is used to define the type of scheduler transition                  | `TransitionMode.ZOOM`, `TransitionMode.FADE`, `TransitionMode.SLIDE` |
| startWeekOn          | StartWeek      | `StartWeek.MON`       | This option is used to set the start of the calendar week to Monday or Sunday   | `StartWeek.MON`, `StartWeek.SUN`                                     |
| defaultMode          | Mode           | `Mode.WEEK`           | This option allows you to define the type of view to display                    | `Mode.MONTH`, `Mode.WEEK`, `Mode.DAY`, `Mode.TIMELINE`               |
| minWidth             | number         | `540`                 | This option allows you to define the minimum width of the container             | `number`                                                             |
| maxWidth             | number         | `540`                 | This option allows you to define the maximum width of the container             | `number`                                                             |
| minHeight            | number         | `540`                 | This option allows you to define the minimum height of the container            | `number`                                                             |
| maxHeight            | number         | `540`                 | This option allows you to define the maximum height of the container            | `number`                                                             |
| reverseTimelineOrder | boolean        | `false`               | This option allows you to define the order of events displayed in Timeline view | `false`, `true`                                                      |

## alertProps

| Name             | Type       | Default                                                    | Description                                                                     | Values                                |
|------------------|------------|------------------------------------------------------------|---------------------------------------------------------------------------------|---------------------------------------|
| open             | boolean    | `true`                                                     | This option opens the notification Alert component                              | `true`, `false`                       |
| color            | AlertColor | `info`                                                     | Alert notification color                                                        | `info`, `success`, `warning`, `error` |
| severity         | AlertColor | `info`                                                     | Alert notification severity                                                     | `info`, `success`, `warning`, `error` |
| message          | string     | `🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥` | Alert notification message to display                                           | `string`                              |
| showActionButton | boolean    | `true`                                                     | This option displays or not the action button on the Alert                      | `true`, `false`                       |
| showNotification | boolean    | `true`                                                     | This option allows to display or not a notification when data change            | `true`, `false`                       |
| delay            | number     | `1500`                                                     | This option allows you to define the display delay in milliseconds of the Alert |                                       |

## toolbarProps

| Name                                     | Type    | Default | Description                                | Values          |
|------------------------------------------|---------|---------|--------------------------------------------|-----------------|
| showSearchBar                            | boolean | `true`  | Show or hide the search bar                | `true`, `false` |
| showSwitchModeButtons                    | object  |         |                                            |                 |
| showSwitchModeButtons.showMonthButton    | boolean | `true`  | Show or hide the view mode button month    | `true`, `false` |
| showSwitchModeButtons.showWeekButton     | boolean | `true`  | Show or hide the view mode button week     | `true`, `false` |
| showSwitchModeButtons.showDayButton      | boolean | `true`  | Show or hide the view mode button day      | `true`, `false` |
| showSwitchModeButtons.showTimelineButton | boolean | `true`  | Show or hide the view mode button timeline | `true`, `false` |
| showDatePicker                           | boolean | `true`  | Show or hide the date picker buttons       | `true`, `false` |

## Methods

| Method                      | Params                                                                          | Type  | Description                                                          |  
|-----------------------------|---------------------------------------------------------------------------------|-------|----------------------------------------------------------------------|
| `onCellClick`               | `event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: any, day: any` | Event | Triggered when clicking on a cell                                    |
| `onEventsChange`            | `item: Event`                                                                   | Event | Triggered when clicking on an event                                  |
| `onAlertCloseButtonClicked` | `event: React.MouseEvent<HTMLButtonElement>`                                    | Event | Triggers when clicking on the close button of the notification alert |
| `onTaskClick`               | `event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event`              | Event | Triggers when clicking on a task event                               |
| `onDateChange`              | `day: number, date: number \| Date \| null`                                     | Event | Triggers when clicking on a date from the DatePicker                 |

## 😁 Authors

- Muller Roufaou ([rouftom](http://github.com/rouftom))
- David Sanchez ([emulienfou](https://github.com/emulienfou))

## 🤔 FAQ

* __Where can I find more documentation?__

  This library is a marriage of [@mui](http://mui.com/getting-started/usage/) and a React setup created
  with [React](https://reactjs.org/). Either one would be a great place to start!

## 🙇‍♂️ Extra

    Do you like this library ? Buy me a coffee or support me with a star on Github

<a href="https://www.buymeacoffee.com/Lnp9rkM" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 180px !important;" ></a>

* Btc address: `bc1qettgagenn9nc8ks7ghntjfme96yvvkfhntk774`

* Eth address: `0xB0413d8D0336E263e289A915c383e152155881E0`

## 🔥 Some features to add in next releases

- ✅ Week, day and timeline mode switch view
- 👉 Option menu
- 👉 Export events as PDF and CSV
- ✅ Internationalization
- ✅ Typescript support
- ✅ Display style customization

## License

### react-mui-scheduler

MIT License

Copyright (c) 2022 rouftom
Copyright (c) 2023 emulienfou

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
