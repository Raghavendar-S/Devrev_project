import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnmoQgUeZnxm7jjecZWvUqPOCGCKG07aI",
  authDomain: "sample-firebase-projecy.firebaseapp.com",
  projectId: "sample-firebase-projecy",
  storageBucket: "sample-firebase-projecy.appspot.com",
  messagingSenderId: "71581362998",
  appId: "1:71581362998:web:e7751a5d471103a1b06197"
};

const app = initializeApp(firebaseConfig);
export default app;

const db = getFirestore();
export {db};