import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Pet.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/pets";

const admin = ({ token }) => {
  const [user, setUser] = useState({});

  const [pets, setmyPets] = useState("");
  const [name, setName] = useState("");
  const [type, settype] = useState("");
  const [mystyle, setmystyle] = useState("");
  const [zone, setzone] = useState("");

  const [pet, setmyPet] = useState({});
  useEffect(() => {
    getPets();
    profileUser();
  }, []);
  const profileUser = async () => {
    try {
      // console.log('token: ', token)
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Pet ${token}` },
      });
      // console.log('user: ', users.data)
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getPetsById = async (id) => {
    let result = await axios.get(`${URL}/${id}`);
    console.log(result.data);
    setmyPet(result.data);
  };

  const getPets = async () => {
    let result = await axios.get(URL);
    setmyPets(result.data.list);
  };

  const addPets = async () => {
    let result = await axios.post(URL, {
      name,
      type,
      mystyle,
      zone,
    });
    console.log(result);
    getPets();
  };

  const deletePets = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getPets();
  };

  const updatePets = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      name,
      type,
      mystyle,
      zone,
    });
    console.log(result);
    getPets();
  };

  const showPets = () => {
    if (pets && pets.length) {
      return pets.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <b> Name: </b> {item.name} <br />
            <b> Type: </b> {item.type} <br />
            <b> Style: </b> {item.mystyle} <br />
            <b> Zone: </b> {item.zone} <br />
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getPetsById(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updatePets(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deletePets(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <br />
      <br/>
      <div className={styles.form_add}>
        <br />
        <h2> Add Pets </h2>
        <br />
        <h4>ชื่อ :</h4>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
       <h4> ประเภท :</h4>
        <input
          type="text"
          name="type"
          onChange={(e) => settype(e.target.value)}
        ></input>
        <h4>ลักษณะ : </h4>
        <input
          type="text"
          name="mystyle"
          onChange={(e) => setmystyle(e.target.value)}
        ></input>
       <h4> บริเวณที่พบ : </h4>
        <input
          type="text"
          name="zone"
          onChange={(e) => setzone(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addPets(name, type, mystyle, zone)}
        >
          บันทึกข้อมูล
        </button>
      </div>
      <div className={styles.list}> {showPets()} </div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
