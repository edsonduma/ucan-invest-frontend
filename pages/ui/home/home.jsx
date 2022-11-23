import React, { useEffect, useState } from "react";
import Header from '../../../components/header/header.component'
import styles from './home.module.css'
import uniucan1 from '../../../public/img/uniucan1.jpg'
import Footer from "../../../components/footer/footer.component";
import { getCookieFromBrowser } from "../../../utils/cookie";
import ListCenters from "../../../components/list-centers/list-centers.component";
import MyAppBar from "../../../components/_my-app-bar";

function Home() {

  const [centers, setCenters] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigationCenters`, {
      headers: {
        "Authorization": getCookieFromBrowser('token')
      }
    })
      .then(res => res.json())
      .then(data => {
        setCenters(data)
      })
  }, [])
  return (
    <div style={
      {
        backgroundImage: `url(${uniucan1.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        width: '100%', height: '100%'
      }}
      className={styles.body}>
      {/* <Header /> */}
      <MyAppBar />
      <div className={styles.info}>
        <h1 className={styles.titulo}>Portal de Divulgação dos Projectos da UCAN - UCANIC</h1>
        <div className={styles.texto}>
          <p>
            Seja bem-vindo(a) ao Portal UCANIC e encontre projectos desenvolvidos pelos centros de investigações e estudantes. Os projectos divulgados não só envolvem
            investigadores internos como também abrangem colaboradores externos a universidade. Dentre os tipos de projectos disponiveis no portal temos:
            projectos de licenciatura, mestrado, doutoramento e de ambito ciêntifico (centros de investigações).
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <h2 className={styles.titulo2}>Centros de Investigacões</h2>
        <div className={styles.container_centros}>
          <ListCenters centers={centers} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

