import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0v-xkGXbuVjlsbsRubzBzQ3zLMFw29LY",
  authDomain: "pin-it-7703a.firebaseapp.com",
  projectId: "pin-it-7703a",
  storageBucket: "pin-it-7703a.appspot.com",
  messagingSenderId: "623726011617",
  appId: "1:623726011617:web:8ddf06476322d462ac83a0",
  measurementId: "G-6N8XMD0S8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

