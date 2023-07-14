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
const Autocomplete_1 = __importDefault(require("@mui/material/Autocomplete"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const react_i18next_1 = require("react-i18next");
const date_fns_1 = require("date-fns");
const dateFnsContext_1 = __importDefault(require("./locales/dateFnsContext"));
const StyledAutoComplete = (0, styles_1.styled)((Autocomplete_1.default))(({ theme }) => ({
    color: "inherit",
    width: "94%",
    display: "inline-flex",
    margin: theme.spacing(0.5, 1.5),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
        width: "100%",
    },
    [theme.breakpoints.up("md")]: {
        width: "27ch",
    },
    [theme.breakpoints.up("lg")]: {
        width: "27ch",
    },
}));
const ToolbarSearchBar = ({ events, onInputChange, }) => {
    const { t } = (0, react_i18next_1.useTranslation)(["common"]);
    const [value, setValue] = (0, react_1.useState)();
    const [inputValue, setInputValue] = (0, react_1.useState)("");
    const dateFnsLocale = (0, react_1.useContext)(dateFnsContext_1.default);
    const handleOnChange = (event, value) => {
        setValue(value);
        if (onInputChange)
            onInputChange(`${value?.groupLabel || ""} | (${(0, date_fns_1.format)(value?.startDate, "HH:mm")} - ${value?.endDate || ""})`);
    };
    return (react_1.default.createElement(StyledAutoComplete, { value: value, id: "scheduler-autocomplete", inputValue: inputValue, sx: { mb: 0, display: "inline-flex" }, onChange: handleOnChange, options: events, groupBy: (option) => (option ? option?.groupLabel : ""), getOptionLabel: (option) => option
            ? `${option.groupLabel || ""} | ${option.startDate} | (${(0, date_fns_1.format)(option.startDate, "HH:mm") || ""} - ${(0, date_fns_1.format)(option.endDate, "HH:mm") || ""})`
            : "", isOptionEqualToValue: (option, value) => option.id === value.id, onInputChange: (event, newInputValue) => {
            setInputValue(newInputValue);
            onInputChange(newInputValue);
        }, renderOption: (props, option) => (react_1.default.createElement(Box_1.default, { component: "li", sx: { fontSize: 12 }, ...props }, `${(0, date_fns_1.format)(option?.startDate, "dd-MMMM-yyyy", {
            locale: dateFnsLocale,
        })} (${(0, date_fns_1.format)(option?.startDate, "HH:mm") || ""} - ${(0, date_fns_1.format)(option?.endDate, "HH:mm") || ""})`)), renderInput: (params) => (react_1.default.createElement(TextField_1.default, { ...params, size: "small", label: t("search"), InputProps: { ...params.InputProps } })) }));
};
exports.default = ToolbarSearchBar;
//# sourceMappingURL=ToolbarSearchBar.js.map