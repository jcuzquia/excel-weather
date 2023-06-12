import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
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
const functions = getFunctions();
connectFunctionsEmulator(functions, "localhost", 5001);

const dbFirestore = getFirestore(app);

const auth = getAuth();
connectFirestoreEmulator(dbFirestore, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");

export { dbFirestore, auth, app, functions };
