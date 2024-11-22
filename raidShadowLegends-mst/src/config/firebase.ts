import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5204wwnumPBk7xobP0jv5kmVvmcjAeRU",
  authDomain: "raidslmst.firebaseapp.com",
  projectId: "raidslmst",
  storageBucket: "raidslmst.firebasestorage.app",
  messagingSenderId: "42715294007",
  appId: "1:42715294007:web:261e894112c3f10c9912b2",
  measurementId: "G-TKQEWNYNM1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
