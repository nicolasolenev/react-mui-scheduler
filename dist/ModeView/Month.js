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
var date_fns_1 = require("date-fns");
var EventItem_1 = __importDefault(require("../EventItem"));
var TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
var Paper_1 = __importDefault(require("@mui/material/Paper"));
var Table_1 = __importDefault(require("@mui/material/Table"));
var TableHead_1 = __importDefault(require("@mui/material/TableHead"));
var TableBody_1 = __importDefault(require("@mui/material/TableBody"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var EventNoteRounded_1 = __importDefault(require("@mui/icons-material/EventNoteRounded"));
var StyledTableCell = (0, styles_1.styled)(material_1.TableCell)(function (_a) {
    var _b, _c, _d;
    var theme = _a.theme;
    return (_b = {},
        _b["&.".concat(material_1.tableCellClasses.head)] = (_c = {
                borderTop: "1px ".concat(theme.palette.divider, " solid !important"),
                borderBottom: "1px ".concat(theme.palette.divider, " solid !important"),
                borderLeft: "1px ".concat(theme.palette.divider, " solid !important")
            },
            _c["&:nth-of-type(1)"] = {
                borderLeft: "0px !important",
            },
            _c),
        _b["&.".concat(material_1.tableCellClasses.body)] = (_d = {
                fontSize: 12,
                height: 96,
                width: 64,
                maxWidth: 64,
                cursor: "pointer",
                verticalAlign: "top",
                borderLeft: "1px ".concat(theme.palette.divider, " solid")
            },
            _d["&:nth-of-type(7n+1)"] = {
                borderLeft: 0,
            },
            _d["&:nth-of-type(even)"] = {
            //backgroundColor: theme.palette.action.hover
            },
            _d),
        _b["&.".concat(material_1.tableCellClasses.body, ":hover")] = {
        //backgroundColor: "#eee"
        },
        _b);
});
var StyledTableRow = (0, styles_1.styled)(material_1.TableRow)(function () {
    var _a;
    return (_a = {},
        _a["&:last-child td, &:last-child th"] = {
            border: 0,
        },
        _a);
});
var MonthModeView = function (_a) {
    var _b = _a.rows, rows = _b === void 0 ? [] : _b, options = _a.options, _c = _a.columns, columns = _c === void 0 ? [] : _c, legacyStyle = _a.legacyStyle, searchResult = _a.searchResult, onTaskClick = _a.onTaskClick, onCellClick = _a.onCellClick, onEventsChange = _a.onEventsChange;
    var theme = (0, styles_1.useTheme)();
    var _d = (0, react_1.useState)({}), state = _d[0], setState = _d[1];
    var today = new Date();
    var currentDaySx = {
        width: 24,
        height: 22,
        margin: "auto",
        display: "block",
        paddingTop: "2px",
        borderRadius: "50%",
    };
    var onCellDragOver = function (e) {
        e.preventDefault();
    };
    var onCellDragStart = function (e, item, rowIndex) {
        setState(__assign(__assign({}, state), { itemTransfer: { item: item, rowIndex: rowIndex } }));
    };
    var onCellDragEnter = function (e, elementId, rowIndex) {
        e.preventDefault();
        setState(__assign(__assign({}, state), { transferTarget: { elementId: elementId, rowIndex: rowIndex } }));
    };
    var onCellDragEnd = function (e) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        e.preventDefault();
        if (!state.itemTransfer && !state.transferTarget)
            return;
        var transfer = state.itemTransfer;
        var transferTarget = state.transferTarget;
        var rowsCopy = Array.from(rows);
        var rowInd = rowsCopy.findIndex(function (d) { return d.id === (transferTarget === null || transferTarget === void 0 ? void 0 : transferTarget.rowIndex); });
        if (rowInd !== -1) {
            var dayInd = (_b = (_a = rowsCopy[rowInd]) === null || _a === void 0 ? void 0 : _a.days) === null || _b === void 0 ? void 0 : _b.findIndex(function (d) { return d.id === (transferTarget === null || transferTarget === void 0 ? void 0 : transferTarget.elementId); });
            if (dayInd !== -1) {
                var day = (_c = rowsCopy[rowInd]) === null || _c === void 0 ? void 0 : _c.days[dayInd];
                // Get day of the date (DD)
                if (!((_d = transfer === null || transfer === void 0 ? void 0 : transfer.item) === null || _d === void 0 ? void 0 : _d.day))
                    transfer.item.day = (_e = transfer === null || transfer === void 0 ? void 0 : transfer.item) === null || _e === void 0 ? void 0 : _e.date.getDay();
                if (((_f = transfer === null || transfer === void 0 ? void 0 : transfer.item) === null || _f === void 0 ? void 0 : _f.day) !== (day === null || day === void 0 ? void 0 : day.day)) {
                    var itemCheck = day.data.findIndex(function (item) { return (item.day === transfer.item.day && item.label === transfer.item.label); });
                    if (itemCheck === -1) {
                        var prevDayEvents = rowsCopy[transfer.rowIndex]
                            .days
                            .find(function (d) { return d.day === transfer.item.day; });
                        var itemIndexToRemove = (_g = prevDayEvents === null || prevDayEvents === void 0 ? void 0 : prevDayEvents.data) === null || _g === void 0 ? void 0 : _g.findIndex(function (i) { return i.id === transfer.item.id; });
                        if (itemIndexToRemove === undefined || itemIndexToRemove === -1) {
                            return;
                        }
                        (_h = prevDayEvents === null || prevDayEvents === void 0 ? void 0 : prevDayEvents.data) === null || _h === void 0 ? void 0 : _h.splice(itemIndexToRemove, 1);
                        transfer.item.day = day === null || day === void 0 ? void 0 : day.day;
                        transfer.item.date = day === null || day === void 0 ? void 0 : day.date;
                        day.data.push(transfer.item);
                        setState(__assign(__assign({}, state), { rows: rowsCopy, itemTransfer: null, transferTarget: null }));
                        onEventsChange && onEventsChange(transfer.item);
                    }
                }
            }
        }
    };
    var handleCellClick = function (event, row, day) {
        var _a;
        event.preventDefault();
        event.stopPropagation();
        if (((_a = day === null || day === void 0 ? void 0 : day.data) === null || _a === void 0 ? void 0 : _a.length) === 0 && onCellClick) {
            onCellClick(event, row, day);
        }
    };
    var renderTask = function (tasks, rowId) {
        if (tasks === void 0) { tasks = []; }
        return tasks === null || tasks === void 0 ? void 0 : tasks.map(function (task) {
            var condition = (searchResult ?
                ((task === null || task === void 0 ? void 0 : task.groupLabel) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.groupLabel) ||
                    (task === null || task === void 0 ? void 0 : task.user) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.user)) : !searchResult);
            return (condition &&
                react_1.default.createElement(EventItem_1.default, { isMonthMode: true, event: task, rowId: rowId, elevation: 0, boxSx: { px: 0.5 }, key: "item-d-".concat(task === null || task === void 0 ? void 0 : task.id, "-").concat(rowId), onClick: function (e) { return handleTaskClick(e, task); }, onDragStart: function (e) { return onCellDragStart(e, task, rowId); }, sx: {
                        width: "100%",
                        py: 0,
                        my: .3,
                        color: theme.palette.common.white,
                        backgroundColor: (task === null || task === void 0 ? void 0 : task.color) || theme.palette.primary.light,
                        textAlign: "left",
                    } }));
        });
    };
    var handleTaskClick = function (event, task) {
        event.preventDefault();
        event.stopPropagation();
        onTaskClick && onTaskClick(event, task);
    };
    return (react_1.default.createElement(TableContainer_1.default, { component: Paper_1.default, sx: { boxShadow: "none" } },
        react_1.default.createElement(Table_1.default, { size: "small", "aria-label": "simple table", stickyHeader: true, sx: { minWidth: options.minWidth || 650 } },
            legacyStyle && react_1.default.createElement(TableHead_1.default, { sx: { height: 24 } },
                react_1.default.createElement(StyledTableRow, null, columns === null || columns === void 0 ? void 0 : columns.map(function (column, index) { return (react_1.default.createElement(StyledTableCell, { align: "center", key: (column === null || column === void 0 ? void 0 : column.headerName) + "-" + index }, column === null || column === void 0 ? void 0 : column.headerName)); }))),
            react_1.default.createElement(TableBody_1.default, null, rows === null || rows === void 0 ? void 0 : rows.map(function (row, index) {
                var _a;
                return (react_1.default.createElement(StyledTableRow, { key: "row-".concat(row.id, "-").concat(index), sx: {
                        "&:last-child th": {
                            border: 0,
                            borderLeft: "1px ".concat(theme.palette.divider, " solid"),
                            "&:firs-child": {
                                borderLeft: 0,
                            },
                        },
                    } }, (_a = row === null || row === void 0 ? void 0 : row.days) === null || _a === void 0 ? void 0 : _a.map(function (day, indexD) {
                    var _a, _b, _c, _d;
                    var currentDay = (day.day === today.getUTCDate() && (0, date_fns_1.isSameMonth)(day.date, today));
                    return (react_1.default.createElement(StyledTableCell, { scope: "row", align: "center", component: "th", sx: { px: 0.5, position: "relative" }, key: "day-".concat(day.id), onDragEnd: onCellDragEnd, onDragOver: onCellDragOver, onDragEnter: function (e) { return onCellDragEnter(e, day.id, row.id); }, onClick: function (event) { return handleCellClick(event, row, day); } },
                        react_1.default.createElement(Box_1.default, { sx: { height: "100%", overflowY: "visible" } },
                            !legacyStyle &&
                                index === 0 && ((_b = (_a = columns[indexD]) === null || _a === void 0 ? void 0 : _a.headerName) === null || _b === void 0 ? void 0 : _b.toUpperCase()),
                            ".",
                            react_1.default.createElement(Typography_1.default, { variant: "body2", sx: __assign(__assign({}, currentDaySx), { background: (currentDay &&
                                        (0, styles_1.alpha)(theme.palette.primary.main, 1)), color: (currentDay && theme.palette.common.white) }) }, day.day),
                            (((_c = day === null || day === void 0 ? void 0 : day.data) === null || _c === void 0 ? void 0 : _c.length) > 0 && renderTask(day === null || day === void 0 ? void 0 : day.data, row.id)),
                            legacyStyle && ((_d = day === null || day === void 0 ? void 0 : day.data) === null || _d === void 0 ? void 0 : _d.length) === 0 &&
                                react_1.default.createElement(EventNoteRounded_1.default, { fontSize: "small", htmlColor: theme.palette.mode === "light" ? theme.palette.divider : (0, styles_1.lighten)(theme.palette.common.white, .5) }))));
                })));
            })))));
};
exports.default = MonthModeView;
//# sourceMappingURL=Month.js.map