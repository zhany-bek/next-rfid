"use client"

import React from 'react'
import FeedItem from './FeedItem'
import Image from 'next/image';

import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  querySnapshot,
  query,
} from "firebase/firestore";
import { db } from "@firebase/config";

const Feed = () => {
  const [items, setItems] = useState([]);
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

  const transformString = (str) => {
    return str.toLowerCase().replace(/\s+/g, '_');
  }

  return (
    <section className='feed'>
      <div className='mt-4 feed_layout'>
      {items.map((item) => (
        <div key={item.id} className="feed_card">
              <h2 className="feed_sm_head_text">{item.id}</h2>
              <Image className="object-contain h-[150px] w-[300px] rounded-lg" src={`/assets/images/${transformString(item.id)}.jpg`} alt="Feed image" width={300} height={200} />
              <p className="prod_desc">{item.description}</p>
            </div>
          ))}
      </div>
      
    </section>
  )
}

export default Feed
