import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALlUjBrTvoFtUuyGU5EzIp2L0CTzUt5Nc",
  authDomain: "wadp-34c22.firebaseapp.com",
  projectId: "wadp-34c22",
  storageBucket: "wadp-34c22.appspot.com",
  messagingSenderId: "230797513066",
  appId: "1:230797513066:web:e4a7d3c698a752fc64d513",
  measurementId: "G-C34TL03LQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// Initialize Firestore
const db = getFirestore(app);

// Optional: Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Export the Firebase instance
export { app, analytics, signInWithGoogle, auth, db };
