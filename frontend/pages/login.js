import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [remember, setRemember] = useState(false);
  const login = async (req, res) => {
    try {
      let result = await axios.post(
        `${config.URL}/login`,
        { username, password, remember },
        { withCredentials: true }
      );
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };
  const reMem = async () => {
    setRemember(!remember);
  };

  const loginForm = () => (
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
      <div className={styles.text}>Password :</div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          onClick={reMem}
        />
        <label className={styles.text1}>Remember me</label>
      </div>
    </div>
  );

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <Navbar />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/2250/2250144.svg?token=exp=1619435333~hmac=d922a0e53d9575025c77b5d09618e09e"
          width="120px"
          height="120px"
        />
        <br />
        <h2>Login</h2>

        <br />
        <h5>Status: {status}</h5>
        {loginForm()}
        <div>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
