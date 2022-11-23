import Image from "next/image";
import React from "react";
import CenterItem from "../center-item/center-item.component";
// import styles from './list-centers.module.css'

const ListCenters = (props) => {
    const centers = props.centers

    return (
        <div>
            {
                centers.map((center) => (
                    <CenterItem key={center.pkInvestigationCenter} center={center} />
                ))
            }
        </div>
    )
}

export default ListCenters