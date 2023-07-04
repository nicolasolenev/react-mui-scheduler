import React, { FC, JSX, useState } from "react";
import { styled } from "@mui/system";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { format, parse, add, differenceInMinutes, isValid } from "date-fns";
import EventItem from "./EventItem";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${ tableCellClasses.head }`]: {
    paddingLeft: 4,
    paddingRight: 4,
    borderTop: `1px solid #ccc !important`,
    borderBottom: `1px solid #ccc !important`,
    borderLeft: `1px solid #ccc !important`,
    ["&:nth-of-type(1)"]: {
      borderLeft: `0px !important`,
    },
  },
  [`&.${ tableCellClasses.body }`]: {
    fontSize: 12,
    height: 16,
    width: 128,
    maxWidth: 128,
    cursor: "pointer",
    borderLeft: `1px solid #ccc`,
    ["&:nth-of-type(1)"]: { borderLeft: 0 },
  },
  [`&.${ tableCellClasses.body }:hover`]: {
    backgroundColor: "#eee",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  ["&:last-child td, &:last-child th"]: {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(() => ({
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
})) as typeof TableContainer;

interface DayModeViewProps {
  options?: any;
  columns?: any[];
  rows?: any[];
  date?: string;
  searchResult?: any;
  onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: any) => void;
  onCellClick?: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: any, day?: any) => void;
  onEventsChange: (item: any) => void;
}

