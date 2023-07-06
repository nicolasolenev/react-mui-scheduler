import React, { FC } from "react";
import { Event, Option } from "../types";
interface DayModeViewProps {
    options: Option;
    columns?: any[];
    rows?: any[];
    date?: string;
    searchResult?: any;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: any, day?: any) => void;
    onEventsChange: (item: Event) => void;
}
declare const DayModeView: FC<DayModeViewProps>;
export default DayModeView;
