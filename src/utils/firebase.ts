// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYFqDpgcGYGbh4qLKbTbwStJfK-ri7jLE",
  authDomain: "mysmartbasket.firebaseapp.com",
  projectId: "mysmartbasket",
  storageBucket: "mysmartbasket.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

