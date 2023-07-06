"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var react_i18next_1 = require("react-i18next");
var types_1 = require("./types");
var date_fns_1 = require("date-fns");
var Zoom_1 = __importDefault(require("@mui/material/Zoom"));
var Fade_1 = __importDefault(require("@mui/material/Fade"));
var Slide_1 = __importDefault(require("@mui/material/Slide"));
var locale_1 = require("date-fns/locale");
var Paper_1 = __importDefault(require("@mui/material/Paper"));
var dateFnsContext_1 = __importDefault(require("./locales/dateFnsContext"));
var Toolbar_1 = __importDefault(require("./Toolbar"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var MonthModeView_1 = __importDefault(require("./MonthModeView"));
var WeekModeView_1 = __importDefault(require("./WeekModeView"));
var DayModeView_1 = __importDefault(require("./DayModeView"));
var TimeLineModeView_1 = __importDefault(require("./TimeLineModeView"));
var Scheduler = function (_a) {
    var events = _a.events, _b = _a.locale, locale = _b === void 0 ? "en" : _b, options = _a.options, alertProps = _a.alertProps, onCellClick = _a.onCellClick, _c = _a.legacyStyle, legacyStyle = _c === void 0 ? false : _c, onTaskClick = _a.onTaskClick, _d = _a.toolbarProps, toolbarProps = _d === void 0 ? {
        showSearchBar: true,
        showSwitchModeButtons: {
            showMonthButton: true,
            showWeekButton: true,
            showDayButton: true,
            showTimelineButton: true,
        },
        showDatePicker: true,
        showOptions: true,
        optionMenus: [],
    } : _d, onEventsChange = _a.onEventsChange, onAlertCloseButtonClicked = _a.onAlertCloseButtonClicked, onDateChange = _a.onDateChange;
    var today = new Date();
    (0, styles_1.useTheme)();
    var _e = (0, react_i18next_1.useTranslation)(["common"]), t = _e.t, i18n = _e.i18n;
    var weeks = [
        t("mon"), t("tue"), t("wed"),
        t("thu"), t("fri"), t("sat"),
        t("sun"),
    ];
    var _f = (0, react_1.useState)({}), state = _f[0], setState = _f[1];
    var _g = (0, react_1.useState)(), searchResult = _g[0], setSearchResult = _g[1];
    var _h = (0, react_1.useState)(today), selectedDay = _h[0], setSelectedDay = _h[1];
    var _j = (0, react_1.useState)(alertProps), alertState = _j[0], setAlertState = _j[1];
    var _k = (0, react_1.useState)((options === null || options === void 0 ? void 0 : options.defaultMode) || types_1.Mode.MONTH), mode = _k[0], setMode = _k[1];
    var _l = (0, react_1.useState)((0, date_fns_1.getDaysInMonth)(today)), daysInMonth = _l[0], setDaysInMonth = _l[1];
    var _m = (0, react_1.useState)((options === null || options === void 0 ? void 0 : options.startWeekOn) || types_1.StartWeek.MON), startWeekOn = _m[0], setStartWeekOn = _m[1];
    var _o = (0, react_1.useState)((0, date_fns_1.format)(today, "MMMM-yyyy")), selectedDate = _o[0], setSelectedDate = _o[1];
    var _p = (0, react_1.useReducer)(function () {
        var _a;
        return ((_a = options === null || options === void 0 ? void 0 : options.startWeekOn) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === "SUN" ? [
            t("sun"), t("mon"), t("tue"),
            t("wed"), t("thu"), t("fri"),
            t("sat"),
        ] : weeks;
    }, weeks), weekDays = _p[0], updateWeekDays = _p[1];
    var isDayMode = mode.toLowerCase() === types_1.Mode.DAY;
    var isWeekMode = mode.toLowerCase() === types_1.Mode.WEEK;
    var isMonthMode = mode.toLowerCase() === types_1.Mode.MONTH;
    var isTimelineMode = mode.toLowerCase() === types_1.Mode.TIMELINE;
    var TransitionModeComponent = ((options === null || options === void 0 ? void 0 : options.transitionMode) === types_1.TransitionMode.ZOOM ? Zoom_1.default :
        (options === null || options === void 0 ? void 0 : options.transitionMode) === types_1.TransitionMode.FADE ? Fade_1.default : Slide_1.default);
    var dateFnsLocale;
    switch (locale) {
        case "fr":
            dateFnsLocale = locale_1.fr;
            break;
        case "ko":
            dateFnsLocale = locale_1.ko;
            break;
        case "de":
            dateFnsLocale = locale_1.de;
            break;
        case "es":
            dateFnsLocale = locale_1.es;
            break;
        case "ar":
            dateFnsLocale = locale_1.ar;
            break;
        case "ja":
            dateFnsLocale = locale_1.ja;
            break;
        case "ru":
            dateFnsLocale = locale_1.ru;
            break;
        case "zh":
            dateFnsLocale = locale_1.zhCN;
            break;
        case "br":
            dateFnsLocale = locale_1.ptBR;
            break;
        default:
            dateFnsLocale = locale_1.enUS;
    }
    var getMonthHeader = function () {
        return weekDays.map(function (day, i) { return ({
            id: "row-day-header-".concat(i + 1),
            flex: 1,
            sortable: false,
            editable: false,
            align: "center",
            headerName: day,
            headerAlign: "center",
            field: "rowday".concat(i + 1),
            headerClassName: "scheduler-theme--header",
        }); });
    };
    var getMonthRows = function () {
        var _a, _b;
        var rows = [], daysBefore = [];
        var iteration = (0, date_fns_1.getWeeksInMonth)(selectedDay);
        var startOnSunday = ((startWeekOn === null || startWeekOn === void 0 ? void 0 : startWeekOn.toUpperCase()) === "SUN" &&
            t("sun").toUpperCase() === weekDays[0].toUpperCase());
        var monthStartDate = (0, date_fns_1.startOfMonth)(selectedDay); // First day of month
        var monthStartDay = (0, date_fns_1.getDay)(monthStartDate); // Index of the day in week
        var dateDay = parseInt((0, date_fns_1.format)(monthStartDate, "dd")); // Month start day
        // Condition check helper
        var checkCondition = function (v) { return (startOnSunday ? v <= monthStartDay : v < monthStartDay); };
        if (monthStartDay >= 1) {
            var _loop_1 = function (i) {
                var subDate = (0, date_fns_1.sub)(monthStartDate, { days: monthStartDay - i + (startOnSunday ? 1 : 0) });
                var day = parseInt((0, date_fns_1.format)(subDate, "dd"));
                var data = events.filter(function (event) { return ((0, date_fns_1.isSameDay)(subDate, (0, date_fns_1.parse)(event === null || event === void 0 ? void 0 : event.date, "yyyy-MM-dd", new Date()))); });
                daysBefore.push({
                    id: "day_-".concat(day),
                    day: day,
                    date: subDate,
                    data: data,
                });
            };
            // Add days of precedent month
            // If Sunday is the first day of week, apply b <= monthStartDay
            // and days: (monthStartDay-b) + 1
            for (var i = 1; checkCondition(i); i++) {
                _loop_1(i);
            }
        }
        else if (!startOnSunday) {
            var _loop_2 = function (i) {
                var subDate = (0, date_fns_1.sub)(monthStartDate, { days: i });
                var day = parseInt((0, date_fns_1.format)(subDate, "dd"));
                var data = events.filter(function (event) { return ((0, date_fns_1.isSameDay)(subDate, (0, date_fns_1.parse)(event === null || event === void 0 ? void 0 : event.date, "yyyy-MM-dd", new Date()))); });
                daysBefore.push({
                    id: "day_-".concat(day),
                    day: day,
                    date: subDate,
                    data: data,
                });
            };
            for (var i = 6; i > 0; i--) {
                _loop_2(i);
            }
        }
        if (daysBefore.length > 0) {
            rows.push({ id: 0, days: daysBefore });
        }
        // Add days and events data
        for (var i = 0; i < iteration; i++) {
            var obj = [];
            var _loop_3 = function (j) {
                var date = (0, date_fns_1.parse)("".concat(dateDay, "-").concat(selectedDate), "dd-MMMM-yyyy", new Date());
                var data = events.filter(function (event) { return ((0, date_fns_1.isSameDay)(date, (0, date_fns_1.parse)(event === null || event === void 0 ? void 0 : event.date, "yyyy-MM-dd", new Date()))); });
                obj.push({
                    id: "day_-".concat(dateDay),
                    date: date,
                    data: data,
                    day: dateDay,
                });
                dateDay++;
            };
            for (var j = 0; 
            // This condition ensure that days will not exceed 31
            // i === 0 ? 7 - daysBefore?.length means that we substract inserted days
            // in the first line to 7
            j < (i === 0 ? 7 - daysBefore.length : 7) && (dateDay <= daysInMonth); j++) {
                _loop_3(j);
            }
            if (i === 0 && daysBefore.length > 0) {
                rows[0].days = rows[0].days.concat(obj);
                continue;
            }
            if (obj.length > 0) {
                rows.push({ id: i, days: obj });
            }
        }
        // Check if last row is not fully filled
        var lastRow = rows[iteration - 1];
        var lastRowDaysDiff = 7 - ((_a = lastRow === null || lastRow === void 0 ? void 0 : lastRow.days) === null || _a === void 0 ? void 0 : _a.length);
        var lastDaysData = [];
        if (lastRowDaysDiff > 0) {
            var day = lastRow.days[((_b = lastRow === null || lastRow === void 0 ? void 0 : lastRow.days) === null || _b === void 0 ? void 0 : _b.length) - 1];
            var addDate_1 = day.date;
            for (var i = dateDay; i < (dateDay + lastRowDaysDiff); i++) {
                addDate_1 = (0, date_fns_1.add)(addDate_1, { days: 1 });
                var d = (0, date_fns_1.format)(addDate_1, "dd");
                // eslint-disable-next-line
                var data = events.filter(function (event) { return ((0, date_fns_1.isSameDay)(addDate_1, (0, date_fns_1.parse)(event === null || event === void 0 ? void 0 : event.date, "yyyy-MM-dd", new Date()))); });
                lastDaysData.push({
                    id: "day_-".concat(d),
                    date: addDate_1,
                    day: d,
                    data: data,
                });
            }
            rows[iteration - 1].days = rows[iteration - 1].days.concat(lastDaysData);
        }
        return rows;
    };
    var getWeekHeader = function () {
        var data = [];
        var weekStart = (0, date_fns_1.startOfWeek)(selectedDay, { weekStartsOn: startWeekOn === types_1.StartWeek.MON ? 1 : 0 });
        for (var i = 0; i < 7; i++) {
            var date = (0, date_fns_1.add)(weekStart, { days: i });
            data.push({
                date: date,
                weekDay: (0, date_fns_1.format)(date, "iii", { locale: dateFnsLocale }),
                day: (0, date_fns_1.format)(date, "dd", { locale: dateFnsLocale }),
                month: (0, date_fns_1.format)(date, "MM", { locale: dateFnsLocale }),
            });
        }
        return data;
    };
    var getWeekRows = function () {
        var HOURS = 24; //* 2
        var data = [];
        var dayStartHour = (0, date_fns_1.startOfDay)(selectedDay);
        var _loop_4 = function (i) {
            var id = "line_".concat(i);
            var label = (0, date_fns_1.format)(dayStartHour, "HH:mm aaa");
            //TODO Add everyday event capability
            //if (i === 0) {
            //id = `line_everyday`; label = 'Everyday'
            //}
            //TODO Place the processing bloc here if everyday capability is available
            // ...
            if (i > 0) {
                //Start processing bloc
                var obj_1 = { id: id, label: label, days: [] };
                var columns = getWeekHeader();
                // eslint-disable-next-line
                columns.map(function (column, index) {
                    var data = events.filter(function (event) {
                        var _a;
                        var eventDate = (0, date_fns_1.parse)(event === null || event === void 0 ? void 0 : event.date, "yyyy-MM-dd", new Date());
                        return ((0, date_fns_1.isSameDay)(column === null || column === void 0 ? void 0 : column.date, eventDate) &&
                            ((_a = event === null || event === void 0 ? void 0 : event.startHour) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === (label === null || label === void 0 ? void 0 : label.toUpperCase()));
                    });
                    obj_1.days.push({
                        id: "column-".concat(index, "_m-").concat(column.month, "_d-").concat(column.day, "_").concat(id),
                        date: column === null || column === void 0 ? void 0 : column.date,
                        data: data,
                    });
                });
                // Label affectation
                data.push(obj_1); // End processing bloc
                dayStartHour = (0, date_fns_1.add)(dayStartHour, { minutes: 60 }); // 30
            }
        };
        for (var i = 0; i <= HOURS; i++) {
            _loop_4(i);
        }
        return data;
    };
    var getDayHeader = function () { return ([
        {
            date: selectedDay,
            weekDay: (0, date_fns_1.format)(selectedDay, "iii", { locale: dateFnsLocale }),
            day: (0, date_fns_1.format)(selectedDay, "dd", { locale: dateFnsLocale }),
            month: (0, date_fns_1.format)(selectedDay, "MM", { locale: dateFnsLocale }),
        },
    ]); };
    var getDayRows = function () {
        var HOURS = 24;
        var data = [];
        var dayStartHour = (0, date_fns_1.startOfDay)(selectedDay);
        var _loop_5 = function (i) {
            var id = "line_".concat(i);
            var label = (0, date_fns_1.format)(dayStartHour, "HH:mm aaa");
            if (i > 0) {
                var obj = { id: id, label: label, days: [] };
                var columns = getDayHeader();
                var column_1 = columns[0];
                var matchedEvents = events.filter(function (event) {
                    var _a;
                    var eventDate = (0, date_fns_1.parse)(event === null || event === void 0 ? void 0 : event.date, "yyyy-MM-dd", new Date());
                    return ((0, date_fns_1.isSameDay)(column_1 === null || column_1 === void 0 ? void 0 : column_1.date, eventDate) &&
                        ((_a = event === null || event === void 0 ? void 0 : event.startHour) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === (label === null || label === void 0 ? void 0 : label.toUpperCase()));
                });
                obj.days.push({
                    id: "column-_m-".concat(column_1 === null || column_1 === void 0 ? void 0 : column_1.month, "_d-").concat(column_1 === null || column_1 === void 0 ? void 0 : column_1.day, "_").concat(id),
                    date: column_1 === null || column_1 === void 0 ? void 0 : column_1.date,
                    data: matchedEvents,
                });
                data.push(obj);
                dayStartHour = (0, date_fns_1.add)(dayStartHour, { minutes: 60 });
            }
        };
        for (var i = 0; i <= HOURS; i++) {
            _loop_5(i);
        }
        return data;
    };
    var getTimeLineRows = function () { return events; };
    var handleDateChange = function (day, date) {
        setDaysInMonth(day);
        setSelectedDay(date);
        setSelectedDate((0, date_fns_1.format)(date, "MMMM-yyyy"));
        onDateChange && onDateChange(day, date);
    };
    var handleModeChange = function (newMode) {
        setMode(newMode);
    };
    var onSearchResult = function (item) {
        setSearchResult(item);
    };
    var handleEventsChange = function (item) { return __awaiter(void 0, void 0, void 0, function () {
        var eventIndex, oldObject;
        return __generator(this, function (_a) {
            onEventsChange && onEventsChange(item);
            eventIndex = events.findIndex(function (e) { return e.id === (item === null || item === void 0 ? void 0 : item.id); });
            if (eventIndex !== -1) {
                oldObject = Object.assign({}, events[eventIndex]);
                if ((alertState === null || alertState === void 0 ? void 0 : alertState.showNotification) && !alertState.open) {
                    setAlertState(__assign(__assign({}, alertState), { open: true, message: "\n            ".concat(item === null || item === void 0 ? void 0 : item.label, " successfully moved from ").concat(oldObject === null || oldObject === void 0 ? void 0 : oldObject.date, "\n            ").concat(oldObject === null || oldObject === void 0 ? void 0 : oldObject.startHour, " to ").concat(item === null || item === void 0 ? void 0 : item.date, " ").concat(item === null || item === void 0 ? void 0 : item.startHour, "\n          ") }));
                    setTimeout(function () {
                        setAlertState(__assign(__assign({}, alertState), { open: false, message: "" }));
                    }, alertState.delay);
                }
            }
            return [2 /*return*/];
        });
    }); };
    (0, react_1.useEffect)(function () {
        if (isMonthMode) {
            setState(__assign(__assign({}, state), { columns: getMonthHeader(), rows: getMonthRows() }));
        }
        if (isWeekMode) {
            setState(__assign(__assign({}, state), { columns: getWeekHeader(), rows: getWeekRows() }));
        }
        if (isDayMode) {
            setState(__assign(__assign({}, state), { columns: getDayHeader(), rows: getDayRows() }));
        }
        if (isTimelineMode) {
            setState(__assign(__assign({}, state), { columns: getDayHeader(), rows: getTimeLineRows() }));
        }
    }, [
        mode,
        weekDays,
        daysInMonth,
        selectedDay,
        selectedDate,
        dateFnsLocale,
        i18n.language,
        startWeekOn,
    ]);
    (0, react_1.useEffect)(function () {
        if (locale !== i18n.language) {
            localStorage.setItem("i18nextLng", locale.toLowerCase());
            i18n.changeLanguage(locale.toLowerCase());
            updateWeekDays();
        }
    }, [locale]);
    (0, react_1.useEffect)(function () {
        if ((options === null || options === void 0 ? void 0 : options.defaultMode) !== mode) {
            setMode(options === null || options === void 0 ? void 0 : options.defaultMode);
        }
    }, [options === null || options === void 0 ? void 0 : options.defaultMode]);
    (0, react_1.useEffect)(function () {
        if ((options === null || options === void 0 ? void 0 : options.startWeekOn) !== undefined && options.startWeekOn !== startWeekOn) {
            setStartWeekOn(options.startWeekOn);
        }
        updateWeekDays();
    }, [options === null || options === void 0 ? void 0 : options.startWeekOn]);
    return (react_1.default.createElement(Paper_1.default, { variant: "outlined", elevation: 0, sx: { p: 0 } },
        react_1.default.createElement(dateFnsContext_1.default.Provider, { value: dateFnsLocale },
            react_1.default.createElement(Toolbar_1.default, { today: today, events: events, switchMode: mode, alertProps: alertState, toolbarProps: toolbarProps, onDateChange: handleDateChange, onModeChange: handleModeChange, onSearchResult: onSearchResult, onAlertCloseButtonClicked: onAlertCloseButtonClicked }),
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 0, alignItems: "center", justifyContent: "start" },
                isMonthMode &&
                    react_1.default.createElement(TransitionModeComponent, { in: true },
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                            react_1.default.createElement(MonthModeView_1.default, { options: options, rows: state === null || state === void 0 ? void 0 : state.rows, columns: state === null || state === void 0 ? void 0 : state.columns, legacyStyle: legacyStyle, onTaskClick: onTaskClick, onCellClick: onCellClick, searchResult: searchResult, onEventsChange: handleEventsChange }))),
                isWeekMode &&
                    react_1.default.createElement(TransitionModeComponent, { in: true },
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                            react_1.default.createElement(WeekModeView_1.default, { options: options, rows: state === null || state === void 0 ? void 0 : state.rows, columns: state === null || state === void 0 ? void 0 : state.columns, onTaskClick: onTaskClick, onCellClick: onCellClick, searchResult: searchResult, onEventsChange: handleEventsChange }))),
                isDayMode &&
                    react_1.default.createElement(TransitionModeComponent, { in: true },
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                            react_1.default.createElement(DayModeView_1.default, { options: options, date: selectedDate, rows: state === null || state === void 0 ? void 0 : state.rows, columns: state === null || state === void 0 ? void 0 : state.columns, onTaskClick: onTaskClick, onCellClick: onCellClick, searchResult: searchResult, onEventsChange: handleEventsChange })))),
            isTimelineMode &&
                react_1.default.createElement(TransitionModeComponent, { in: true },
                    react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, alignItems: "start" },
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                            react_1.default.createElement(TimeLineModeView_1.default, { options: options, rows: state === null || state === void 0 ? void 0 : state.rows, onTaskClick: onTaskClick, searchResult: searchResult })))))));
};
exports.default = Scheduler;
//# sourceMappingURL=Scheduler.js.map