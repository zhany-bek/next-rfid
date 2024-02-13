"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import { signOut } from "firebase/auth";
import { sign } from "crypto";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    setUserSession(sessionStorage.getItem("user"));
  }, []);

  const handleSignInClick = () => {
    router.push("/sign-in");
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2">
        <Image
          src="/assets/images/Ecoton-logo.svg"
          width={100}
          height={100}
          alt="Ecoton Logo"
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/view-products" className="black_btn">
              View Products
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut(auth);
                sessionStorage.removeItem("user");
              }}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSignInClick}
              className="black_btn"
            >
              Sign In
            </button>
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  View Products
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut(auth);
                    sessionStorage.removeItem("user");
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSignInClick}
              className="black_btn"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
