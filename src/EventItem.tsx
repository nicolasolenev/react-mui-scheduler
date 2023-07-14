import React, { FC, JSX } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Event } from "./types";
import { format } from "date-fns";

interface EventItemProps {
  event: Event;
  rowId: string | number;
  sx?: SxProps<Theme>;
  boxSx?: SxProps;
  elevation?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
}

const EventItem: FC<EventItemProps> = ({
  event,
  rowId,
  sx,
  boxSx,
  elevation,
  onClick,
  onDragStart,
}): JSX.Element => (
  <Paper
    sx={sx}
    draggable
    onClick={onClick}
    onDragStart={onDragStart}
    elevation={elevation || 0}
    key={`item-d-${event?.id}-${rowId}`}
  >
    <Box sx={boxSx}>
      <Typography variant="body2" sx={{ fontSize: 11 }}>
        {event?.label}
      </Typography>
      <Typography variant="caption" sx={{ fontSize: 8 }}>
        {format(event?.startDate, "HH:mm")} - {format(event?.endDate, "HH:mm")}
      </Typography>
    </Box>
  </Paper>
);

export default EventItem;