const DayModeView: FC<DayModeViewProps> = ({
  options,
  columns,
  rows,
  searchResult,
  onTaskClick,
  onCellClick,
  onEventsChange,
}): JSX.Element => {
  const theme = useTheme();
  const [state, setState] = useState<any>({ columns, rows });

  const onCellDragOver = (e: React.DragEvent<HTMLTableCellElement>): void => {
    e.preventDefault();
  };

  const onCellDragStart = (e: React.DragEvent<HTMLDivElement>, item: any, rowLabel: string, rowIndex?: number, dayIndex?: number): void => {
    setState({
        ...state,
        itemTransfer: { item, rowLabel, rowIndex, dayIndex },
      },
    );
  };

  const onCellDragEnter = (e: React.DragEvent<HTMLTableCellElement>, rowLabel: string, rowIndex: number, dayIndex: number): void => {
    e.preventDefault();
    setState({ ...state, transferTarget: { rowLabel, rowIndex, dayIndex } });
  };

  const onCellDragEnd = (e: React.DragEvent<HTMLTableCellElement>): void => {
    e.preventDefault();
    if (!state.itemTransfert || !state.transfertTarget) {
      return;
    }
    let transfer = state.itemTransfert;
    let transferTarget = state.transfertTarget;
    let rowsData = Array.from(rows as any[]);
    let day = rowsData[transferTarget.rowIndex]?.days[transferTarget.dayIndex];

    if (day) {
      let hourRegExp = /[0-9]{2}:[0-9]{2}/;
      let foundEventIndex = day.data.findIndex((e: any) =>
        e.id === transfer.item.id &&
        e.startHour === transfer.item.startHour &&
        e.endHour === transfer.item.endHour,
      );
      // Task already exists in the data array of the chosen cell
      if (foundEventIndex !== -1) {
        return;
      }

      // Event cell item to transfer
      let prevEventCell = rowsData[transfer.rowIndex].days[transfer.dayIndex];
      // Timeline label (00:00 am, 01:00 am, etc.)
      let label = transferTarget.rowLabel?.toUpperCase();
      let hourLabel = hourRegExp.exec(label as string)?.[0];
      // Event's end hour
      let endHour = hourRegExp.exec(transfer.item.endHour as string)?.[0];
      let endHourDate = parse(endHour as string, "HH:mm", day.date);
      // Event start hour
      let startHour = hourRegExp.exec(transfer.item.startHour as string)?.[0];
      let startHourDate = parse(startHour as string, "HH:mm", day.date);
      // Minutes difference between end and start event hours
      let minutesDiff = differenceInMinutes(endHourDate, startHourDate);
      // New event end hour according to it new cell
      let newEndHour = add(
        parse(hourLabel as string, "HH:mm", day.date), { minutes: minutesDiff },
      );

      if (!isValid(startHourDate)) {
        startHourDate = day.date;
        minutesDiff = differenceInMinutes(endHourDate, startHourDate);
        newEndHour = add(
          parse(hourLabel as string, "HH:mm", day.date), { minutes: minutesDiff },
        );
      }

      prevEventCell?.data?.splice(transfer?.item?.itemIndex, 1);
      transfer.item.startHour = label;
      transfer.item.endHour = format(newEndHour, "HH:mm aaa");
      transfer.item.date = format(day.date, "yyyy-MM-dd");
      day.data.push(transfer.item);
      setState({ ...state, rows: rowsData });
      onEventsChange && onEventsChange(transfer.item);
    }
  };

  const handleCellClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: any, day?: any): void => {
    event.preventDefault();
    event.stopPropagation();
    onCellClick && onCellClick(event, row, day);
  };

  const renderTask = (tasks: any[], rowLabel: string, rowIndex?: number, dayIndex?: number) => {
    return tasks?.map((task, itemIndex) => {
      let condition = (
        searchResult ?
          (
            task?.groupLabel === searchResult?.groupLabel ||
            task?.user === searchResult?.user
          ) : !searchResult
      );
      return (
        condition &&
        <EventItem
          rowId={ itemIndex }
          event={ task }
          elevation={ 0 }
          boxSx={ { px: 0.3 } }
          onClick={ e => handleTaskClick(e, task) }
          key={ `item_id-${ itemIndex }_r-${ rowIndex }_d-${ dayIndex }` }
          onDragStart={ e => onCellDragStart(
            e, { ...task, itemIndex }, rowLabel, rowIndex, dayIndex,
          ) }
          sx={ {
            py: 0, mb: .5, color: "#fff",
            backgroundColor: task?.color || theme.palette.primary.light,
          } }
        />
      );
    });
  };

  const handleTaskClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: any): void => {
    event.preventDefault();
    event.stopPropagation();
    onTaskClick && onTaskClick(event, task);
  };

  return (
    <StyledTableContainer
      component={ Paper }
      sx={ { maxHeight: options?.maxHeight || 540 } }
    >
      <Table
        size="small"
        aria-label="simple table"
        stickyHeader sx={ { minWidth: options.minWidth || 540 } }
      >
        <TableHead sx={ { height: 24 } }>
          <StyledTableRow>
            <StyledTableCell align="left"/>
            {
              columns?.map((column, index) => (
                <StyledTableCell
                  align="center" colSpan={ 2 }
                  key={ `weekday-${ column?.day }-${ index }` }
                >
                  { column?.weekDay } { column?.month }/{ column?.day }
                </StyledTableCell>
              ))
            }
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            rows?.map((row, rowIndex) => {
              let lineTasks = row.days?.reduce((prev: any, curr: any) => prev + curr?.data?.length, 0);
              return (
                <StyledTableRow
                  key={ `timeline-${ rowIndex }` }
                  sx={ { "&:last-child td, &:last-child th": { border: 0 } } }
                >
                  <Tooltip
                    placement="right"
                    title={ `${ lineTasks } event${ lineTasks > 1 ? "s" : "" } on this week timeline` }
                  >
                    <StyledTableCell
                      scope="row" align="center"
                      component="th" sx={ { px: 1 } }
                      onClick={ (event) => handleCellClick(event, row) }
                    >
                      <Typography variant="body2">{ row?.label }</Typography>
                      { row?.data?.length > 0 && renderTask(row?.data, row.id) }
                    </StyledTableCell>
                  </Tooltip>
                  { row?.days?.map((day: any, dayIndex: number) => {
                    return (
                      <StyledTableCell
                        key={ day?.id }
                        scope="row"
                        align="center"
                        component="th"
                        colSpan={ 2 }
                        sx={ { px: .3, py: .5 } }
                        onDragEnd={ onCellDragEnd }
                        onDragOver={ onCellDragOver }
                        onDragEnter={ e => onCellDragEnter(e, row?.label, rowIndex, dayIndex) }
                        onClick={ (event) => handleCellClick(
                          event, { rowIndex, ...row }, { dayIndex, ...day },
                        ) }
                      >
                        { day?.data?.length > 0 && renderTask(day?.data, row?.label, rowIndex, dayIndex) }
                      </StyledTableCell>
                    );
                  }) }
                </StyledTableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default DayModeView;
