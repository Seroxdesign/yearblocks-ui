import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVaEiiinqTpH07eKJDznCHo83Ysj0IL0c",
  authDomain: "yearblocks-ab0fd.firebaseapp.com",
  projectId: "yearblocks-ab0fd",
  storageBucket: "yearblocks-ab0fd.appspot.com",
  messagingSenderId: "800151971683",
  appId: "1:800151971683:web:5c6e2d47c7b7f4ab4f1556",
  measurementId: "G-6D0ZYWQBLX",
};
// Check if Firebase is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const storageFromUrl = (url) => firebase.storage().refFromURL(url);
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

export {
  firebase,
  db,
  auth,
  storage,
  providerFacebook,
  providerGoogle,
  storageFromUrl,
};
