import { useState, useEffect } from 'react';

import Header from './Header'
import Card from './Card'

import styles from '../styles/Home.module.css';

function Home() {


  const [rapports, setRapports] = useState([]); // Etat pour afficher tous les rapport

  useEffect(() => {
    getRapports(); // Fonction pour afficher tous les rapports
  }, [])

  // Fonction pour afficher tous les rapports
  const getRapports = () => {
    fetch('http://localhost:3000/rapports')
      .then(response => response.json())
      .then(data => {
        setRapports(data.data)
      })
  }

  // .map pour afficher tous les rapports
  const dataRapports = rapports.map((data, i) => {
    return <Card key={i} {...data} />
  })

  return (
    <div className='container'>
      <Header title="Liste des interventions" />
      {dataRapports}
    </div>
  );
}

export default Home;
