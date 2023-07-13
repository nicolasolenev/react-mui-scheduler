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
var react_1 = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var dateFnsContext_1 = __importDefault(require("../locales/dateFnsContext"));
var Timeline_1 = __importDefault(require("@mui/lab/Timeline"));
var TimelineItem_1 = __importDefault(require("@mui/lab/TimelineItem"));
var TimelineOppositeContent_1 = __importDefault(require("@mui/lab/TimelineOppositeContent"));
var date_fns_1 = require("date-fns");
var TimelineSeparator_1 = __importDefault(require("@mui/lab/TimelineSeparator"));
var TimelineConnector_1 = __importDefault(require("@mui/lab/TimelineConnector"));
var TimelineDot_1 = __importDefault(require("@mui/lab/TimelineDot"));
var Schedule_1 = __importDefault(require("@mui/icons-material/Schedule"));
var TimelineContent_1 = __importDefault(require("@mui/lab/TimelineContent"));
var StyledContainer = (0, styles_1.styled)(Typography_1.default)(function () {
    var _a;
    return (_a = {},
        _a["&::-webkit-scrollbar"] = {
            width: 7,
            height: 6,
        },
        _a["&::-webkit-scrollbar-track"] = {
            WebkitBoxShadow: "inset 0 0 6px rgb(125, 161, 196, 0.5)",
        },
        _a["&::-webkit-scrollbar-thumb"] = {
            WebkitBorderRadius: 4,
            borderRadius: 4,
            background: "rgba(0, 172, 193, .5)",
            WebkitBoxShadow: "inset 0 0 6px rgba(25, 118, 210, .5)",
        },
        _a["&::-webkit-scrollbar-thumb:window-inactive"] = {
            background: "rgba(125, 161, 196, 0.5)",
        },
        _a);
});
var TimeLineModeView = function (_a) {
    var options = _a.options, rows = _a.rows, searchResult = _a.searchResult, onTaskClick = _a.onTaskClick;
    var dateFnsLocale = (0, react_1.useContext)(dateFnsContext_1.default);
    var handleTaskClick = function (event, task) {
        event.preventDefault();
        event.stopPropagation();
        onTaskClick && onTaskClick(event, task);
    };
    var filteredEvents = options.reverseTimelineOrder ? rows === null || rows === void 0 ? void 0 : rows.sort(function (a, b) { var _a, _b; return -((_b = (_a = b === null || b === void 0 ? void 0 : b.startDate) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.localeCompare(a === null || a === void 0 ? void 0 : a.startDate.toString())); }) : rows;
    if (searchResult) {
        filteredEvents = filteredEvents === null || filteredEvents === void 0 ? void 0 : filteredEvents.filter(function (event) { return (event === null || event === void 0 ? void 0 : event.groupLabel) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.groupLabel); });
    }
    return (react_1.default.createElement(StyledContainer, { component: "div", sx: {
            overflowY: "auto",
            minHeight: options.minHeight,
            maxHeight: options.maxHeight,
        } },
        react_1.default.createElement(Timeline_1.default, { position: "alternate" }, filteredEvents === null || filteredEvents === void 0 ? void 0 : filteredEvents.map(function (event, index) {
            console.log(event);
            if (undefined !== event.startDate)
                return (react_1.default.createElement(TimelineItem_1.default, { key: "timeline-".concat(index), sx: { cursor: "pointer" }, onClick: function (e) { return handleTaskClick(e, event); } },
                    react_1.default.createElement(TimelineOppositeContent_1.default, { sx: { m: "auto 0" }, align: "right", variant: "body2", color: "text.secondary" },
                        event.startDate && (0, date_fns_1.format)(event.startDate, "PPP", { locale: dateFnsLocale }),
                        react_1.default.createElement("br", null),
                        react_1.default.createElement(Typography_1.default, { variant: "caption" },
                            event.startDate && (0, date_fns_1.format)(event.startDate, "HH:mm"),
                            " - ",
                            (0, date_fns_1.format)(event.endDate, "HH:mm"))),
                    react_1.default.createElement(TimelineSeparator_1.default, null,
                        react_1.default.createElement(TimelineConnector_1.default, null),
                        react_1.default.createElement(TimelineDot_1.default, { color: "secondary", sx: { backgroundColor: event.color } }, event.icon || react_1.default.createElement(Schedule_1.default, null)),
                        react_1.default.createElement(TimelineConnector_1.default, null)),
                    react_1.default.createElement(TimelineContent_1.default, { sx: { py: "12px", px: 2 } },
                        react_1.default.createElement(Typography_1.default, { variant: "body1", component: "span" }, event.label),
                        react_1.default.createElement(Typography_1.default, null, event.groupLabel))));
            return react_1.default.createElement("div", null);
        }))));
};
exports.default = TimeLineModeView;
//# sourceMappingURL=TimeLine.js.map