import React, { FC } from "react";
import { Event, Option } from "../types";
interface WeekModeViewProps {
    options: Option;
    columns: any[];
    rows: any[];
    searchResult: any;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement>, row: any, day: any) => void;
    onEventsChange: (item: Event) => void;
}
declare const WeekModeView: FC<WeekModeViewProps>;
export default WeekModeView;
