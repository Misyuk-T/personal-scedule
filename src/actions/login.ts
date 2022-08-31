import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  getDocs,
  limit,
  query,
  where,
  collection,
  doc,
} from "firebase/firestore";

import { AppThunk } from "redux/store";
import { logout, login, setAuthObserve } from "redux/reducers/userSlice";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();

export const openLoginPopup = async () => {
  provider.addScope("profile");
  provider.addScope("email");

  await signInWithPopup(auth, provider).then();
};

const loginUser =
  (googleUserData: User): AppThunk =>
  async (dispatch) => {
    dispatch(setAuthObserve(true));

    try {
      const { displayName, email, photoURL, uid } = googleUserData;
      const userData = {
        name: displayName,
        email: email,
        photo: photoURL,
        ownerId: uid,
        schedules: [],
      };

      const usersRef = collection(db, "users");
      const userRef = doc(usersRef);
      const getUserWithEmail = query(
        usersRef,
        where("email", "==", email),
        limit(1)
      );
      const usersSnapShot = await getDocs(getUserWithEmail);

      if (usersSnapShot.empty) {
        await setDoc(userRef, {
          ...userData,
          id: userRef.id,
        }).then(() => {
          dispatch(login({ ...userData, id: userRef.id }));
        });
      } else {
        const existingUser = usersSnapShot.docs[0];

        dispatch(login(existingUser.data()));
      }
    } catch (err) {
      console.error(err);
    }
  };

export const logoutUser = async () => {
  await signOut(auth);
};

export const observeAuth = (): AppThunk => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(loginUser(user));
    } else {
      dispatch(logout());
    }
  });
};
