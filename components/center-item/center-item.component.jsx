import Image from "next/image";
import React from "react";
import styles from './center-item.module.css'

const CenterItem = (props) => {
    const center = props.center

    return (
        <div className={styles.centro}>
            <div>
                <Image src={center.imageName} width={170} height={170} />
                {/* <img src="ci1.jpeg"></img> */}
            </div>
            <h2>{center.designation}</h2>
            {/* <ul>
                <li>Autarquias e Governação Local</li>
                <li>Democracia e Governação</li>
                <li>A corrupção em Questão</li>
                <li>Seminário de Capacitação sobre Corrupção</li>
                <li>Seminário de Formação sobre Autarquias</li>
            </ul>
            <button type="button"><a href="listagem_projectos.html"> Ver mais</a></button> */}
        </div>
    )
}

export default CenterItem