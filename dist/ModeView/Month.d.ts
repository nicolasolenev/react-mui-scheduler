import React, { FC } from "react";
import { ColumnHeader, Day, Event, Option, RowHeader } from "../types";
interface MonthModeViewProps {
    rows: RowHeader[] | undefined;
    options: Option;
    columns: ColumnHeader[] | undefined;
    legacyStyle?: boolean;
    searchResult: Event | undefined;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: RowHeader, day: Day) => void;
    onEventsChange: (item: Event) => void;
}
declare const MonthModeView: FC<MonthModeViewProps>;
export default MonthModeView;
