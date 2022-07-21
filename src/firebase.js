// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseKey = process.env.REACT_APP_FIREBASE_KEY;
const firebaseId = process.env.REACT_APP_FIREBASE_ID;
const messaging_Sender_Id = process.env.REACT_APP_MESSAGING_SENDER_ID;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "moviespedia-react.firebaseapp.com",
  projectId: "moviespedia-react",
  storageBucket: "moviespedia-react.appspot.com",
  messagingSenderId: messaging_Sender_Id,
  appId: firebaseId
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);

export const db = getFirestore(fb);