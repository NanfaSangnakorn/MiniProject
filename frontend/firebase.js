import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBv2fWr8V_CJoKrv0fkAsk8S4bZsRQzUTs",
  authDomain: "zonea-da6f8.firebaseapp.com",
  databaseURL: "https://zonea-da6f8.firebaseio.com",
  projectId: "zonea-da6f8",
  storageBucket: "zonea-da6f8.appspot.com",
  messagingSenderId: "241529909277",
  appId: "1:241529909277:web:a11c4f6cd20e6b37ea96f4",
  measurementId: "G-K942TE187X",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral
//   firebase.analytics();

const storage = firebase.storage();
export { storage, firebase as default };
