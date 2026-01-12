// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGCaUNApgR9fpvw2oRakhDtm505XuOU_8",
  authDomain: "moviecatalogueapp-36dd0.firebaseapp.com",
  projectId: "moviecatalogueapp-36dd0",
  storageBucket: "moviecatalogueapp-36dd0.firebasestorage.app",
  messagingSenderId: "617826500316",
  appId: "1:617826500316:web:89b639e0d326fee7977e19",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

