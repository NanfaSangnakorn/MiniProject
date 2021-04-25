// import '../styles/data.css';

import styles from "../styles/data.module.css";
import { useState } from "react";
import AppHeader from "../components/AppHeader";
import TattooItem from "../components/TattooItem";
import TattooPost from "../components/TattooPost";
import tattoos from "./tattoos";
import Navbar from "../components/navbar";

function data() {
  const [searchText, setsearchText] = useState("");

  function onTattooOpenCilck(theTattoo) {
    setselectedTattoo(theTattoo);
  }

  function onTattooColseCilck() {
    setselectedTattoo(null);
  }

  const [selectedTattoo, setselectedTattoo] = useState(null);
  const filteredTattoos = tattoos.filter((tattons) => {
    return tattons.title.includes(searchText);
  });
  const tattooElements = filteredTattoos.map((tattoos, index) => {
    return (
      <TattooItem
        key={index}
        tattoos={tattoos}
        onTattooCilck={onTattooOpenCilck}
      />
    );
  });

  let tattooPost = null;
  if (!!selectedTattoo) {
    tattooPost = (
      <TattooPost tattoos={selectedTattoo} onBgCilck={onTattooColseCilck} />
    );
  }
  return (
    <div className={styles.data}>
      <br />
      <br />
      <br />
      <br />
      <AppHeader />
      <section className="datasection">
        <div className="datacontainer">
          <div className={styles.datasearch}>
            <input
              className={styles.datasearchinput}
              type="text"
              placeholder="ค้นหา"
              value={searchText}
              onChange={(event) => {
                setsearchText(event.target.value);
              }}
            />
          </div>
        </div>
      </section>

      <div className={styles.container} />
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.data2}>{tattooElements}</div>
      {tattooPost}
    </div>
  );
}
export default data;
