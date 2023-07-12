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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var react_i18next_1 = require("react-i18next");
var date_fns_1 = require("date-fns");
var dateFnsContext_1 = __importDefault(require("./locales/dateFnsContext"));
var types_1 = require("./types");
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Hidden_1 = __importDefault(require("@mui/material/Hidden"));
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
var Today_1 = __importDefault(require("@mui/icons-material/Today"));
var Menu_1 = __importDefault(require("@mui/material/Menu"));
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var AdapterDateFns_1 = require("@mui/x-date-pickers/AdapterDateFns");
var StaticDatePicker_1 = require("@mui/x-date-pickers/StaticDatePicker");
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var ToolbarSearchBar_1 = __importDefault(require("./ToolbarSearchBar"));
var GridView_1 = __importDefault(require("@mui/icons-material/GridView"));
var ToggleButtonGroup_1 = __importDefault(require("@mui/material/ToggleButtonGroup"));
var ToggleButton_1 = __importDefault(require("@mui/material/ToggleButton"));
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
var Collapse_1 = __importDefault(require("@mui/material/Collapse"));
var Alert_1 = __importDefault(require("@mui/material/Alert"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
var MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
var Toolbar = function (_a) {
    var _b;
    var events = _a.events, switchMode = _a.switchMode, _c = _a.alertProps, alertProps = _c === void 0 ? {
        open: false,
        message: "",
        color: "info",
        severity: "info",
        showActionButton: true,
    } : _c, toolbarProps = _a.toolbarProps, onModeChange = _a.onModeChange, onDateChange = _a.onDateChange, onSearchResult = _a.onSearchResult, onAlertCloseButtonClicked = _a.onAlertCloseButtonClicked;
    var theme = (0, styles_1.useTheme)();
    var t = (0, react_i18next_1.useTranslation)(["common"]).t;
    var _d = (0, react_1.useState)(switchMode), mode = _d[0], setMode = _d[1];
    var _e = (0, react_1.useState)(), searchResult = _e[0], setSearchResult = _e[1];
    var _f = (0, react_1.useState)(null), anchorMenuEl = _f[0], setAnchorMenuEl = _f[1];
    var _g = (0, react_1.useState)(null), anchorDateEl = _g[0], setAnchorDateEl = _g[1];
    var _h = (0, react_1.useState)(new Date()), selectedDate = _h[0], setSelectedDate = _h[1];
    var _j = (0, react_1.useState)((0, date_fns_1.getDaysInMonth)(selectedDate)), daysInMonth = _j[0], setDaysInMonth = _j[1];
    var openMenu = Boolean(anchorMenuEl);
    var openDateSelector = Boolean(anchorDateEl);
    var dateFnsLocale = (0, react_1.useContext)(dateFnsContext_1.default);
    var isDayMode = mode.toLowerCase() === types_1.Mode.DAY;
    var isWeekMode = mode.toLowerCase() === types_1.Mode.WEEK;
    var isMonthMode = mode.toLowerCase() === types_1.Mode.MONTH;
    var commonIconButtonProps = {
        size: "medium",
        edge: "start",
        color: "inherit",
        "aria-label": "menu",
    };
    var handleCloseMenu = function () {
        setAnchorMenuEl(null);
    };
    var handleOpenDateSelector = function (event) {
        setAnchorDateEl(event.currentTarget);
    };
    var handleCloseDateSelector = function () {
        setAnchorDateEl(null);
    };
    var handleChangeDate = function (method) {
        if (typeof method !== "function") {
            return;
        }
        var options = { months: 1 };
        if (isWeekMode) {
            options = { weeks: 1 };
        }
        if (isDayMode) {
            options = { days: 1 };
        }
        var newDate = method(selectedDate, options);
        setDaysInMonth((0, date_fns_1.getDaysInMonth)(newDate));
        setSelectedDate(newDate);
    };
    var handleCloseAlert = function (e) {
        onAlertCloseButtonClicked && onAlertCloseButtonClicked(e);
    };
    (0, react_1.useEffect)(function () {
        if (mode && onModeChange) {
            onModeChange(mode);
        }
    }, [mode]);
    (0, react_1.useEffect)(function () {
        onDateChange && onDateChange(daysInMonth, selectedDate);
    }, [daysInMonth, selectedDate]);
    (0, react_1.useEffect)(function () {
        onSearchResult && onSearchResult(searchResult);
    }, [searchResult]);
    (0, react_1.useEffect)(function () {
        if (switchMode !== mode) {
            setMode(switchMode);
        }
    }, [switchMode]);
    var handleOpenMenu = function (event) {
        setAnchorMenuEl(event.currentTarget);
    };
    return (react_1.default.createElement(Toolbar_1.default, { variant: "dense", sx: {
            px: "0px !important",
            display: "block",
            borderBottom: "1px ".concat(theme.palette.divider, " solid"),
        } },
        react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, { adapterLocale: dateFnsLocale, dateAdapter: AdapterDateFns_1.AdapterDateFns },
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 0, alignItems: "center", justifyContent: "flex-end" },
                react_1.default.createElement(Grid_1.default, { item: true, xs: 1, sm: 2, md: 3 }, toolbarProps.showDatePicker &&
                    react_1.default.createElement(Typography_1.default, { component: "div", sx: { display: "flex" } },
                        react_1.default.createElement(Hidden_1.default, { smDown: true },
                            react_1.default.createElement(IconButton_1.default, __assign({ sx: { ml: 0, mr: -.1 } }, commonIconButtonProps, { onClick: function () { return handleChangeDate(date_fns_1.sub); } }),
                                react_1.default.createElement(ChevronLeft_1.default, null)),
                            react_1.default.createElement(Button_1.default, { size: "small", id: "basic-button", "aria-haspopup": "true", "aria-controls": "basic-menu", onClick: handleOpenDateSelector, sx: { color: "text.primary" }, "aria-expanded": openDateSelector ? "true" : undefined }, (0, date_fns_1.format)(selectedDate, isMonthMode ? "MMMM-yyyy" : "PPP", { locale: dateFnsLocale })),
                            react_1.default.createElement(IconButton_1.default, __assign({ sx: { ml: .2 } }, commonIconButtonProps, { onClick: function () { return handleChangeDate(date_fns_1.add); } }),
                                react_1.default.createElement(ChevronRight_1.default, null))),
                        react_1.default.createElement(Hidden_1.default, { smUp: true },
                            react_1.default.createElement(IconButton_1.default, __assign({ sx: { ml: 0, "aria-label": "menu" } }, commonIconButtonProps, { size: "small", onClick: handleOpenDateSelector }),
                                react_1.default.createElement(Today_1.default, null))),
                        react_1.default.createElement(Menu_1.default, { id: "date-menu", anchorEl: anchorDateEl, open: openDateSelector, onClose: handleCloseDateSelector, MenuListProps: { "aria-labelledby": "basic-button" } },
                            react_1.default.createElement(StaticDatePicker_1.StaticDatePicker, { displayStaticWrapperAs: "desktop", value: selectedDate, views: isMonthMode ?
                                    [types_1.DateView.MONTH, types_1.DateView.YEAR] :
                                    [types_1.DateView.DAY, types_1.DateView.MONTH, types_1.DateView.YEAR], onChange: function (value) {
                                    setDaysInMonth((0, date_fns_1.getDaysInMonth)(value));
                                    setSelectedDate(value);
                                    handleCloseDateSelector();
                                } })))),
                react_1.default.createElement(Grid_1.default, { item: true, xs: true, sm: true, md: true, sx: { textAlign: "right" } },
                    react_1.default.createElement(Stack_1.default, { direction: "row", sx: {
                            pr: .5,
                            alignItems: "center",
                            justifyContent: "flex-end",
                        } },
                        (toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.showSearchBar) &&
                            react_1.default.createElement(ToolbarSearchBar_1.default, { events: events, onInputChange: function (value) {
                                    var newDate = new Date();
                                    if (value instanceof Event && (value === null || value === void 0 ? void 0 : value.date))
                                        newDate = value.date;
                                    setDaysInMonth((0, date_fns_1.getDaysInMonth)(newDate));
                                    setSelectedDate(newDate);
                                    setSearchResult(value);
                                } }),
                        react_1.default.createElement(Hidden_1.default, { mdUp: true },
                            react_1.default.createElement(IconButton_1.default, __assign({ sx: { mr: 0, "aria-label": "menu" } }, commonIconButtonProps, { size: "small", onClick: handleOpenDateSelector }),
                                react_1.default.createElement(GridView_1.default, null))),
                        react_1.default.createElement(Hidden_1.default, { mdDown: true }, Object.values(toolbarProps.showSwitchModeButtons).some(function (val) { return val; }) &&
                            react_1.default.createElement(ToggleButtonGroup_1.default, { exclusive: true, value: mode, size: "small", color: "primary", "aria-label": "text button group", sx: { mt: .2, mr: 1.3, display: "contents" }, onChange: function (e, newMode) {
                                    if (null !== newMode)
                                        setMode(newMode);
                                } }, [
                                toolbarProps.showSwitchModeButtons.showMonthButton ?
                                    { label: t("month"), value: types_1.Mode.MONTH } : null,
                                toolbarProps.showSwitchModeButtons.showWeekButton ?
                                    { label: t("week"), value: types_1.Mode.WEEK } : null,
                                toolbarProps.showSwitchModeButtons.showDayButton ?
                                    { label: t("day"), value: types_1.Mode.DAY } : null,
                                toolbarProps.showSwitchModeButtons.showTimelineButton ?
                                    { label: t("timeline"), value: types_1.Mode.TIMELINE } : null,
                            ].filter(Boolean).map(function (tb) { return (react_1.default.createElement(ToggleButton_1.default, { sx: { mt: .5 }, key: tb === null || tb === void 0 ? void 0 : tb.value, value: tb === null || tb === void 0 ? void 0 : tb.value }, tb === null || tb === void 0 ? void 0 : tb.label)); }))),
                        (toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.showOptions) &&
                            react_1.default.createElement(IconButton_1.default, __assign({ sx: { ml: 1 }, onClick: handleOpenMenu }, commonIconButtonProps),
                                react_1.default.createElement(MoreVert_1.default, null)))),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sx: {} },
                    react_1.default.createElement(Menu_1.default, { id: "menu-menu", open: openMenu, anchorEl: anchorMenuEl, onClose: handleCloseMenu, onClick: handleCloseMenu, transformOrigin: { horizontal: "right", vertical: "top" }, anchorOrigin: { horizontal: "right", vertical: "bottom" } }, (_b = toolbarProps.optionMenus) === null || _b === void 0 ? void 0 : _b.map(function (menu) { return (react_1.default.createElement(MenuItem_1.default, { key: menu.label },
                        react_1.default.createElement(ListItemIcon_1.default, null, menu.icon),
                        react_1.default.createElement(Typography_1.default, { variant: "body2" }, menu.label))); })),
                    react_1.default.createElement(Collapse_1.default, { in: alertProps === null || alertProps === void 0 ? void 0 : alertProps.open },
                        react_1.default.createElement(Alert_1.default, { color: alertProps === null || alertProps === void 0 ? void 0 : alertProps.color, severity: alertProps === null || alertProps === void 0 ? void 0 : alertProps.severity, sx: { borderRadius: 0, mb: 0 }, action: (alertProps === null || alertProps === void 0 ? void 0 : alertProps.showActionButton) ?
                                react_1.default.createElement(IconButton_1.default, { "aria-label": "close", color: "inherit", size: "small", onClick: handleCloseAlert },
                                    react_1.default.createElement(Close_1.default, { fontSize: "inherit" })) : null }, alertProps === null || alertProps === void 0 ? void 0 : alertProps.message)))))));
};
exports.default = Toolbar;
//# sourceMappingURL=Toolbar.js.map