import React, { FC } from "react";
import { AlertProps, Event, Mode, ToolbarProps as SchedulerToolbarProps } from "./types";
interface ToolbarProps {
    events: Event[];
    switchMode: Mode;
    alertProps?: AlertProps;
    toolbarProps: SchedulerToolbarProps;
    onModeChange: (mode: Mode) => void;
    onDateChange: (daysInMonth: number, selectedDate: Date) => void;
    onSearchResult: (searchResult: Event) => void;
    onAlertCloseButtonClicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
declare const Toolbar: FC<ToolbarProps>;
export default Toolbar;
