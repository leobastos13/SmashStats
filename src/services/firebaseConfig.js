// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXL9r81WJkeOm154_tduY0L0jtGi5m84E",
  authDomain: "projeto-e7c84.firebaseapp.com",
  projectId: "projeto-e7c84",
  storageBucket: "projeto-e7c84.appspot.com",
  messagingSenderId: "635358898570",
  appId: "1:635358898570:web:ec9cbceb7c1fa8e54c8073",
  measurementId: "G-3WGQ31TEEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub; 
  }, [])
  return currentUser;
}
