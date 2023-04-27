// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLXp0t1of8_GjfBj8Z1UmeoMzQclF5eT4",
  authDomain: "excel-weather.firebaseapp.com",
  projectId: "excel-weather",
  storageBucket: "excel-weather.appspot.com",
  messagingSenderId: "286735541394",
  appId: "1:286735541394:web:d507773d1402868f41724b",
  measurementId: "G-CV5P6MB65J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dbFirestore = getFirestore(app);

const auth = getAuth();

export { dbFirestore, auth };
