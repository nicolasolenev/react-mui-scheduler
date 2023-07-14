"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const date_fns_1 = require("date-fns");
const EventItem = ({ event, rowId, sx, boxSx, elevation, onClick, onDragStart, }) => (react_1.default.createElement(Paper_1.default, { sx: sx, draggable: true, onClick: onClick, onDragStart: onDragStart, elevation: elevation || 0, key: `item-d-${event?.id}-${rowId}` },
    react_1.default.createElement(Box_1.default, { sx: boxSx },
        react_1.default.createElement(Typography_1.default, { variant: "body2", sx: { fontSize: 11 } }, event?.label),
        react_1.default.createElement(Typography_1.default, { variant: "caption", sx: { fontSize: 8 } },
            (0, date_fns_1.format)(event?.startDate, "HH:mm"),
            " - ",
            (0, date_fns_1.format)(event?.endDate, "HH:mm")))));
exports.default = EventItem;
//# sourceMappingURL=EventItem.js.map