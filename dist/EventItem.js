"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Paper_1 = __importDefault(require("@mui/material/Paper"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var date_fns_1 = require("date-fns");
var EventItem = function (_a) {
    var event = _a.event, rowId = _a.rowId, sx = _a.sx, boxSx = _a.boxSx, elevation = _a.elevation, isMonthMode = _a.isMonthMode, onClick = _a.onClick, onDragStart = _a.onDragStart;
    return (react_1.default.createElement(Paper_1.default, { sx: sx, draggable: true, onClick: onClick, onDragStart: onDragStart, elevation: elevation || 0, key: "item-d-".concat(event === null || event === void 0 ? void 0 : event.id, "-").concat(rowId) },
        react_1.default.createElement(Box_1.default, { sx: boxSx },
            isMonthMode &&
                react_1.default.createElement(Typography_1.default, { variant: "caption", sx: { fontSize: 8 } },
                    (0, date_fns_1.format)(event === null || event === void 0 ? void 0 : event.startDate, "HH:mm"),
                    " - ",
                    (0, date_fns_1.format)(event === null || event === void 0 ? void 0 : event.endDate, "HH:mm")),
            react_1.default.createElement(Typography_1.default, { variant: "body2", sx: { fontSize: 11 } }, event === null || event === void 0 ? void 0 : event.label))));
};
exports.default = EventItem;
//# sourceMappingURL=EventItem.js.map