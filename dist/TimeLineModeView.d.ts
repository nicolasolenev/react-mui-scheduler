import React, { FC } from "react";
import { Event, Option } from "./types";
interface TimeLineModeViewProps {
    options: Option;
    rows: Event[];
    searchResult: Event | undefined;
    onTaskClick?: (event: React.MouseEvent<HTMLDivElement>, task: Event) => void;
}
declare const TimeLineModeView: FC<TimeLineModeViewProps>;
export default TimeLineModeView;
