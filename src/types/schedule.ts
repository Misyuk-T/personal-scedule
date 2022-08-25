import firebase from "firebase/compat";
import { OwnerId } from "./user";

import Timestamp = firebase.firestore.Timestamp;

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
  color: string;
  data: ScheduleData[];
}
