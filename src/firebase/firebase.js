import { initializeApp } from "firebase/app";
import { config } from "../config/config";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
