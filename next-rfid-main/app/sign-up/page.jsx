"use client";
import { useState, useRef, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";

import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const buttonRef = useRef(null)

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        buttonRef.current.click();
      }
    };
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="w-1/3 max-w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="eco_green_gradient text-center">Sign Up</span>
      </h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
        className="form_input border border-blue-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form_input border border-blue-300"
      />
      <button
        type="submit"
        onClick={handleSignUp}
        className="green_btn m-5"
      >
        Sign Up
      </button>

      <p className="desc text-center">Have an account?</p>
      <Link href="/sign-in" className="black_btn m-2">
        Sign In
      </Link>
    </section>
  );
};

export default SignUp;
