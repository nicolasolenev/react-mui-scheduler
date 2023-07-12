import React, { FC, JSX, useState } from "react";
import { alpha, lighten, styled, Theme, useTheme } from "@mui/material/styles";
import { TableCell, tableCellClasses, TableRow } from "@mui/material";
import { isSameMonth } from "date-fns";
import EventItem from "../EventItem";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import { SxProps } from "@mui/system";
import { ColumnHeader, Day, Event, ItemTransfer, ModeState, Option, RowHeader, TransferTarget } from "../types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${ tableCellClasses.head }`]: {
    borderTop: `1px ${ theme.palette.divider } solid !important`,
    borderBottom: `1px ${ theme.palette.divider } solid !important`,
    borderLeft: `1px ${ theme.palette.divider } solid !important`,
    ["&:nth-of-type(1)"]: {
      borderLeft: `0px !important`,
    },
  },
  [`&.${ tableCellClasses.body }`]: {
    fontSize: 12,
    height: 96,
    width: 64,
    maxWidth: 64,
    cursor: "pointer",
    verticalAlign: "top",
    borderLeft: `1px ${ theme.palette.divider } solid`,
    ["&:nth-of-type(7n+1)"]: {
      borderLeft: 0,
    },
    ["&:nth-of-type(even)"]: {
      //backgroundColor: theme.palette.action.hover
    },
  },
  [`&.${ tableCellClasses.body }:hover`]: {
    //backgroundColor: "#eee"
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  ["&:last-child td, &:last-child th"]: {
    border: 0,
  },
}));

interface MonthModeViewProps {
  rows: RowHeader[] | undefined;
  options: Option;
  columns: ColumnHeader[] | undefined;
  legacyStyle?: boolean;
  searchResult: Event | undefined;
  onTaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => void;
  onCellClick?: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: RowHeader, day: Day) => void;
  onEventsChange: (item: Event) => void;
}

