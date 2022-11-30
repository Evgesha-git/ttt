import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDEDWxT6vm5gwF9eJ8QRVNDVInAs35DYA0",
    authDomain: "to-do-test-app-887f8.firebaseapp.com",
    databaseURL: "https://to-do-test-app-887f8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "to-do-test-app-887f8",
    storageBucket: "to-do-test-app-887f8.appspot.com",
    messagingSenderId: "63382058435",
    appId: "1:63382058435:web:3c95716d9e6b3cf264f976",
    measurementId: "G-VYXQ2GFS7T",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);