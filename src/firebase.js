// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGwodfiuPkKkoXB8bSB1xg9TPE1QQAKM4",
  authDomain: "realtor-clone-df293.firebaseapp.com",
  projectId: "realtor-clone-df293",
  storageBucket: "realtor-clone-df293.appspot.com",
  messagingSenderId: "277881902686",
  appId: "1:277881902686:web:21e521cbdcac6cab2ac6cf"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();