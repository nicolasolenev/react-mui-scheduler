"use strict";
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
const react_1 = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const react_i18next_1 = require("react-i18next");
const date_fns_1 = require("date-fns");
const dateFnsContext_1 = __importDefault(require("./locales/dateFnsContext"));
const types_1 = require("./types");
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Hidden_1 = __importDefault(require("@mui/material/Hidden"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
const Today_1 = __importDefault(require("@mui/icons-material/Today"));
const Menu_1 = __importDefault(require("@mui/material/Menu"));
const LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
const AdapterDateFns_1 = require("@mui/x-date-pickers/AdapterDateFns");
const StaticDatePicker_1 = require("@mui/x-date-pickers/StaticDatePicker");
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const ToolbarSearchBar_1 = __importDefault(require("./ToolbarSearchBar"));
const GridView_1 = __importDefault(require("@mui/icons-material/GridView"));
const ToggleButtonGroup_1 = __importDefault(require("@mui/material/ToggleButtonGroup"));
const ToggleButton_1 = __importDefault(require("@mui/material/ToggleButton"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
const Collapse_1 = __importDefault(require("@mui/material/Collapse"));
const Alert_1 = __importDefault(require("@mui/material/Alert"));
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
const Toolbar = ({ events, switchMode, alertProps = {
    open: false,
    message: "",
    color: "info",
    severity: "info",
    showActionButton: true,
}, toolbarProps, onModeChange, onDateChange, onSearchResult, onAlertCloseButtonClicked, }) => {
    const theme = (0, styles_1.useTheme)();
    const { t } = (0, react_i18next_1.useTranslation)(["common"]);
    const [mode, setMode] = (0, react_1.useState)(switchMode);
    const [searchResult, setSearchResult] = (0, react_1.useState)();
    const [anchorMenuEl, setAnchorMenuEl] = (0, react_1.useState)(null);
    const [anchorDateEl, setAnchorDateEl] = (0, react_1.useState)(null);
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(new Date());
    const [daysInMonth, setDaysInMonth] = (0, react_1.useState)((0, date_fns_1.getDaysInMonth)(selectedDate));
    const openMenu = Boolean(anchorMenuEl);
    const openDateSelector = Boolean(anchorDateEl);
    const dateFnsLocale = (0, react_1.useContext)(dateFnsContext_1.default);
    const isDayMode = mode.toLowerCase() === types_1.Mode.DAY;
    const isWeekMode = mode.toLowerCase() === types_1.Mode.WEEK;
    const isMonthMode = mode.toLowerCase() === types_1.Mode.MONTH;
    const commonIconButtonProps = {
        size: "medium",
        edge: "start",
        color: "inherit",
        "aria-label": "menu",
    };
    const handleCloseMenu = () => {
        setAnchorMenuEl(null);
    };
    const handleOpenDateSelector = (event) => {
        setAnchorDateEl(event.currentTarget);
    };
    const handleCloseDateSelector = () => {
        setAnchorDateEl(null);
    };
    const handleChangeDate = (method) => {
        if (typeof method !== "function") {
            return;
        }
        let options = { months: 1 };
        if (isWeekMode) {
            options = { weeks: 1 };
        }
        if (isDayMode) {
            options = { days: 1 };
        }
        let newDate = method(selectedDate, options);
        setDaysInMonth((0, date_fns_1.getDaysInMonth)(newDate));
        setSelectedDate(newDate);
    };
    const handleCloseAlert = (e) => {
        onAlertCloseButtonClicked && onAlertCloseButtonClicked(e);
    };
    (0, react_1.useEffect)(() => {
        if (mode && onModeChange)
            onModeChange(mode);
    }, [mode]);
    (0, react_1.useEffect)(() => {
        onDateChange && onDateChange(daysInMonth, selectedDate);
    }, [daysInMonth, selectedDate]);
    (0, react_1.useEffect)(() => {
        onSearchResult && onSearchResult(searchResult);
    }, [searchResult]);
    (0, react_1.useEffect)(() => {
        if (switchMode !== mode) {
            setMode(switchMode);
        }
    }, [switchMode]);
    const handleOpenMenu = (event) => {
        setAnchorMenuEl(event.currentTarget);
    };
    return (react_1.default.createElement(Toolbar_1.default, { variant: "dense", sx: {
            px: "0px !important",
            display: "block",
            borderBottom: `1px ${theme.palette.divider} solid`,
        } },
        react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, { adapterLocale: dateFnsLocale, dateAdapter: AdapterDateFns_1.AdapterDateFns },
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 0, alignItems: "center", justifyContent: "flex-end" },
                react_1.default.createElement(Grid_1.default, { item: true, xs: 1, sm: 2, md: 3 }, toolbarProps.showDatePicker &&
                    react_1.default.createElement(Typography_1.default, { component: "div", sx: { display: "flex" } },
                        react_1.default.createElement(Hidden_1.default, { smDown: true },
                            react_1.default.createElement(IconButton_1.default, { sx: { ml: 0, mr: -.1 }, ...commonIconButtonProps, onClick: () => handleChangeDate(date_fns_1.sub) },
                                react_1.default.createElement(ChevronLeft_1.default, null)),
                            react_1.default.createElement(Button_1.default, { size: "small", id: "basic-button", "aria-haspopup": "true", "aria-controls": "basic-menu", onClick: handleOpenDateSelector, sx: { color: "text.primary" }, "aria-expanded": openDateSelector ? "true" : undefined }, (0, date_fns_1.format)(selectedDate, isMonthMode ? "MMMM-yyyy" : "PPP", { locale: dateFnsLocale })),
                            react_1.default.createElement(IconButton_1.default, { sx: { ml: .2 }, ...commonIconButtonProps, onClick: () => handleChangeDate(date_fns_1.add) },
                                react_1.default.createElement(ChevronRight_1.default, null))),
                        react_1.default.createElement(Hidden_1.default, { smUp: true },
                            react_1.default.createElement(IconButton_1.default, { sx: { ml: 0, "aria-label": "menu" }, ...commonIconButtonProps, size: "small", onClick: handleOpenDateSelector },
                                react_1.default.createElement(Today_1.default, null))),
                        react_1.default.createElement(Menu_1.default, { id: "date-menu", anchorEl: anchorDateEl, open: openDateSelector, onClose: handleCloseDateSelector, MenuListProps: { "aria-labelledby": "basic-button" } },
                            react_1.default.createElement(StaticDatePicker_1.StaticDatePicker, { displayStaticWrapperAs: "desktop", value: selectedDate, views: isMonthMode ?
                                    [types_1.DateView.MONTH, types_1.DateView.YEAR] :
                                    [types_1.DateView.DAY, types_1.DateView.MONTH, types_1.DateView.YEAR], slotProps: toolbarProps.showTodayAction ? { actionBar: { actions: ["today"] } } : {}, onChange: (value) => {
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
                        toolbarProps?.showSearchBar &&
                            react_1.default.createElement(ToolbarSearchBar_1.default, { events: events, onInputChange: (value) => {
                                    let newDate = new Date();
                                    if (value instanceof Event && value?.startDate)
                                        newDate = value.startDate;
                                    setDaysInMonth((0, date_fns_1.getDaysInMonth)(newDate));
                                    setSelectedDate(newDate);
                                    setSearchResult(value);
                                } }),
                        react_1.default.createElement(Hidden_1.default, { mdUp: true },
                            react_1.default.createElement(IconButton_1.default, { sx: { mr: 0, "aria-label": "menu" }, ...commonIconButtonProps, size: "small", onClick: handleOpenDateSelector },
                                react_1.default.createElement(GridView_1.default, null))),
                        react_1.default.createElement(Hidden_1.default, { mdDown: true }, Object.values(toolbarProps.showSwitchModeButtons).some(val => val) &&
                            react_1.default.createElement(ToggleButtonGroup_1.default, { exclusive: true, value: mode, size: "small", color: "primary", "aria-label": "text button group", sx: { mt: .2, mr: 1.3, display: "contents" }, onChange: (e, mode) => {
                                    if (null !== mode)
                                        setMode(mode);
                                } }, [
                                toolbarProps.showSwitchModeButtons?.showMonthButton ?
                                    { label: t("month"), value: types_1.Mode.MONTH } : null,
                                toolbarProps.showSwitchModeButtons?.showWeekButton ?
                                    { label: t("week"), value: types_1.Mode.WEEK } : null,
                                toolbarProps.showSwitchModeButtons?.showDayButton ?
                                    { label: t("day"), value: types_1.Mode.DAY } : null,
                                toolbarProps.showSwitchModeButtons?.showTimelineButton ?
                                    { label: t("timeline"), value: types_1.Mode.TIMELINE } : null,
                            ].filter(Boolean).map(tb => (react_1.default.createElement(ToggleButton_1.default, { sx: { mt: .5 }, key: tb?.value, value: tb?.value }, tb?.label))))),
                        toolbarProps?.showOptions &&
                            react_1.default.createElement(IconButton_1.default, { sx: { ml: 1 }, onClick: handleOpenMenu, ...commonIconButtonProps },
                                react_1.default.createElement(MoreVert_1.default, null)))),
                react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sx: {} },
                    react_1.default.createElement(Menu_1.default, { id: "menu-menu", open: openMenu, anchorEl: anchorMenuEl, onClose: handleCloseMenu, onClick: handleCloseMenu, transformOrigin: { horizontal: "right", vertical: "top" }, anchorOrigin: { horizontal: "right", vertical: "bottom" } }, toolbarProps.optionMenus?.map((menu) => (react_1.default.createElement(MenuItem_1.default, { key: menu.label },
                        react_1.default.createElement(ListItemIcon_1.default, null, menu.icon),
                        react_1.default.createElement(Typography_1.default, { variant: "body2" }, menu.label))))),
                    react_1.default.createElement(Collapse_1.default, { in: alertProps?.open },
                        react_1.default.createElement(Alert_1.default, { color: alertProps?.color, severity: alertProps?.severity, sx: { borderRadius: 0, mb: 0 }, action: alertProps?.showActionButton ?
                                react_1.default.createElement(IconButton_1.default, { "aria-label": "close", color: "inherit", size: "small", onClick: handleCloseAlert },
                                    react_1.default.createElement(Close_1.default, { fontSize: "inherit" })) : null }, alertProps?.message)))))));
};
exports.default = Toolbar;
//# sourceMappingURL=Toolbar.js.map