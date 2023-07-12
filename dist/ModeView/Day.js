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
var system_1 = require("@mui/system");
var TableCell_1 = __importStar(require("@mui/material/TableCell"));
var TableRow_1 = __importDefault(require("@mui/material/TableRow"));
var TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
var styles_1 = require("@mui/material/styles");
var Paper_1 = __importDefault(require("@mui/material/Paper"));
var Table_1 = __importDefault(require("@mui/material/Table"));
var TableHead_1 = __importDefault(require("@mui/material/TableHead"));
var TableBody_1 = __importDefault(require("@mui/material/TableBody"));
var Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var date_fns_1 = require("date-fns");
var EventItem_1 = __importDefault(require("../EventItem"));
var react_i18next_1 = require("react-i18next");
var StyledTableCell = (0, system_1.styled)(TableCell_1.default)(function () {
    var _a, _b, _c;
    return (_a = {},
        _a["&.".concat(TableCell_1.tableCellClasses.head)] = (_b = {
                paddingLeft: 4,
                paddingRight: 4,
                borderTop: "1px solid #ccc !important",
                borderBottom: "1px solid #ccc !important",
                borderLeft: "1px solid #ccc !important"
            },
            _b["&:nth-of-type(1)"] = {
                borderLeft: "0px !important",
            },
            _b),
        _a["&.".concat(TableCell_1.tableCellClasses.body)] = (_c = {
                fontSize: 12,
                height: 16,
                width: 128,
                maxWidth: 128,
                cursor: "pointer",
                borderLeft: "1px solid #ccc"
            },
            _c["&:nth-of-type(1)"] = { borderLeft: 0 },
            _c),
        _a["&.".concat(TableCell_1.tableCellClasses.body, ":hover")] = {
            backgroundColor: "#eee",
        },
        _a);
});
var StyledTableContainer = (0, system_1.styled)(TableContainer_1.default)(function () {
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
var DayModeView = function (_a) {
    var options = _a.options, columns = _a.columns, rows = _a.rows, searchResult = _a.searchResult, onTaskClick = _a.onTaskClick, onCellClick = _a.onCellClick, onEventsChange = _a.onEventsChange;
    var theme = (0, styles_1.useTheme)();
    var _b = (0, react_1.useState)({ columns: columns, rows: rows }), state = _b[0], setState = _b[1];
    var t = (0, react_i18next_1.useTranslation)(["common"]).t;
    var onCellDragOver = function (e) {
        e.preventDefault();
    };
    var onCellDragStart = function (e, item, rowLabel, rowIndex, dayIndex) {
        setState(__assign(__assign({}, state), { itemTransfer: { item: item, rowLabel: rowLabel, rowIndex: rowIndex, dayIndex: dayIndex } }));
    };
    var onCellDragEnter = function (e, rowLabel, rowIndex, dayIndex) {
        e.preventDefault();
        setState(__assign(__assign({}, state), { transferTarget: { rowLabel: rowLabel, rowIndex: rowIndex, dayIndex: dayIndex } }));
    };
    var onCellDragEnd = function (e) {
        var _a, _b, _c, _d, _e;
        e.preventDefault();
        if (!(state === null || state === void 0 ? void 0 : state.itemTransfer) || !(state === null || state === void 0 ? void 0 : state.transferTarget))
            return;
        var transfer = state === null || state === void 0 ? void 0 : state.itemTransfer;
        var transferTarget = state === null || state === void 0 ? void 0 : state.transferTarget;
        var rowsData = Array.from(rows);
        var day = (_a = rowsData[transferTarget === null || transferTarget === void 0 ? void 0 : transferTarget.rowIndex]) === null || _a === void 0 ? void 0 : _a.days[transferTarget === null || transferTarget === void 0 ? void 0 : transferTarget.dayIndex];
        if (day) {
            var hourRegExp = /[0-9]{2}:[0-9]{2}/;
            var foundEventIndex = day.data.findIndex(function (e) {
                return e.id === transfer.item.id &&
                    e.startHour === transfer.item.startHour &&
                    e.endHour === transfer.item.endHour;
            });
            // Task already exists in the data array of the chosen cell
            if (foundEventIndex !== -1) {
                return;
            }
            // Event cell item to transfer
            var prevEventCell = rowsData[transfer.rowIndex].days[transfer.dayIndex];
            // Timeline label (00:00 am, 01:00 am, etc.)
            var label = (_b = transferTarget.rowLabel) === null || _b === void 0 ? void 0 : _b.toUpperCase();
            var hourLabel = (_c = hourRegExp.exec(label)) === null || _c === void 0 ? void 0 : _c[0];
            // Event's end hour
            var endHourDate = (0, date_fns_1.parse)(transfer.item.endHour, "HH:mm", day.date);
            // Event start hour
            var startHourDate = (0, date_fns_1.parse)(transfer.item.startHour, "HH:mm", day.date);
            // Minutes difference between end and start event hours
            var minutesDiff = (0, date_fns_1.differenceInMinutes)(endHourDate, startHourDate);
            // New event end hour according to it new cell
            var newEndHour = (0, date_fns_1.add)((0, date_fns_1.parse)(hourLabel, "HH:mm", day.date), { minutes: minutesDiff });
            if (!(0, date_fns_1.isValid)(startHourDate)) {
                startHourDate = day.date;
                minutesDiff = (0, date_fns_1.differenceInMinutes)(endHourDate, startHourDate);
                newEndHour = (0, date_fns_1.add)((0, date_fns_1.parse)(hourLabel, "HH:mm", day.date), { minutes: minutesDiff });
            }
            (_d = prevEventCell === null || prevEventCell === void 0 ? void 0 : prevEventCell.data) === null || _d === void 0 ? void 0 : _d.splice((_e = transfer.item) === null || _e === void 0 ? void 0 : _e.itemIndex, 1);
            transfer.item.startHour = label;
            transfer.item.endHour = (0, date_fns_1.format)(newEndHour, "HH:mm aaa");
            transfer.item.date = day.date;
            day.data.push(transfer.item);
            setState(__assign(__assign({}, state), { rows: rowsData }));
            onEventsChange && onEventsChange(transfer.item);
        }
    };
    var handleCellClick = function (event, row, day) {
        event.preventDefault();
        event.stopPropagation();
        onCellClick && onCellClick(event, row, day);
    };
    var renderTask = function (tasks, rowLabel, rowIndex, dayIndex) {
        return tasks === null || tasks === void 0 ? void 0 : tasks.map(function (task, itemIndex) {
            var condition = (searchResult ?
                ((task === null || task === void 0 ? void 0 : task.groupLabel) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.groupLabel) ||
                    (task === null || task === void 0 ? void 0 : task.user) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.user)) : !searchResult);
            return (condition &&
                react_1.default.createElement(EventItem_1.default, { rowId: itemIndex, event: task, elevation: 0, boxSx: { px: 0.3 }, onClick: function (e) { return handleTaskClick(e, task); }, key: "iti18nem_id-".concat(itemIndex, "_r-").concat(rowIndex, "_d-").concat(dayIndex), onDragStart: function (e) { return onCellDragStart(e, __assign(__assign({}, task), { itemIndex: itemIndex }), rowLabel, rowIndex, dayIndex); }, sx: {
                        py: 0, mb: .5, color: theme.palette.common.white,
                        backgroundColor: (task === null || task === void 0 ? void 0 : task.color) || theme.palette.primary.light,
                    } }));
        });
    };
    var handleTaskClick = function (event, task) {
        event.preventDefault();
        event.stopPropagation();
        onTaskClick && onTaskClick(event, task);
    };
    return (react_1.default.createElement(StyledTableContainer, { component: Paper_1.default, sx: { maxHeight: options.maxHeight } },
        react_1.default.createElement(Table_1.default, { size: "small", "aria-label": "simple table", stickyHeader: true, sx: { minWidth: options.minWidth } },
            react_1.default.createElement(TableHead_1.default, { sx: { height: 24 } },
                react_1.default.createElement(TableRow_1.default, null,
                    react_1.default.createElement(StyledTableCell, { align: "left" }), columns === null || columns === void 0 ? void 0 :
                    columns.map(function (column, index) { return (react_1.default.createElement(StyledTableCell, { align: "center", colSpan: 2, key: "weekday-".concat(column === null || column === void 0 ? void 0 : column.day, "-").concat(index) }, column === null || column === void 0 ? void 0 :
                        column.weekDay,
                        " ", column === null || column === void 0 ? void 0 :
                        column.month,
                        "/", column === null || column === void 0 ? void 0 :
                        column.day)); }))),
            react_1.default.createElement(TableBody_1.default, null, rows === null || rows === void 0 ? void 0 : rows.map(function (row, rowIndex) {
                var _a, _b, _c;
                return (react_1.default.createElement(TableRow_1.default, { key: "timeline-".concat(rowIndex) },
                    react_1.default.createElement(Tooltip_1.default, { placement: "right", title: t("eventDayTimelineCount", { count: (_a = row.days) === null || _a === void 0 ? void 0 : _a.reduce(function (prev, curr) { var _a; return prev + ((_a = curr === null || curr === void 0 ? void 0 : curr.data) === null || _a === void 0 ? void 0 : _a.length); }, 0) }) },
                        react_1.default.createElement(StyledTableCell, { scope: "row", align: "center", component: "th", sx: { px: 1 }, onClick: function (event) { return handleCellClick(event, row); } },
                            react_1.default.createElement(Typography_1.default, { variant: "body2" }, row === null || row === void 0 ? void 0 : row.label),
                            Number((_b = row === null || row === void 0 ? void 0 : row.data) === null || _b === void 0 ? void 0 : _b.length) > 0 && renderTask(row === null || row === void 0 ? void 0 : row.data, row.id))), (_c = row === null || row === void 0 ? void 0 : row.days) === null || _c === void 0 ? void 0 :
                    _c.map(function (day, dayIndex) {
                        var _a;
                        return (react_1.default.createElement(StyledTableCell, { key: day === null || day === void 0 ? void 0 : day.id, scope: "row", align: "center", component: "th", colSpan: 2, sx: { px: .3, py: .5 }, onDragEnd: onCellDragEnd, onDragOver: onCellDragOver, onDragEnter: function (e) { return onCellDragEnter(e, row === null || row === void 0 ? void 0 : row.label, rowIndex, dayIndex); }, onClick: function (event) { return handleCellClick(event, __assign({ rowIndex: rowIndex }, row), __assign({ dayIndex: dayIndex }, day)); } }, ((_a = day === null || day === void 0 ? void 0 : day.data) === null || _a === void 0 ? void 0 : _a.length) > 0 && renderTask(day === null || day === void 0 ? void 0 : day.data, row === null || row === void 0 ? void 0 : row.label, rowIndex, dayIndex)));
                    })));
            })))));
};
exports.default = DayModeView;
//# sourceMappingURL=Day.js.map