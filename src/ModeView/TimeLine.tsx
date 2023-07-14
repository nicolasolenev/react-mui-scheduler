import React, { FC, Fragment, JSX, useContext } from "react";
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
import Box from "@mui/material/Box";

const StyledContainer = styled(Box)(() => ({
  display: "flex",
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
}));

interface TimeLineModeViewProps {
  options: Option;
  rows: Event[] | undefined;
  searchResult: Event | undefined;
  onTaskClick?: (event: React.MouseEvent<HTMLDivElement>, task: Event) => void;
}

const TimeLineModeView: FC<TimeLineModeViewProps> = ({ options, rows, searchResult, onTaskClick }): JSX.Element => {
  const dateFnsLocale = useContext(DateFnsLocaleContext);

  const renderEvent = (event: Event, index: number) => (
    <TimelineItem
      key={ `timeline-item-${ index }` }
      sx={ { cursor: "pointer" } }
      onClick={ e => handleTaskClick(e, event) }>
      <TimelineOppositeContent
        sx={ { m: "auto 0" } }
        align="right"
        variant="body2"
        color="text.secondary"
      >
        { event.startDate && format(event.startDate, "PPP", { locale: dateFnsLocale }) }
        <br/>
        <Typography variant="caption">
          { event.startDate && format(event.startDate, "HH:mm") } - { format(event.endDate, "HH:mm") }
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector/>
        <TimelineDot color="secondary" sx={ { backgroundColor: event.color } }>
          { event.icon || <ScheduleIcon/> }
        </TimelineDot>
        <TimelineConnector/>
      </TimelineSeparator>
      <TimelineContent sx={ { py: "12px", px: 2 } }>
        <Typography variant="body1" component="span">
          { event.label }
        </Typography>
        <Typography>{ event.groupLabel }</Typography>
      </TimelineContent>
    </TimelineItem>
  );

  const handleTaskClick = (event: React.MouseEvent<HTMLDivElement>, task: Event) => {
    event.preventDefault();
    event.stopPropagation();
    onTaskClick && onTaskClick(event, task);
  };

  let filteredEvents = options.reverseTimelineOrder ?
    rows?.sort((a, b) => -b?.startDate?.toString()?.localeCompare(a?.startDate.toString())) :
    rows;
  if (searchResult)
    filteredEvents = filteredEvents?.filter((event: Event) => event?.groupLabel === searchResult?.groupLabel);

  const groupLabels = [...new Set(filteredEvents?.map((event: Event) => event.groupLabel))];

  return (
    <StyledContainer
      component="div"
      sx={ {
        overflowY: "auto",
        minHeight: options.minHeight,
        maxHeight: options.maxHeight,
      } }
    >
      { options.displayTimelineByGroupLabel && groupLabels.map((label, index) => (
        <Box display="flex" alignItems="center" flexDirection="column" key={ `timeline-${ index }` }>
          <Typography fontWeight={ 700 }>{ label }</Typography>
          <Timeline position="alternate">
            { filteredEvents?.filter((event: Event) => label === event.groupLabel)?.map((event: Event, index) =>
              undefined !== event.startDate ? renderEvent(event, index) : <div key={ `timeline-item-${ index }` }/>) }
          </Timeline>
        </Box>
      )) }
      { !options.displayTimelineByGroupLabel && (
        <Timeline position="alternate">
          { filteredEvents?.map((event: Event, index) =>
            undefined !== event.startDate ? renderEvent(event, index) : <div key={ `timeline-item-${ index }` }/>) }
        </Timeline>
      ) }
    </StyledContainer>
  )
    ;
};

export default TimeLineModeView;
