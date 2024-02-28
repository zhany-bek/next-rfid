"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";
import {
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  querySnapshot,
  query,
} from "firebase/firestore";
import { db } from "@firebase/config";
import { rtdb } from "@firebase/config";

const Products = () => {
  const [items, setItems] = useState([]);
  const [userSession, setUserSession] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setUserSession(sessionStorage.getItem("user"));
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
  }, []);

  const transformString = (str) => {
    return str.toLowerCase().replace(/\s+/g, '_');
  }

  return (
    <div>
      <h1 className="head_text text-center">Products</h1>
      {user ? (
        <section className="prompt_layout">
          {items.map((item) => (
            <div className="flex justify-between items-start gap-5">
            <div key={item.id} className="prompt_card">
              <Image className="object-contain h-[300px] w-[300px] rounded-lg" src={`/assets/images/${transformString(item.type)}.jpeg`} alt="Image of concrete" width={300} height={200} />
              <h2 className="green_sm_head_text">{item.id}</h2>
              <p className="prod_desc">Price: ${item.price}</p>
              <p className="prod_desc">Type: {item.type}</p>
              <Link href="/" className="edit_btn mt-5">
                Edit
              </Link>
            </div>
            </div>
          ))}
        </section>
      ) : (
        <div>
          <p className="text-red-500 font-bold text-center mt-10">You have no access here!!!</p>
        </div>
      )}
    </div>
  );
};

export default Products;
