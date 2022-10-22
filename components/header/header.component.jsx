import { height } from "@mui/system";
import Image from "next/image";
import React from "react";

import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Image className={`${styles.header} img`} src="/ucan.png" width={630} height={170} />
			<ul className={styles.menu}>
				<li>home</li>
				<li>centros</li>
				<li>sobre</li>
				<li>configurações</li>
				<li>iniciar sessão</li>
			</ul>
    </header>
  )
}

export default Header


{/* <header>
			<img src="ucan.png" alt=""/>
			<ul class="menu">
				<li>home</li>
				<li>centros</li>
				<li>sobre</li>
				<li>configurações</li>
				<li>iniciar sessão</li>
			</ul>
		</header> */}