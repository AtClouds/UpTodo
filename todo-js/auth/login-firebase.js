import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "/firebase/auth";

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};

///Google-Sign-in///
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result;
};