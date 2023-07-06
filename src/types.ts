import { AlertColor } from "@mui/material/Alert/Alert";
import React from "react";

export enum TransitionMode {
  FADE = "fade",
  SLIDE = "slide",
  ZOOM = "zoom",
}

export enum Mode {
  DAY = "day",
  MONTH = "month",
  TIMELINE = "timeline",
  WEEK = "week",
}

export enum StartWeek {
  MON = "mon",
  SUN = "sun",
}

export interface Event {
  id: number | string;
  label: string;
  groupLabel: string;
  startHour: string;
  endHour: string;
  date: string;
  color?: string;
  user?: string;

  [key: string]: any;
}

export interface Option {
  transitionMode?: TransitionMode;
  startWeekOn?: StartWeek;
  defaultMode?: Mode;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export interface AlertProps {
  open: boolean;
  color: AlertColor;
  severity: AlertColor;
  message: string;
  showActionButton: boolean;
  showNotification: boolean;
  delay: number;
}

export interface OptionMenu {
  label: string;
  icon: string | React.JSX.Element;
}

export interface ToolbarProps {
  showSearchBar: boolean;
  showSwitchModeButtons: {
    showMonthButton: boolean;
    showWeekButton: boolean;
    showDayButton: boolean;
    showTimelineButton: boolean;
  };
  showDatePicker: boolean;
  showOptions: boolean;
  optionMenus?: OptionMenu[];
}
