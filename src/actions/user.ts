import { AppThunk } from "../redux/store";
import { doc, getFirestore, updateDoc, onSnapshot } from "firebase/firestore";
import { updateUserInformation } from "../redux/reducers/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

export const updateUser =
  (userId: string, user: any): AppThunk =>
  async (dispatch) => {
    await updateDoc(doc(db, "users", userId), user).then(() => {
      dispatch(updateUserInformation(user));
    });
  };

export const observeUser =
  (userId: string): AppThunk =>
  async (dispatch) => {
    onSnapshot(doc(db, "users", userId), (snapshot) => {
      dispatch(updateUser(snapshot.data()?.id, snapshot.data()));
    });
  };

export const uploadMedia = (folder: string, userId: string, file: any) => {
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
