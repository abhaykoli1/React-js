import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyC5UvYiUrePCMMnmK6yIg86SvWdR7UQbdo",
//   authDomain: "authentication-1bd7e.firebaseapp.com",
//   projectId: "authentication-1bd7e",
//   storageBucket: "authentication-1bd7e.appspot.com",
//   messagingSenderId: "402043035840",
//   appId: "1:402043035840:web:f9d4849f1e0b99a0d34d25",
//   measurementId: "G-3TLH6H7T56",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCRCbwvMT6pYAcZlMfxTZ2NlJMOJRCh5JE",
  authDomain: "auth-a50c2.firebaseapp.com",
  projectId: "auth-a50c2",
  storageBucket: "auth-a50c2.appspot.com",
  messagingSenderId: "338333890235",
  appId: "1:338333890235:web:b8deaeb869ceab8f9edb9e",
  measurementId: "G-7C40MKC6F2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
export default app;
