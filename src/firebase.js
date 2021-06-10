import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyB6hcETwR_OEAXl_bm2lE1LuE1aYIGy_Fo",
    authDomain: "facebook-messenger-84642.firebaseapp.com",
    projectId: "facebook-messenger-84642",
    storageBucket: "facebook-messenger-84642.appspot.com",
    messagingSenderId: "1020906486589",
    appId: "1:1020906486589:web:098cf364fae898a5f3e354",
    measurementId: "G-TPZEDG4LJ6"
  
});

const db = firebaseApp.firestore();

export default db