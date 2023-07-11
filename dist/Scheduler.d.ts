import React, { FC } from "react";
import { AlertProps, Day, Event, Option, Row, ToolbarProps } from "./types";
interface SchedulerProps {
    events: Event[];
    locale?: string;
    options?: Option;
    alertProps?: AlertProps;
    legacyStyle?: boolean;
    toolbarProps?: ToolbarProps;
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: Row, day?: Day) => void;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
    onEventsChange?: (item: Event) => void;
    onAlertCloseButtonClicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onDateChange?: (day: number, date: number | Date | null) => void;
}
declare const Scheduler: FC<SchedulerProps>;
export default Scheduler;
