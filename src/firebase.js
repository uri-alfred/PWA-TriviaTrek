// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk3P6IggPJ6jmSJtCo-g76SD3nzDmHS0E",
  authDomain: "triviatrek-3b4a7.firebaseapp.com",
  projectId: "triviatrek-3b4a7",
  storageBucket: "triviatrek-3b4a7.appspot.com",
  messagingSenderId: "31031207372",
  appId: "1:31031207372:web:a7b263affa20b57feae969",
  measurementId: "G-333WN8Y82F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// -- variable auth para la autenticación de usuarios con firebase autentication
export const auth = getAuth(app);
// -- variable db para la base de datos con firebase realtime database
// para almacenamiento y actualización de datos en tiempo real
export const db = getDatabase(app);
