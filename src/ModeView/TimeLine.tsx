import React, { FC, JSX, useContext } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DateFnsLocaleContext from "../locales/dateFnsContext";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { format } from "date-fns";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TimelineContent from "@mui/lab/TimelineContent";
import { Event, Option } from "../types";

const StyledContainer = styled(Typography)(() => ({
  ["&::-webkit-scrollbar"]: {
    width: 7,
    height: 6,
  },
  ["&::-webkit-scrollbar-track"]: {
    WebkitBoxShadow: "inset 0 0 6px rgb(125, 161, 196, 0.5)",
  },
  ["&::-webkit-scrollbar-thumb"]: {
    WebkitBorderRadius: 4,
    borderRadius: 4,
    background: "rgba(0, 172, 193, .5)",
    WebkitBoxShadow: "inset 0 0 6px rgba(25, 118, 210, .5)",
  },
  ["&::-webkit-scrollbar-thumb:window-inactive"]: {
    background: "rgba(125, 161, 196, 0.5)",
  },
})) as typeof Typography;

interface TimeLineModeViewProps {
  options: Option;
  rows: Event[] | undefined;
  searchResult: Event | undefined;
  onTaskClick?: (event: React.MouseEvent<HTMLDivElement>, task: Event) => void;
}

const TimeLineModeView: FC<TimeLineModeViewProps> = ({ options, rows, searchResult, onTaskClick }): JSX.Element => {
  const dateFnsLocale = useContext(DateFnsLocaleContext);

  const handleTaskClick = (event: React.MouseEvent<HTMLDivElement>, task: Event) => {
    event.preventDefault();
    event.stopPropagation();
    onTaskClick && onTaskClick(event, task);
  };

  let filteredEvents = options.reverseTimelineOrder ? rows?.sort((a, b) => -b?.startHour?.localeCompare(a?.startHour)) : rows;
  if (searchResult) {
    filteredEvents = filteredEvents?.filter(
      event => event?.groupLabel === searchResult?.groupLabel,
    );
  }

  return (
    <StyledContainer
      component="div"
      sx={ {
        overflowY: "auto",
        minHeight: options.minHeight,
        maxHeight: options.maxHeight,
      } }
    >
      <Timeline position="alternate">
        { filteredEvents?.map((task, index) => {
          return (
            <TimelineItem
              key={ `timeline-${ index }` }
              sx={ { cursor: "pointer" } }
              onClick={ event => handleTaskClick(event, task) }
            >
              <TimelineOppositeContent
                sx={ { m: "auto 0" } }
                align="right"
                variant="body2"
                color="text.secondary"
              >
                { task?.date && format(task?.date, "PPP", { locale: dateFnsLocale }) }
                <br/>
                <Typography variant="caption">
                  { task?.startHour } - { task?.endHour }
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector/>
                <TimelineDot color="secondary" sx={ { backgroundColor: task?.color } }>
                  { task?.icon || <ScheduleIcon/> }
                </TimelineDot>
                <TimelineConnector/>
              </TimelineSeparator>
              <TimelineContent sx={ { py: "12px", px: 2 } }>
                <Typography variant="body1" component="span">
                  { task?.label }
                </Typography>
                <Typography>{ task?.groupLabel }</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        }) }
      </Timeline>
    </StyledContainer>
  );
};

export default TimeLineModeView;
