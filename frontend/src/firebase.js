import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbClyTrsK_JqbWmt1GCV3hzuT3XsJCL-Y",
  authDomain: "auth-development-e065c.firebaseapp.com",
  projectId: "auth-development-e065c",
  storageBucket: "auth-development-e065c.appspot.com",
  messagingSenderId: "1098550389504",
  appId: "1:1098550389504:web:24e5c92fa43a8d54be61e5",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = app.auth();
export default app;
