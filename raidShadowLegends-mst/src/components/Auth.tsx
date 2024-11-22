import { useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  const signOutFunction = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  const signInFunction = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(auth?.currentUser?.email);
  return (
    <div className="authView flex flex-col justify-center items-center gap-2">
      <input
        type="Email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="Password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      <button onClick={signInFunction}>Sign In</button>
      <button onClick={signOutFunction}>Logout</button>
    </div>
  );
}
