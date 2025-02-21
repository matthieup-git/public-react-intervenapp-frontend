import React from 'react'

import styles from '../styles/AllRapports.module.css'

import Listing from '../components/Listing'
import BtnAdd from '../components/BtnAdd'

function AllRapports() {
  return (
    <>
      <Listing />
      <div className={styles.containerBtn}>
        <BtnAdd />
      </div>
    </>
  )
}

export default AllRapports