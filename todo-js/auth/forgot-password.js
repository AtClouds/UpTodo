import { auth } from "../firebase/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};