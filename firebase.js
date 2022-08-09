// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";

import "firebase/compat/firestore";




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0yhmwmLT0uTdlNytqYUAZgwL_6cwz3yM",
    authDomain: "duplas-6840a.firebaseapp.com",
    projectId: "duplas-6840a",
    storageBucket: "duplas-6840a.appspot.com",
    messagingSenderId: "285925396208",
    appId: "1:285925396208:web:b4f47b52e25c6978633c35"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
const firestore = firebase.firestore()
export { auth, firestore };