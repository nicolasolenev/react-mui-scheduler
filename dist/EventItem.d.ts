import React, { FC } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Event } from "./types";
interface EventItemProps {
    event: Event;
    rowId: string | number;
    sx?: SxProps<Theme>;
    boxSx?: SxProps;
    elevation?: number;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
}
declare const EventItem: FC<EventItemProps>;
export default EventItem;
