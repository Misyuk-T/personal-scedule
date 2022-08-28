import firebase from "firebase/compat";
import { OwnerId } from "./user";

import Timestamp = firebase.firestore.Timestamp;
import { CSSProperties } from "react";
import { Raw } from "material-ui-color";

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

export interface ScheduleData {
  label: string;
  date: string;
  value: boolean | number;
  updateAt: Timestamp;
}

export type ScheduleId = string;

export interface Schedule extends OwnerId {
  id: ScheduleId;
  name: string;
  description: string;
  color: string;
  data: ScheduleData[];
}
