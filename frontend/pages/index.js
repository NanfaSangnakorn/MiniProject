import Head from "next/head";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home({ token }) {
  return (
    <Layout>
      <Head className={styles.data4}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <title>ยินดีต้อนรับสู่โลกของเพื่อนสี่ขา</title>
        <br />
        <br />
      </Head>
      <div className={styles.container}>
        <Navbar />
        <br />
        <br />
        <br />
        <h1>▁ ▂ ▄ ▅ ▆ ▇ █ ยินดีต้อนรับสู่โลกของเพื่อนสี่ขา █ ▇ ▆ ▅ ▄ ▂ ▁</h1>
        <br />
        <br />
        <br/>
        <img src="https://contactnumbersuk.com/wp-content/uploads/2020/08/%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%81%E0%B8%A1%E0%B8%A7%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B1%E0%B8%99-%E0%B9%80%E0%B8%AB%E0%B8%95%E0%B8%B8%E0%B8%9C%E0%B8%A5%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%AD%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B8%A2.jpg" />
        <br />
        <br />
      
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token"))
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
