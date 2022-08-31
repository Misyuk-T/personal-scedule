import { AppThunk } from "../redux/store";
import {
  doc,
  getFirestore,
  updateDoc,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { updateUserInformation } from "../redux/reducers/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FormikValues } from "formik";
import { UserInformation } from "../types/user";

const db = getFirestore();
const storage = getStorage();

export const updateUser =
  (
    userId: string,
    user: UserInformation | FormikValues | DocumentData
  ): AppThunk =>
  async (dispatch) => {
    await updateDoc(doc(db, "users", userId), user).then(() => {
      dispatch(updateUserInformation(user));
    });
  };

export const observeUser =
  (userId: string): AppThunk =>
  async (dispatch) => {
    onSnapshot(doc(db, "users", userId), (snapshot) => {
      dispatch(
        updateUser(
          snapshot.data()?.id,
          snapshot.data() || ({} as UserInformation)
        )
      );
    });
  };

export const uploadMedia = (folder: string, userId: string, file: File) => {
  const storageRef = ref(storage, `${folder}/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, rejects) => {
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((err) => {
            console.error(err);
            rejects(err);
          });
      }
    );
  });
};
