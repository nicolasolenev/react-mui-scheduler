import { AlertColor } from "@mui/material/Alert/Alert";
import React from "react";
export declare enum TransitionMode {
    FADE = "fade",
    SLIDE = "slide",
    ZOOM = "zoom"
}
export declare enum Mode {
    DAY = "day",
    MONTH = "month",
    TIMELINE = "timeline",
    WEEK = "week"
}
export declare enum StartWeek {
    MON = "mon",
    SUN = "sun"
}
export declare enum DateView {
    YEAR = "year",
    MONTH = "month",
    DAY = "day"
}
export interface Event {
    id: number | string;
    label: string;
    groupLabel: string;
    startDate: Date;
    endDate: Date;
    color?: string;
    user?: string;
    icon?: string | React.JSX.Element;
    [key: string]: any;
}
export interface Option {
    transitionMode?: TransitionMode;
    startWeekOn?: StartWeek;
    defaultMode?: Mode;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    reverseTimelineOrder?: boolean;
    displayTimelineByGroupLabel?: boolean;
}
export interface AlertProps {
    open: boolean;
    color: AlertColor;
    severity: AlertColor;
    message: string;
    showActionButton: boolean;
    showNotification: boolean;
    delay: number;
}
export interface OptionMenu {
    label: string;
    icon: string | React.JSX.Element;
}
export interface ToolbarProps {
    showSearchBar?: boolean;
    showSwitchModeButtons?: {
        showMonthButton: boolean;
        showWeekButton: boolean;
        showDayButton: boolean;
        showTimelineButton: boolean;
    };
    showDatePicker?: boolean;
    showOptions?: boolean;
    optionMenus?: OptionMenu[];
    showTodayAction?: boolean;
}
export interface Row {
    id: number | string;
    label?: string;
    days: Day[];
    data?: Event[];
    rowIndex?: number;
}
export interface Day {
    id: number | string;
    date: Date;
    events: Event[];
    day?: number | string;
    dayIndex?: number;
}
export interface ModeState {
    columns?: ColumnHeader[];
    rows?: RowHeader[] | Row[] | Event[];
    itemTransfer?: ItemTransfer | null;
    transferTarget?: TransferTarget | null;
}
export interface ColumnHeader {
    id?: string;
    flex?: number;
    sortable?: boolean;
    editable?: boolean;
    align?: string;
    headerName?: string;
    headerAlign?: string;
    field?: string;
    headerClassName?: string;
    date?: number | Date;
    month?: string;
    weekDay?: string;
    day?: string;
}
export interface RowHeader {
    id: number;
    days: Day[];
}
export interface ItemTransfer {
    item: Event;
    rowLabel?: string;
    rowIndex?: number;
    dayIndex?: number;
}
export interface TransferTarget {
    rowLabel?: string;
    rowIndex?: number;
    dayIndex?: number;
    elementId?: number;
}
