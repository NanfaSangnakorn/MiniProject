// import '../styles/data.css';

import styles from "../styles/data.module.css";
import { useState } from "react";
import DataHeader from "../components/DataHeader";
import Image from "../components/Image";
import ImagePost from "../components/ImagePost";
import photos from "./photos";


function data() {
   const [selectphoto,setselectphoto] = useState(photos[0]);
  const toElements = photos.map((to, index) => {
    return <Image key={index} to={to} />;
  });

  let photoPost = null;

  if (!!selectphoto) {

    photoPost = <photos/>
    

  }
    return (
      //   <div className = { styles.data-grid }>
      <div className={styles.data}>
        <DataHeader />
        <div className={styles.data2}>{toElements}</div>
      </div>
    );
}
export default data;
