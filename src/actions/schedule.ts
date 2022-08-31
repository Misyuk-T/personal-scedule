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
  getDocs,
} from "firebase/firestore";

import { AppThunk } from "redux/store";
import { updateUserSchedules } from "redux/reducers/userSlice";
import {
  addSchedules,
  removeSchedule,
  updateSchedules,
  setLoading,
} from "redux/reducers/scheduleSlice";
import { Schedule, ScheduleData, ScheduleId } from "types/schedule";

const db = getFirestore();

export const addSchedule =
  (userId: string, schedule: Schedule): AppThunk =>
  async (dispatch) => {
    const scheduleRef = doc(collection(db, "schedules"));
    const scheduleId = scheduleRef.id;

    dispatch(setLoading(true));

    await setDoc(scheduleRef, { ...schedule, id: scheduleId }).then(() => {
      updateDoc(doc(db, "users", userId), {
        schedules: arrayUnion(scheduleId),
      })
        .then(() => {
          dispatch(updateUserSchedules(scheduleId));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    });
  };

export const deleteSchedule =
  (userId: string, scheduleId: ScheduleId): AppThunk =>
  async (dispatch) => {
    const scheduleRef = doc(db, "schedules", scheduleId);

    dispatch(setLoading(true));

    await deleteDoc(scheduleRef).then(() => {
      updateDoc(doc(db, "users", userId), {
        schedules: arrayRemove(scheduleId),
      })
        .then(() => {
          dispatch(removeSchedule(scheduleId));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    });
  };

export const editSchedule =
  (scheduleId: ScheduleId, schedule: Schedule): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    updateDoc(doc(db, "schedules", scheduleId), { ...schedule })
      .then(() => {
        dispatch(updateSchedules(schedule));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const addScheduleData = async (
  schedulesId: ScheduleId[],
  data: Record<ScheduleId, ScheduleData>
) => {
  const q = query(
    collection(db, "schedules"),
    where(documentId(), "in", schedulesId)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((snapshot) => {
    const existingFirebaseData = snapshot.data().data || [];
    const freshDataItem = data[snapshot.id];
    const filteredData = existingFirebaseData.filter(
      (item: ScheduleData) => item.startDate !== freshDataItem.startDate
    );

    updateDoc(snapshot.ref, {
      data: [...filteredData, freshDataItem],
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
