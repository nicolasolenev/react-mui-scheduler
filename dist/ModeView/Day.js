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
const system_1 = require("@mui/system");
const TableCell_1 = __importStar(require("@mui/material/TableCell"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
const styles_1 = require("@mui/material/styles");
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Table_1 = __importDefault(require("@mui/material/Table"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const date_fns_1 = require("date-fns");
const EventItem_1 = __importDefault(require("../EventItem"));
const react_i18next_1 = require("react-i18next");
const Box_1 = __importDefault(require("@mui/material/Box"));
const StyledTableCell = (0, system_1.styled)(TableCell_1.default)(() => ({
    [`&.${TableCell_1.tableCellClasses.head}`]: {
        paddingLeft: 4,
        paddingRight: 4,
        borderTop: `1px solid #ccc !important`,
        borderBottom: `1px solid #ccc !important`,
        borderLeft: `1px solid #ccc !important`,
        ["&:nth-of-type(1)"]: {
            borderLeft: `0px !important`,
        },
    },
    [`&.${TableCell_1.tableCellClasses.body}`]: {
        fontSize: 12,
        height: 16,
        width: 128,
        maxWidth: 128,
        cursor: "pointer",
        borderLeft: `1px solid #ccc`,
        ["&:nth-of-type(1)"]: { borderLeft: 0 },
    },
    [`&.${TableCell_1.tableCellClasses.body}:hover`]: {
        backgroundColor: "#eee",
    },
}));
const StyledTableContainer = (0, system_1.styled)(TableContainer_1.default)(() => ({
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
const DayModeView = ({ options, columns, rows, searchResult, onTaskClick, onCellClick, onEventsChange, }) => {
    const theme = (0, styles_1.useTheme)();
    const [state, setState] = (0, react_1.useState)({ columns, rows });
    const { t } = (0, react_i18next_1.useTranslation)(["common"]);
    const onCellDragOver = (e) => {
        e.preventDefault();
    };
    const onCellDragStart = (e, item, rowLabel, rowIndex, dayIndex) => {
        setState({
            ...state,
            itemTransfer: { item, rowLabel, rowIndex, dayIndex },
        });
    };
    const onCellDragEnter = (e, rowLabel, rowIndex, dayIndex) => {
        e.preventDefault();
        setState({ ...state, transferTarget: { rowLabel, rowIndex, dayIndex } });
    };
    const onCellDragEnd = (e) => {
        e.preventDefault();
        if (!state?.itemTransfer || !state?.transferTarget)
            return;
        const transfer = state?.itemTransfer;
        const transferTarget = state?.transferTarget;
        const rowsData = Array.from(rows);
        const day = rowsData[transferTarget?.rowIndex]?.days[transferTarget?.dayIndex];
        if (day) {
            const hourRegExp = /[0-9]{2}:[0-9]{2}/;
            const foundEventIndex = day.events.findIndex((e) => e.id === transfer.item.id &&
                e.startDate === transfer.item.startDate &&
                e.endDate === transfer.item.endDate);
            // Task already exists in the events array of the chosen cell
            if (foundEventIndex !== -1) {
                return;
            }
            // Event cell item to transfer
            const prevEventCell = rowsData[transfer.rowIndex].days[transfer.dayIndex];
            // Timeline label (00:00 am, 01:00 am, etc.)
            const label = transferTarget.rowLabel?.toUpperCase();
            const hourLabel = hourRegExp.exec(label)?.[0];
            // Event's end hour
            const endHourDate = transfer.item.endDate;
            // Event start hour
            const startHourDate = transfer.item.startDate;
            // Minutes difference between end and start event hours
            const minutesDiff = (0, date_fns_1.differenceInMinutes)(endHourDate, startHourDate);
            // New event end hour according to it new cell
            const newEndHour = (0, date_fns_1.add)((0, date_fns_1.parse)(hourLabel, "HH:mm", day.date), { minutes: minutesDiff });
            prevEventCell?.events?.splice(transfer.item?.itemIndex, 1);
            transfer.item.startDate = day.date;
            day.events.push(transfer.item);
            setState({ ...state, rows: rowsData });
            onEventsChange && onEventsChange(transfer.item);
        }
    };
    const handleCellClick = (event, row, day) => {
        event.preventDefault();
        event.stopPropagation();
        onCellClick && onCellClick(event, row, day);
    };
    const renderEvents = (events, rowLabel, rowIndex, dayIndex) => (react_1.default.createElement(Box_1.default, { display: "flex" }, events?.map((event, itemIndex) => searchResult
        ? event?.groupLabel === searchResult?.groupLabel ||
            event?.user === searchResult?.user
        : !searchResult && (react_1.default.createElement(EventItem_1.default, { rowId: itemIndex, event: event, elevation: 0, boxSx: { px: 0.3 }, onClick: (e) => handleTaskClick(e, event), key: `iti18nem_id-${itemIndex}_r-${rowIndex}_d-${dayIndex}`, onDragStart: (e) => onCellDragStart(e, { ...event, itemIndex }, rowLabel, rowIndex, dayIndex), sx: {
                py: 0,
                mb: 0.5,
                color: theme.palette.common.white,
                backgroundColor: event?.color || theme.palette.primary.light,
            } })))));
    const handleTaskClick = (event, task) => {
        event.preventDefault();
        event.stopPropagation();
        onTaskClick && onTaskClick(event, task);
    };
    return (react_1.default.createElement(StyledTableContainer, { component: Paper_1.default, sx: { maxHeight: options.maxHeight } },
        react_1.default.createElement(Table_1.default, { size: "small", "aria-label": "simple table", stickyHeader: true, sx: { minWidth: options.minWidth } },
            react_1.default.createElement(TableHead_1.default, { sx: { height: 24 } },
                react_1.default.createElement(TableRow_1.default, null,
                    react_1.default.createElement(StyledTableCell, { align: "left" }),
                    columns?.map((column, index) => (react_1.default.createElement(StyledTableCell, { align: "center", colSpan: 2, key: `weekday-${column?.day}-${index}` },
                        column?.weekDay,
                        " ",
                        column?.month,
                        "/",
                        column?.day))))),
            react_1.default.createElement(TableBody_1.default, null, rows?.map((row, rowIndex) => (react_1.default.createElement(TableRow_1.default, { key: `timeline-${rowIndex}` },
                react_1.default.createElement(Tooltip_1.default, { placement: "right", title: t("eventDayTimelineCount", {
                        count: row.days?.reduce((prev, curr) => prev + curr?.events?.length, 0),
                    }) },
                    react_1.default.createElement(StyledTableCell, { scope: "row", align: "center", component: "th", sx: { px: 1 }, onClick: (event) => handleCellClick(event, row) },
                        react_1.default.createElement(Typography_1.default, { variant: "body2" }, row?.label),
                        Number(row?.data?.length) > 0 &&
                            renderEvents(row?.data, row.id))),
                row?.days?.map((day, dayIndex) => (react_1.default.createElement(StyledTableCell, { key: day?.id, scope: "row", component: "th", colSpan: 2, sx: { px: 0.3, py: 0.5 }, onDragEnd: onCellDragEnd, onDragOver: onCellDragOver, onDragEnter: (e) => onCellDragEnter(e, row?.label, rowIndex, dayIndex), onClick: (event) => handleCellClick(event, { rowIndex, ...row }, { dayIndex, ...day }) }, day?.events?.length > 0 &&
                    renderEvents(day?.events, row?.label, rowIndex, dayIndex)))))))))));
};
exports.default = DayModeView;
//# sourceMappingURL=Day.js.map