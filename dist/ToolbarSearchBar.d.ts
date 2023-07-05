import { FC } from "react";
interface ToolbarSearchBarProps {
    events: any[];
    onInputChange: (value: string) => void;
}
declare const ToolbarSearchBar: FC<ToolbarSearchBarProps>;
export default ToolbarSearchBar;
