import React, { FC } from "react";
import { ColumnHeader, Day, Event, Option, Row } from "../types";
interface WeekModeViewProps {
    options: Option;
    columns: ColumnHeader[] | undefined;
    rows: Row[] | undefined;
    searchResult: Event;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement>, row: Row, day?: Day) => void;
    onEventsChange: (item: Event) => void;
}
declare const WeekModeView: FC<WeekModeViewProps>;
export default WeekModeView;
