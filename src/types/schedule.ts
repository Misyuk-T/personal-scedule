import { CSSProperties } from "react";
import { Raw } from "material-ui-color";
import { OwnerId } from "./user";

export interface ColorObject {
  css: CSSProperties;
  value: number;
  hex: string;
  raw: Raw;
  name: string;
  alpha: number;
  rgb: [number, number, number];
  hsv: [number, number, number];
  hsl: [number, number, number];
}

export interface ScheduleFields {
  [key: string]: boolean | number;
}

export interface ScheduleData {
  scheduleId: string;
  startDate: number;
  endDate: number;
  value: boolean | number;
}

export type ScheduleId = string;

export interface Schedule extends OwnerId {
  id: ScheduleId;
  name: string;
  description: string;
  color: string;
  data: ScheduleData[];
  type: "boolean" | "range";
}
