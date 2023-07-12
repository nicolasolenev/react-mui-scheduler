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
var material_1 = require("@mui/material");
var react_i18next_1 = require("react-i18next");
var date_fns_1 = require("date-fns");
var dateFnsContext_1 = __importDefault(require("./locales/dateFnsContext"));
var StyledAutoComplete = (0, styles_1.styled)((material_1.Autocomplete))(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {
            color: "inherit",
            width: "94%",
            display: "inline-flex",
            margin: theme.spacing(.5, 1.5),
            transition: theme.transitions.create("width")
        },
        _b[theme.breakpoints.up("sm")] = {
            width: "100%",
        },
        _b[theme.breakpoints.up("md")] = {
            width: "27ch",
        },
        _b[theme.breakpoints.up("lg")] = {
            width: "27ch",
        },
        _b);
});
var ToolbarSearchBar = function (_a) {
    var events = _a.events, onInputChange = _a.onInputChange;
    var t = (0, react_i18next_1.useTranslation)(["common"]).t;
    var _b = (0, react_1.useState)(), value = _b[0], setValue = _b[1];
    var _c = (0, react_1.useState)(""), inputValue = _c[0], setInputValue = _c[1];
    var dateFnsLocale = (0, react_1.useContext)(dateFnsContext_1.default);
    var handleOnChange = function (event, value) {
        setValue(value);
        if (onInputChange)
            onInputChange("".concat((value === null || value === void 0 ? void 0 : value.groupLabel) || "", " | (").concat((value === null || value === void 0 ? void 0 : value.startHour) || "", " - ").concat((value === null || value === void 0 ? void 0 : value.endHour) || "", ")"));
    };
    return (react_1.default.createElement(StyledAutoComplete, { value: value, id: "scheduler-autocomplete", inputValue: inputValue, sx: { mb: 0, display: "inline-flex" }, onChange: handleOnChange, options: events, groupBy: function (option) { return option ? option === null || option === void 0 ? void 0 : option.groupLabel : ""; }, getOptionLabel: function (option) { return (option ?
            "".concat(option.groupLabel || "", " | ").concat(option.date, " | (").concat(option.startHour || "", " - ").concat(option.endHour || "", ")") : ""); }, isOptionEqualToValue: function (option, value) { return option.id === value.id; }, onInputChange: function (event, newInputValue) {
            setInputValue(newInputValue);
            onInputChange(newInputValue);
        }, renderOption: function (props, option) { return (react_1.default.createElement(material_1.Box, __assign({ component: "li", sx: { fontSize: 12 } }, props), "".concat((0, date_fns_1.format)(option === null || option === void 0 ? void 0 : option.date, "dd-MMMM-yyyy", { locale: dateFnsLocale }), " (").concat((option === null || option === void 0 ? void 0 : option.startHour) || "", " - ").concat((option === null || option === void 0 ? void 0 : option.endHour) || "", ")"))); }, renderInput: function (params) { return (react_1.default.createElement(material_1.TextField, __assign({}, params, { size: "small", label: t("search"), InputProps: __assign({}, params.InputProps) }))); } }));
};
exports.default = ToolbarSearchBar;
//# sourceMappingURL=ToolbarSearchBar.js.map