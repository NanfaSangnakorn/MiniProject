import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Plant.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/pets";

const admin = ({ token }) => {
    const [user, setUser] = useState({});

    const [pets, setmyPets] = useState("");
    const [name, setName] = useState("");
    const [type, settype] = useState("");
    const [mystyle, setmystyle ]= useState("");
    const [zone, setzone] = useState("");
   

    useEffect(() => {
        getPets();
        profileUser();
        getPetstById();
    }, []);
    const profileUser = async() => {
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
    const getPetstById = async(id) => {
        let result = await axios.get(`${URL}/${id}`);
        console.log(result.data);
        setmyPets(result.data);
    };


    const getPets = async() => {
        let result = await axios.get(URL);
        setmyPets(result.data);
    };

    const addPets = async() => {
        let result = await axios.post(URL, {
            name,
            type,
            mystyle,
            zone,
        });
        console.log(result);
        getPets();
    };

    const deletePets = async(id) => {
        let result = await axios.delete(`${URL}/${id}`);
        getPets();
    };

    const updatePets = async(id) => {
        let result = await axios.put(`${URL}/${id}`, {
           name,
            type,
            mystyle,
            zone,
        });
        console.log(result);
        getPets();
    };

    const showPets= () => {
        if (pets && pets.length) {
            return pets.map((item, index) => {
                return (

                <div className = { styles.listItem }key = { index } >
                <b> Name: </b> {item.name} <br/>
                <b> Type: </b> {item.type} <br/>
                <b> Style: </b> {item.mystyle} <br/>
                <b> Zone: </b> {item.zone} <br/>
                
                <div className = { styles.edit_button } >
                <button className = { styles.button_get }onClick = {() => getPetsById(item.id)} >Get  </button>
                <button className={styles.button_update} onClick={() => updatePets(item.id)} >Update </button>
                <button className = { styles.button_delete }onClick = {() => deletePets(item.id)} >Delete </button> 
                </div> 
                </div>
                );
            });
        } 
    };
    return (
        <div className = { styles.container } ><Navbar/>
            <h1> Pets </h1>
                <div className = { styles.form_add } >
            <h2> Add Pets </h2>
       ชื่อ:
        <input
            type="text"
            name = "name"
            onChange = {(e) => setName(e.target.value)} >
                </input>
                
        ประเภท:
        <input
            type="text"
            name = "type"
            onChange = {(e) => settype(e.target.value)} >
                </input>
                
        ลักษณะ:
        <input
            type="text"
            name = "mystyle"
            onChange = {(e) => setmystyle(e.target.value)} >
                </input>
                
       บริเวณที่พบ:
        <input
            type="number"
            name = "zone"
            onChange = {(e) => setzone(e.target.value) } >
        </input>

        
                
        <button className = { styles.button_add }onClick = {() => addPets(name, type,mystyle,zone)} >
                    บันทึกข้อมูล
         </button>
                </div>
         <div className = { styles.list } > { showPets() } </div> 
         </div >
    );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}