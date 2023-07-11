import React, { FC } from "react";
import { ColumnHeader, Day, Event, Option, Row } from "../types";
interface DayModeViewProps {
    options: Option;
    columns?: ColumnHeader[];
    rows?: Row[];
    date?: string;
    searchResult?: Event;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: Row, day?: Day) => void;
    onEventsChange: (item: Event) => void;
}
declare const DayModeView: FC<DayModeViewProps>;
export default DayModeView;
