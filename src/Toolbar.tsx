import React, { FC, JSX, useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { add, format, getDaysInMonth, parse, sub } from "date-fns";
import DateFnsLocaleContext from "./locales/dateFnsContext";
import { AlertProps, Event, Mode, OptionMenu, ToolbarProps as SchedulerToolbarProps } from "./types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import Menu from "@mui/material/Menu";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Stack from "@mui/material/Stack";
import ToolbarSearchbar from "./ToolbarSearchBar";
import GridViewIcon from "@mui/icons-material/GridView";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import MuiToolbar from "@mui/material/Toolbar";
import { IconButtonProps } from "@mui/material/IconButton/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ToolbarProps {
  events: Event[];
  today: number | Date;
  switchMode: Mode;
  alertProps?: AlertProps;
  toolbarProps: SchedulerToolbarProps;
  onModeChange: (mode: Mode) => void;
  onDateChange: (daysInMonth: number, selectedDate: number | Date | null) => void;
  onSearchResult: (searchResult: Event) => void;
  onAlertCloseButtonClicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Toolbar: FC<ToolbarProps> = ({
  events,
  today,
  switchMode,
  alertProps = {
    open: false,
    message: "",
    color: "info",
    severity: "info",
    showActionButton: true,
  } as AlertProps,
  toolbarProps,
  onModeChange,
  onDateChange,
  onSearchResult,
  onAlertCloseButtonClicked,
}): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation(["common"]);
  const [mode, setMode] = useState<Mode>(switchMode);
  const [searchResult, setSearchResult] = useState<Event | string>();
  const [anchorMenuEl, setAnchorMenuEl] = useState<EventTarget & HTMLButtonElement | null>(null);
  const [anchorDateEl, setAnchorDateEl] = useState<EventTarget & HTMLButtonElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | Date>(today || new Date());
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedDate as number | Date));

  const openMenu = Boolean(anchorMenuEl);
  const openDateSelector = Boolean(anchorDateEl);
  const dateFnsLocale = useContext(DateFnsLocaleContext);
  const isDayMode = mode.toLowerCase() === Mode.DAY;
  const isWeekMode = mode.toLowerCase() === Mode.WEEK;
  const isMonthMode = mode.toLowerCase() === Mode.MONTH;

  const commonIconButtonProps: IconButtonProps = {
    size: "medium",
    edge: "start",
    color: "inherit",
    "aria-label": "menu",
  };

  const handleCloseMenu = (): void => {
    setAnchorMenuEl(null);
  };

  const handleOpenDateSelector = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorDateEl(event.currentTarget);
  };

  const handleCloseDateSelector = (): void => {
    setAnchorDateEl(null);
  };

  const handleChangeDate = (method: (date: Date | number, duration: Duration) => Date): void => {
    if (typeof method !== "function") {
      return;
    }
    let options: Duration = { months: 1 };
    if (isWeekMode) {
      options = { weeks: 1 };
    }
    if (isDayMode) {
      options = { days: 1 };
    }
    let newDate = method(selectedDate, options);
    setDaysInMonth(getDaysInMonth(newDate));
    setSelectedDate(newDate);
  };

  const handleCloseAlert = (e: React.MouseEvent<HTMLButtonElement>): void => {
    onAlertCloseButtonClicked && onAlertCloseButtonClicked(e);
  };

  useEffect(() => {
    if (mode && onModeChange) {
      onModeChange(mode);
    }
  }, [mode]);

  useEffect(() => {
    onDateChange && onDateChange(daysInMonth, selectedDate);
  }, [daysInMonth, selectedDate]);

  useEffect(() => {
    onSearchResult && onSearchResult(searchResult as Event);
  }, [searchResult]);

  useEffect(() => {
    if (switchMode !== mode) {
      setMode(switchMode);
    }
  }, [switchMode]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorMenuEl(event.currentTarget);
  };

  return (
    <MuiToolbar
      variant="dense"
      sx={ {
        px: "0px !important",
        display: "block",
        borderBottom: `1px ${ theme.palette.divider } solid`,
      } }
    >
      <Grid
        container
        spacing={ 0 }
        alignItems="center"
        justifyContent="flex-end"
      >
        <Grid item xs={ 1 } sm md>
          { toolbarProps.showDatePicker &&
            <Typography component="div" sx={ { display: "flex" } }>
              <Hidden smDown>
                <IconButton
                  sx={ { ml: 0, mr: -.1 } }
                  { ...commonIconButtonProps }
                  onClick={ () => handleChangeDate(sub) }
                >
                  <ChevronLeftIcon/>
                </IconButton>
                <Button
                  size="small"
                  id="basic-button"
                  aria-haspopup="true"
                  //endIcon={<TodayIcon />}
                  aria-controls="basic-menu"
                  onClick={ handleOpenDateSelector }
                  sx={ { color: "text.primary" } }
                  aria-expanded={ openDateSelector ? "true" : undefined }
                >
                  { format(
                    selectedDate as number | Date,
                    isMonthMode ? "MMMM-yyyy" : "PPP",
                    { locale: dateFnsLocale },
                  ) }
                </Button>
                <IconButton
                  sx={ { ml: .2 } }
                  { ...commonIconButtonProps }
                  onClick={ () => handleChangeDate(add) }
                >
                  <ChevronRightIcon/>
                </IconButton>
              </Hidden>
              <Hidden smUp>
                <IconButton
                  sx={ { ml: 0, "aria-label": "menu" } }
                  { ...commonIconButtonProps }
                  size="small"
                  onClick={ handleOpenDateSelector }
                >
                  <TodayIcon/>
                </IconButton>
              </Hidden>
              <Menu
                id="date-menu"
                anchorEl={ anchorDateEl }
                open={ openDateSelector }
                onClose={ handleCloseDateSelector }
                MenuListProps={ { "aria-labelledby": "basic-button" } }
              >
                <LocalizationProvider
                  adapterLocale={ dateFnsLocale }
                  dateAdapter={ AdapterDateFns }
                >
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={ selectedDate }
                    views={ isMonthMode ? ["month", "year"] : ["day", "month", "year"] }
                    onChange={ (value: number | Date | null): void => {
                      setDaysInMonth(getDaysInMonth(value as number | Date));
                      setSelectedDate(value as number | Date);
                      handleCloseDateSelector();
                    } }
                  />
                </LocalizationProvider>
              </Menu>
            </Typography> }
        </Grid>
        <Grid item xs sm md sx={ { textAlign: "right" } }>
          <Stack
            direction="row"
            sx={ {
              pr: .5,
              alignItems: "center",
              justifyContent: "flex-end",
            } }>
            { toolbarProps?.showSearchBar &&
              <ToolbarSearchbar
                events={ events }
                onInputChange={ (value: string | Event) => {
                  let newDate = new Date();
                  if (value instanceof Event && (value as Event)?.date) {
                    newDate = parse((value as Event).date, "yyyy-MM-dd", today);
                  }
                  setDaysInMonth(getDaysInMonth(newDate));
                  setSelectedDate(newDate);
                  setSearchResult(value);
                } }
              /> }
            <Hidden mdUp>
              <IconButton
                sx={ { mr: 0, "aria-label": "menu" } }
                { ...commonIconButtonProps }
                size="small"
                onClick={ handleOpenDateSelector }
              >
                <GridViewIcon/>
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              { Object.values(toolbarProps.showSwitchModeButtons).some(val => val) &&
                <ToggleButtonGroup
                  exclusive
                  value={ mode }
                  size="small"
                  color="primary"
                  aria-label="text button group"
                  sx={ { mt: .2, mr: 1.3, display: "contents" } }
                  onChange={ (e, newMode) => {
                    setMode(newMode);
                  } }
                >
                  { [
                    toolbarProps.showSwitchModeButtons.showMonthButton ?
                      { label: t("month"), value: Mode.MONTH } : null,
                    toolbarProps.showSwitchModeButtons.showWeekButton ?
                      { label: t("week"), value: Mode.WEEK } : null,
                    toolbarProps.showSwitchModeButtons.showDayButton ?
                      { label: t("day"), value: Mode.DAY } : null,
                    toolbarProps.showSwitchModeButtons.showTimelineButton ?
                      { label: t("timeline"), value: Mode.TIMELINE } : null,
                  ].filter(Boolean).map(tb => (
                    <ToggleButton sx={ { mt: .5 } } key={ tb?.value } value={ tb?.value as string }>
                      { tb?.label }
                    </ToggleButton>
                  )) }
                </ToggleButtonGroup> }
            </Hidden>
            { toolbarProps?.showOptions &&
              <IconButton sx={ { ml: 1 } } onClick={ handleOpenMenu }{ ...commonIconButtonProps }>
                <MoreVertIcon/>
              </IconButton>
            }
          </Stack>
        </Grid>
        <Grid item xs={ 12 } sx={ {} }>
          <Menu
            id="menu-menu"
            open={ openMenu }
            anchorEl={ anchorMenuEl }
            onClose={ handleCloseMenu }
            onClick={ handleCloseMenu }
            transformOrigin={ { horizontal: "right", vertical: "top" } }
            anchorOrigin={ { horizontal: "right", vertical: "bottom" } }
          >
            { toolbarProps.optionMenus?.map((menu) => (
              <MenuItem key={ menu.label }>
                <ListItemIcon>{ menu.icon }</ListItemIcon>
                <Typography variant="body2">{ menu.label }</Typography>
              </MenuItem>
            )) }
          </Menu>
          <Collapse in={ alertProps?.open }>
            <Alert
              color={ alertProps?.color }
              severity={ alertProps?.severity }
              sx={ { borderRadius: 0, mb: 0 } }
              action={
                alertProps?.showActionButton ?
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={ handleCloseAlert }
                  >
                    <CloseIcon fontSize="inherit"/>
                  </IconButton> : null
              }
            >
              { alertProps?.message }
            </Alert>
          </Collapse>
        </Grid>
      </Grid>
    </MuiToolbar>
  );
};

export default Toolbar;
