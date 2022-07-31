import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  getDocs,
  limit,
  query,
  where,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AppThunk } from "../redux/store";
import { logout, login } from "redux/reducers/userSlice";

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

export const openLoginPopup = async () => {
  provider.addScope("profile");
  provider.addScope("email");

  await signInWithPopup(auth, provider).then();
};

export const loginUser =
  (googleUserData: any): AppThunk =>
  async (dispatch) => {
    try {
      const { displayName, email, photoURL, uid } = googleUserData;
      const userData = {
        name: displayName,
        email: email,
        photo: photoURL,
        ownerId: uid,
      };

      const usersRef = collection(db, "users");
      const userRef = doc(usersRef);
      const getUserWithEmail = query(
        usersRef,
        where("email", "==", email),
        limit(1)
      );
      const usersSnapShot = await getDocs(getUserWithEmail);
      const existingUser = usersSnapShot.docs[0];

      if (usersSnapShot.empty) {
        await setDoc(userRef, {
          ...userData,
          id: userRef.id,
        }).then(() => {
          dispatch(login({ ...userData, id: userRef.id }));
        });
      } else {
        const userDoc = doc(db, "users", existingUser.id);

        await updateDoc(userDoc, userData).then(() => {
          dispatch(login({ ...userData }));
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

export const logoutUser = async () => {
  await signOut(auth);
};

// export const updateUser =
//   (user: User): AppThunk =>
//   (dispatch) => {
//     updateUserInformation(auth).then(() => {
//       dispatch(logout());
//     });
//   };

export const observeAuth = (): AppThunk => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(loginUser(user));
    } else {
      dispatch(logout());
    }
  });
};
