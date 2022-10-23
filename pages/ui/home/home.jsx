import React from "react";
import Header from '../../../components/header/header.component'
import styles from './home.module.css'
import uniucan1 from '../../../public/img/uniucan1.jpg'
import Image from "next/image";
import Footer from "../../../components/footer/footer.component";

function Home() {
  return (
    <div style={
      { backgroundImage: `url(${uniucan1.src})`,
       backgroundRepeat: 'no-repeat' ,
       backgroundColor: 'white',
       width: '100%', height: '100%'}}
      className={styles.body}>
      <Header />
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
          <div className={styles.centro}>
            <div>
              <Image src="/img/ci1.jpeg" width={170} height={170} />
              {/* <img src="ci1.jpeg"></img> */}
            </div>
            <h2>LAB UCAN</h2>
            <ul>
              <li>Autarquias e Governação Local</li>
              <li>Democracia e Governação</li>
              <li>A corrupção em Questão</li>
              <li>Seminário de Capacitação sobre Corrupção</li>
              <li>Seminário de Formação sobre Autarquias</li>

            </ul>
            <button type="button"><a href="listagem_projectos.html"> Ver mais</a></button>
          </div>
          <div className={styles.centro}>
            <div><Image src="/img/ci2.jpeg" width={170} height={170} /></div>
            {/* <img src="ci2.jpeg" /></div> */}
            <h2>CIEI</h2>
            <ul>
              <li>Nenhum</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button type="button">Ver mais</button>
          </div>
          <div className={styles.centro}>
            <div>
              <Image src="/img/ci3.jpeg" width={170} height={170} />
              {/* <img src="ci3.jpeg" /> */}
            </div>
            <h2>CEA UCAN</h2>
            <ul>
              <li>Nenhum</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button type="button">Ver mais</button>
          </div>
          <div className={styles.centro}>
            <div>
              <Image src="/img/ci4.jpeg" width={170} height={170} />
              {/* <img src="ci4.jpeg" /> */}
            </div>
            <h2>CEIC</h2>
            <ul>
              <li>Nenhum</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button type="button">Ver mais</button>
          </div>
          <div className={styles.centro}>
            <div>
              <Image src="/img/ci5.jpeg" width={170} height={170} />
              {/* <img src="ci5.jpeg" /> */}
            </div>
            <h2>CISI UCAN</h2>
            <ul>
              <li>Nenhum</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button type="button">Ver mais</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

