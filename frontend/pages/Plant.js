import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { useState, useEffect } from "react";
//import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.css";
import Link from 'next/link'
import Navbar from "../components/navbar";
const URL = "http://localhost/api/plants";
const URL_BUY = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = () => {
    const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
    if (error) return <div > failed to load < /div>;
    if (!data) return <div > Loading... < /div>;
    console.log("data", data);

    const buyStudent = async(id) => {
        let result = await axios.post(`${URL_BUY}/${id}`)
        mutate(URL, data);
    }

    const showPlants = () => {
        if (data.list && data.list.length) {
            return data.list.map((item, index) => {
                return ( <
                    div className = { styles.listItem }
                    key = { index } >
                    <
                    div > { " " } <
                    b > Name: < /b> {item.name} < /
                    div > <
                    div > { " " } <
                    b > Scientific name: < /b> {item.scien} < /
                    div > <
                    div > { " " } <
                    b > Plant Kingdom: < /b> {item.kingdom}{" "} < /
                    div > <
                    div > { " " } <
                    b > Plant Family: < / b > { item.kingdom } < /
                    div >
                    div > { " " } <
                    b > Style: < /b> {item.style} < /
                    div > < /b>

                    <
                    div >
                    <
                    button className = { styles.btn }
                    onClick = {
                        () => buyStudent(item.id)
                    } >
                    Buy { " " } <
                    /button> < /
                    div > <
                    /div>
                );
            });
        } else {
            return <p > Loading... < /p>;
        }
    };
    return ( <
        div className = { styles.container } > < Navbar / >
        <
        div className = { styles.title } >
        Students < /div> <
        div className = { styles.list } > { showPlants() } <
        /div>

        <
        /div>
    );
};
export default index;