const MonthModeView: FC<MonthModeViewProps> = ({
  rows = [],
  options,
  columns = [],
  legacyStyle,
  searchResult,
  onTaskClick,
  onCellClick,
  onEventsChange,
}): JSX.Element => {
  const theme = useTheme();
  const [state, setState] = useState<ModeState>({});
  const today = new Date();
  let currentDaySx: SxProps<Theme> = {
    width: 24,
    height: 22,
    margin: "auto",
    display: "block",
    paddingTop: "2px",
    borderRadius: "50%",
  };

  const onCellDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const onCellDragStart = (e: React.DragEvent<HTMLDivElement>, item: Event, rowIndex: number) => {
    setState({
      ...state,
      itemTransfer: { item, rowIndex },
    });
  };

  const onCellDragEnter = (e: React.DragEvent<HTMLTableCellElement>, elementId: number, rowIndex: number) => {
    e.preventDefault();
    setState({
      ...state,
      transferTarget: { elementId, rowIndex },
    });
  };

  const onCellDragEnd = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    if (!state.itemTransfer && !state.transferTarget) return;
    let transfer = state.itemTransfer as ItemTransfer;
    let transferTarget = state.transferTarget as TransferTarget;
    let rowsCopy = Array.from(rows);
    let rowInd = rowsCopy.findIndex(d => d.id === transferTarget?.rowIndex);

    if (rowInd !== -1) {
      let dayInd = rowsCopy[rowInd]
        ?.days
        ?.findIndex((d: Day) => d.id === transferTarget?.elementId);
      if (dayInd !== -1) {
        let day = rowsCopy[rowInd]?.days[dayInd];
        // Get day of the date (DD)
        if (!transfer?.item?.day)
          transfer.item.day = transfer?.item?.date.getDay();
        if (transfer?.item?.day !== day?.day) {
          let itemCheck = day.data.findIndex((item: Event) => (
            item.day === transfer.item.day && item.label === transfer.item.label
          ));
          if (itemCheck === -1) {
            let prevDayEvents = rowsCopy[transfer.rowIndex as number]
              .days
              .find((d: Day) => d.day === transfer.item.day);
            let itemIndexToRemove = prevDayEvents
              ?.data
              ?.findIndex((i: Event) => i.id === transfer.item.id);
            if (itemIndexToRemove === undefined || itemIndexToRemove === -1) {
              return;
            }
            prevDayEvents?.data?.splice(itemIndexToRemove, 1);
            transfer.item.day = day?.day;
            transfer.item.date = day?.date;
            day.data.push(transfer.item);
            setState({
              ...state,
              rows: rowsCopy,
              itemTransfer: null,
              transferTarget: null,
            });
            onEventsChange && onEventsChange(transfer.item);
          }
        }
      }
    }
  };

  const handleCellClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: RowHeader, day: Day) => {
    event.preventDefault();
    event.stopPropagation();
    if (day?.data?.length === 0 && onCellClick) {
      onCellClick(event, row, day);
    }
  };

  const renderTask = (tasks: Event[] = [], rowId: number) => {
    return tasks?.map((task) => {
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
          isMonthMode
          event={ task }
          rowId={ rowId }
          elevation={ 0 }
          boxSx={ { px: 0.5 } }
          key={ `item-d-${ task?.id }-${ rowId }` }
          onClick={ e => handleTaskClick(e, task) }
          onDragStart={ e => onCellDragStart(e, task, rowId) }
          sx={ {
            width: "100%",
            py: 0,
            my: .3,
            color: theme.palette.common.white,
            backgroundColor: task?.color || theme.palette.primary.light,
            textAlign: "left",
          } }
        />
      );
    });
  };

  const handleTaskClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: Event) => {
    event.preventDefault();
    event.stopPropagation();
    onTaskClick && onTaskClick(event, task);
  };

  return (
    <TableContainer component={ Paper } sx={ { boxShadow: "none" } }>
      <Table
        size="small"
        aria-label="simple table"
        stickyHeader sx={ { minWidth: options.minWidth || 650 } }
      >
        { legacyStyle && <TableHead sx={ { height: 24 } }>
          <StyledTableRow>
            { columns?.map((column, index) => (
              <StyledTableCell
                align="center"
                key={ column?.headerName + "-" + index }
              >
                { column?.headerName }
              </StyledTableCell>
            )) }
          </StyledTableRow>
        </TableHead> }
        <TableBody>
          { rows?.map((row, index) => (
            <StyledTableRow
              key={ `row-${ row.id }-${ index }` }
              sx={ {
                "&:last-child th": {
                  border: 0,
                  borderLeft: `1px ${ theme.palette.divider } solid`,
                  "&:firs-child": {
                    borderLeft: 0,
                  },
                },
              } }
            >
              { row?.days?.map((day: Day, indexD: number) => {
                const currentDay = (
                  day.day === today.getUTCDate() && isSameMonth(day.date as number | Date, today)
                );
                return (
                  <StyledTableCell
                    scope="row"
                    align="center"
                    component="th"
                    sx={ { px: 0.5, position: "relative" } }
                    key={ `day-${ day.id }` }
                    onDragEnd={ onCellDragEnd }
                    onDragOver={ onCellDragOver }
                    onDragEnter={ e => onCellDragEnter(e, day.id as number, row.id) }
                    onClick={ (event) => handleCellClick(event, row, day) }
                  >
                    <Box sx={ { height: "100%", overflowY: "visible" } }>
                      { !legacyStyle &&
                        index === 0 && columns[indexD]?.headerName?.toUpperCase() }.
                      <Typography
                        variant="body2"
                        sx={ {
                          ...currentDaySx,
                          background: (
                            currentDay &&
                            alpha(theme.palette.primary.main, 1)
                          ),
                          color: (currentDay && theme.palette.common.white),
                        } as SxProps<Theme> }
                      >
                        { day.day }
                      </Typography>
                      { (day?.data?.length > 0 && renderTask(day?.data, row.id)) }
                      { legacyStyle && day?.data?.length === 0 &&
                        <EventNoteRoundedIcon
                          fontSize="small"
                          htmlColor={ theme.palette.mode === "light" ? theme.palette.divider : lighten(theme.palette.common.white, .5) }
                        /> }
                    </Box>
                  </StyledTableCell>
                );
              }) }
            </StyledTableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonthModeView;
