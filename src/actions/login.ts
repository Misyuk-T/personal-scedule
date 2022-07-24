import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { AppThunk } from "../redux/store";
import { login, logout } from "redux/reducers/userSlice";

const firebaseConfig = {
  apiKey: "AIzaSyDUC7p7k8LbJy1oHAoJqJIz9CqtNCup2ow",
  authDomain: "personal-mood-schedule.firebaseapp.com",
  databaseURL:
    "https://personal-mood-schedule-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "personal-mood-schedule",
  storageBucket: "personal-mood-schedule.appspot.com",
  messagingSenderId: "858168747701",
  appId: "1:858168747701:web:a7e7a1889799c82774c0fc",
  measurementId: "G-7L0227RQNE",
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();

export const authObserve = (): AppThunk => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      const userData = {
        name: displayName,
        email: email,
        photo: photoURL,
        id: uid,
      };

      return new Promise(() => {
        // const db = firestore();

        const usersDoc = doc(db, "users", uid);
        updateDoc(usersDoc, userData).then((data) => {
          //  dispatch(login(user));
          console.log(data, "user");
        });
      })
        .then(() => {
          dispatch(login(userData));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      dispatch(logout());
    }
  });
};

export const loginUser = async () => {
  provider.addScope("profile");
  provider.addScope("email");

  await signInWithPopup(auth, provider);
};

export const logoutUser = (): AppThunk => (dispatch) => {
  signOut(auth).then(() => {
    dispatch(logout());
  });
};
