import { auth } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword, sendEmailVerification  } from "/firebase/auth";

export const registerUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

///  Send verification email
  await sendEmailVerification(userCredential.user);

  return userCredential;
};

