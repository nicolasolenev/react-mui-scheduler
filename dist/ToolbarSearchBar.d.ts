import { FC } from "react";
import { Event } from "./types";
interface ToolbarSearchBarProps {
    events: Event[];
    onInputChange: (value: string) => void;
}
declare const ToolbarSearchBar: FC<ToolbarSearchBarProps>;
export default ToolbarSearchBar;
