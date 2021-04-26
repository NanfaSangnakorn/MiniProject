import useSWR, { mutate } from "swr";
import React, { useState, useEffect } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/pets";
const URL_BUY = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div> failed to load </div>;
  if (!data) return <div> Loading... </div>;
  console.log("data", data);

  const showPets = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div>
              
              <b> ชื่อ : </b> {item.name}
            </div>
            <div>
              
              <b> ประเภท : </b> {item.type}
            </div>
            <div>
              
              <b> ลักษณะ : </b> {item.mystyle}
            </div>
            <div>
             
              <b> บริเวณที่พบ : </b> {item.zone}
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.title}> Pets </div>
      <div className={styles.list}> {showPets()} </div>
    </div>
  );
};
export default index;
