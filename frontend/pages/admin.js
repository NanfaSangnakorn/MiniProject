import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Plant.module.css";
import Link from "next/link";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/plants";

const admin = ({ token }) => {
    const [user, setUser] = useState({});

    const [plants, setPlants] = useState("");
    const [name, setName] = useState("");
    const [sciename, setSciename] = useState("");
    const [family, setFamily] = useState("");
    const [kingdom, setKingdom] = useState("");
    const [plantstyle, setPlantstyle] = useState("");


    useEffect(() => {
        getPlants();
        profileUser();
        getPlantstById();
    }, []);
    const profileUser = async() => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Plant ${token}` },
            });
            // console.log('user: ', users.data)
            setUser(users.data);
        } catch (e) {
            console.log(e);
        }
    };
    const getPlantstById = async(id) => {
        let result = await axios.get(`${URL}/${id}`);
        console.log(result.data);
        setPlants(result.data);
    };


    const getPlants = async() => {
        let result = await axios.get(URL);
        setPlants(result.data);
    };

    const addPlant = async() => {
        let result = await axios.post(URL, {
            name,
            sciename,
            family,
            kingdom,
            plantstyle,
        });
        console.log(result);
        getPlants();
    };

    const deletePlant = async(id) => {
        let result = await axios.delete(`${URL}/${id}`);
        getPlants();
    };

    const updatePlant = async(id) => {
        let result = await axios.put(`${URL}/${id}`, {
            name,
            sciename,
            family,
            kingdom,
            plantstyle,
        });
        console.log(result);
        getPlants();
    };

    const showPlants = () => {
        if (plants && plants.length) {
            return plants.map((item, index) => {
                return (

                <div className = { styles.listItem }key = { index } >
                <b> Name: </b> {item.name} <br/>
                <b> Scientific name: </b> {item.sciename} <br/>
                <b> Plant Family: </b> {item.family} <br/>
                <b> Plant Kingdom: </b> {item.kingdom}{" "}
                <b> Plant Family: </b> {item.family} <br/>
                <b> Plant Family: </b> {item.family} <br/>
                <b> Plant Family: </b> {item.family} <br/>
                <b> Style: </b> {item.plantstyle} <br/>
                <div className = { styles.edit_button } >
                <button className = { styles.button_get }onClick = {() => getPlantById(item.id)} >Get { " " } </button>
                <button className={styles.button_update} onClick={() => updatePlant(item.id)} >Update {" "} </button>
                <button className = { styles.button_delete }onClick = {() => deletePlant(item.id)} >Delete { " " } </button> 
                </div> 
                </div>
                );
            });
        } else {
            return <p> Loading... </p>;
        }
    };
    return (
        <div className = { styles.container } ><Navbar/>
            <h1> Plant </h1>
                <div className = { styles.form_add } >
            <h2> Add Plants </h2>
        Name:
        <input
            type="text"
            name = "name"
            onChange = {(e) => setName(e.target.value)} >
                </input>
                
        Scientific name:
        <input
            type="text"
            name = "sciename"
            onChange = {(e) => setSciename(e.target.value)} >
                </input>
                
        Plant Family:
        <input
            type="text"
            name = "family"
            onChange = {(e) => setFamily(e.target.value)} >
                </input>
                
        Plant Kingdom:
        <input
            type="number"
            name = "kingdom"
            onChange = {(e) => setKingdom(e.target.value) } >
        </input>

        Style:
         <input
            type="number"
            name = "plantstyle"
            onChange = {(e) => setPlantstyle(e.target.value)} >
                </input>
                
        <button className = { styles.button_add }onClick = {() => addPlant(name, sciename, family, kingdom, plantstyle)} >
                    Add
         </button>
                </div>
         <div className = { styles.list } > { showPlants() } </div> 
         </div >
    );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}