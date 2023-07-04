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

export interface Event {
  id: number | string;
  label: string;
  startHour: string;
  endHour: string;
}
