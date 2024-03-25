"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase/config";

// For Firestore:
/*
import {
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  querySnapshot,
  query,
} from "firebase/firestore";
import { db } from "@firebase/config";
*/

// For RTDB:
import { get, ref } from 'firebase/database';
import { rtdb } from '@firebase/config';

const Products = () => {
  const [items, setItems] = useState([]);
  const [userSession, setUserSession] = useState(null);
  const [user] = useAuthState(auth);

  // Firestore code:
  /*
  useEffect(() => {
    const q = query(collection(db, "feed"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
  }, []); 
  */

  // RTDB code:
  useEffect(() => {
    const itemsRef = ref(rtdb, 'test');
    get(itemsRef).then((snapshot) => {
      if(snapshot.exists()) {
        const itemsArr = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setItems(itemsArr);
      }
      else {
        console.log("No data available...");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const transformString = (str) => {
    return str.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
  }

  return (
    <div>
      <h1 className="head_text text-center">Products</h1>
      {user ? (
        <section className="prompt_layout">
          {items.map((item) => (
            <div className="flex justify-between items-start gap-5">
            <div key={item.id} className="item_card">
              <Image className="object-contain h-[300px] w-[300px] rounded-lg" src={`/assets/images/${item.type}.jpeg`} alt="Image of concrete" width={300} height={200} />
              <h2 className="green_smst_head_text">{item.id}</h2>
              <p className="prod_smst_desc">Price: ${item.price}</p>
              <p className="prod_smst_desc">Type: {transformString(item.type)}</p>
              <p className="prod_smst_desc">Last Location: {item.location}</p>
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
