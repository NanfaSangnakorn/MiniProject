
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
      <div className={styles.gridContainer}>
        <div className={styles.text}>Username :</div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.text}>Email :</div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.text}>Password :</div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    );


    return (
      <Layout>
        <Head>
          <title>Register</title>
        </Head>
        <div className={styles.container}>
          <Navbar />
          <br />
          <br />
          <br />
          <br />
                <br />
                <br/>
                <br />
                <br/>
          <img
            src="https://www.flaticon.com/svg/vstatic/svg/3456/3456400.svg?token=exp=1619433715~hmac=79a119fb0ebb7c7c60d7e55257483df7"
            width="120px"
            height="120px"
                />
                <br/>
          <h2>Register</h2>
                <br />
                <h5> Status: {status}</h5>
          <br />
          <div className={styles.content}>{registerForm()}</div>
          <div>
            <button onClick={register}>Register</button>
          </div>
        </div>
      </Layout>
    );
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
