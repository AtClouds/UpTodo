// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDe4_N3ESONFEI77e9_Cf0NZhhdQvBhrWQ",
  authDomain: "uptodo-51c83.firebaseapp.com",
  projectId: "uptodo-51c83",
  storageBucket: "uptodo-51c83.firebasestorage.app",
  messagingSenderId: "383581081800",
  appId: "1:383581081800:web:0dbe1fd53a61a26f7dd5fd",
  measurementId: "G-YW2M0WP7Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



