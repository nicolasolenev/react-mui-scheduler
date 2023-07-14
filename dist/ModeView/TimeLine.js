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
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const dateFnsContext_1 = __importDefault(require("../locales/dateFnsContext"));
const Timeline_1 = __importDefault(require("@mui/lab/Timeline"));
const TimelineItem_1 = __importDefault(require("@mui/lab/TimelineItem"));
const TimelineOppositeContent_1 = __importDefault(require("@mui/lab/TimelineOppositeContent"));
const date_fns_1 = require("date-fns");
const TimelineSeparator_1 = __importDefault(require("@mui/lab/TimelineSeparator"));
const TimelineConnector_1 = __importDefault(require("@mui/lab/TimelineConnector"));
const TimelineDot_1 = __importDefault(require("@mui/lab/TimelineDot"));
const Schedule_1 = __importDefault(require("@mui/icons-material/Schedule"));
const TimelineContent_1 = __importDefault(require("@mui/lab/TimelineContent"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const StyledContainer = (0, styles_1.styled)(Box_1.default)(() => ({
    display: "flex",
    ["&::-webkit-scrollbar"]: {
        width: 7,
        height: 6,
    },
    ["&::-webkit-scrollbar-track"]: {
        WebkitBoxShadow: "inset 0 0 6px rgb(125, 161, 196, 0.5)",
    },
    ["&::-webkit-scrollbar-thumb"]: {
        WebkitBorderRadius: 4,
        borderRadius: 4,
        background: "rgba(0, 172, 193, .5)",
        WebkitBoxShadow: "inset 0 0 6px rgba(25, 118, 210, .5)",
    },
    ["&::-webkit-scrollbar-thumb:window-inactive"]: {
        background: "rgba(125, 161, 196, 0.5)",
    },
}));
const TimeLineModeView = ({ options, rows, searchResult, onTaskClick }) => {
    const dateFnsLocale = (0, react_1.useContext)(dateFnsContext_1.default);
    const renderEvent = (event, index) => (react_1.default.createElement(TimelineItem_1.default, { key: `timeline-item-${index}`, sx: { cursor: "pointer" }, onClick: e => handleTaskClick(e, event) },
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
    const handleTaskClick = (event, task) => {
        event.preventDefault();
        event.stopPropagation();
        onTaskClick && onTaskClick(event, task);
    };
    let filteredEvents = options.reverseTimelineOrder ?
        rows?.sort((a, b) => -b?.startDate?.toString()?.localeCompare(a?.startDate.toString())) :
        rows;
    if (searchResult)
        filteredEvents = filteredEvents?.filter((event) => event?.groupLabel === searchResult?.groupLabel);
    const groupLabels = [...new Set(filteredEvents?.map((event) => event.groupLabel))];
    return (react_1.default.createElement(StyledContainer, { component: "div", sx: {
            overflowY: "auto",
            minHeight: options.minHeight,
            maxHeight: options.maxHeight,
        } },
        options.displayTimelineByGroupLabel && groupLabels.map((label, index) => (react_1.default.createElement(Box_1.default, { display: "flex", alignItems: "center", flexDirection: "column", key: `timeline-${index}` },
            react_1.default.createElement(Typography_1.default, { fontWeight: 700 }, label),
            react_1.default.createElement(Timeline_1.default, { position: "alternate" }, filteredEvents?.filter((event) => label === event.groupLabel)?.map((event, index) => undefined !== event.startDate ? renderEvent(event, index) : react_1.default.createElement("div", { key: `timeline-item-${index}` })))))),
        !options.displayTimelineByGroupLabel && (react_1.default.createElement(Timeline_1.default, { position: "alternate" }, filteredEvents?.map((event, index) => undefined !== event.startDate ? renderEvent(event, index) : react_1.default.createElement("div", { key: `timeline-item-${index}` }))))));
};
exports.default = TimeLineModeView;
//# sourceMappingURL=TimeLine.js.map