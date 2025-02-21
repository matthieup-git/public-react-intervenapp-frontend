import React from 'react'

import styles from '../styles/BtnAdd.module.css'

import {useRouter } from 'next/router'

function BtnAdd() {

  const router = useRouter();

  const handleClickToNewRapport = () => {
    router.push('/nouveau-rapport')
  }

  return (
    <button className={styles.add} onClick={handleClickToNewRapport}>Créer un nouveau rapport</button>
  )
}

export default BtnAdd