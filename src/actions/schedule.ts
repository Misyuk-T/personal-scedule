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
} from "firebase/firestore";

import { updateUserSchedules } from "redux/reducers/userSlice";
import { removeSchedule, updateSchedules } from "redux/reducers/scheduleSlice";
import { AppThunk } from "redux/store";
import { ScheduleId } from "types/schedule";

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
          dispatch(updateSchedules(change.doc.data()));
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
