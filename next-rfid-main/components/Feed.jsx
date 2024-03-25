"use client"

import React from 'react'
import FeedItem from './FeedItem'
import Image from 'next/image';

import { useState, useEffect } from "react";

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

const Feed = () => {
  const [items, setItems] = useState([]);
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
    const itemsRef = ref(rtdb, 'feed_prompts');
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
    return str.toLowerCase().replace(/\s+/g, '_');
  }

  return (
    <section className='feed'>
      <div className='mt-4 feed_layout'>
      {items.map((item) => (
        <div key={item.id} className="feed_card">
              <h2 className="feed_sm_head_text">{item.title}</h2>
              <Image className="object-contain h-[150px] w-[300px] rounded-lg" src={`/assets/images/${transformString(item.title)}.jpg`} alt="Feed image" width={300} height={200} />
              <p className="prod_desc">{item.subtitle}</p>
            </div>
          ))}
      </div>
      
    </section>
  )
}

export default Feed
