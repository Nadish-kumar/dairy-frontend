import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCIxdpVRNb9yon5qV9fjUT2CZ358tW-b7w",
  authDomain: "remember-project-498c3.firebaseapp.com",
  projectId: "remember-project-498c3",
  storageBucket: "remember-project-498c3.appspot.com",
  messagingSenderId: "1062662575991",
  appId: "1:1062662575991:web:50f1cb615303992d187372",
  measurementId: "G-K14V2K06Z1",
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };
