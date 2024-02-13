"use client";
import { useState, useRef, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

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
  

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res && res.user) {
        // Authentication successful, user is recognized
        console.log("User authenticated:", res.user);
        sessionStorage.setItem("user", true);
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        // User not recognized
        console.log("User not recognized");
        setErrorMessage("User not recognized. Please check your credentials.");
      }
    } catch (e) {
      console.error(e);
      setErrorMessage(
        "An error occurred during sign-in. Please try again later."
      );
    }
  };

  return (
    <section className="w-1/3 max-w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="eco_green_gradient text-center">Sign In</span>
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
        ref={buttonRef}
        type="submit"
        onClick={handleSignIn}
        className="green_btn m-5"
      >
        Sign In
      </button>
      {errorMessage && (
        <p className="text-red-500 font-bold text-center">{errorMessage}</p>
      )}
    </section>
  );
};

export default SignIn;
