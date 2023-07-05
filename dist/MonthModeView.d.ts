import React, { FC } from "react";
import { Event, Option } from "./types";
interface MonthModeViewProps {
    rows: any[];
    options: Option;
    columns: any[];
    legacyStyle?: boolean;
    searchResult: any;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: any, day: any) => void;
    onEventsChange: (item: Event) => void;
}
declare const MonthModeView: FC<MonthModeViewProps>;
export default MonthModeView;
