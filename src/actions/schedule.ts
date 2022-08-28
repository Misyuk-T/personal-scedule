import {
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
  documentId,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";

import { updateUserSchedules } from "redux/reducers/userSlice";
import {
  addSchedules,
  removeSchedule,
  updateSchedules,
} from "redux/reducers/scheduleSlice";
import { AppThunk } from "redux/store";
import { Schedule, ScheduleId } from "types/schedule";

const db = getFirestore();

export const addSchedule =
  (userId: string, schedule: any): AppThunk =>
  async (dispatch) => {
    const scheduleRef = doc(collection(db, "schedules"));
    const scheduleId = scheduleRef.id;

    await setDoc(scheduleRef, { ...schedule, id: scheduleId }).then(() => {
      updateDoc(doc(db, "users", userId), {
        schedules: arrayUnion(scheduleId),
      }).then(() => {
        dispatch(updateUserSchedules(scheduleId));
      });
    });
  };

export const deleteSchedule =
  (userId: string, scheduleId: ScheduleId): AppThunk =>
  async (dispatch) => {
    const scheduleRef = doc(db, "schedules", scheduleId);

    await deleteDoc(scheduleRef).then(() => {
      updateDoc(doc(db, "users", userId), {
        schedules: arrayRemove(scheduleId),
      }).then(() => {
        dispatch(removeSchedule(scheduleId));
      });
    });
  };

export const editSchedule =
  (scheduleId: ScheduleId, schedule: Schedule): AppThunk =>
  async (dispatch) => {
    updateDoc(doc(db, "schedules", scheduleId), { ...schedule }).then(() => {
      dispatch(updateSchedules(schedule));
    });
  };

export const observeSchedules =
  (schedules: ScheduleId[]): AppThunk =>
  async (dispatch) => {
    const q = query(
      collection(db, "schedules"),
      where(documentId(), "in", schedules)
    );

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(addSchedules(change.doc.data()));
        }
        if (change.type === "modified") {
          dispatch(updateSchedules(change.doc.data()));
        }
        if (change.type === "removed") {
          dispatch(removeSchedule(change.doc.data().id));
        }
      });
    });
  };
