import { useState, useEffect } from 'react';

import Header from './Header'
import Card from './Card'

function Listing() {


  const [rapports, setRapports] = useState([]); // Etat pour afficher tous les rapports

  useEffect(() => {
    getRapports(); // Fonction pour afficher tous les rapports
  }, [])

  // Fonction pour afficher tous les rapports
  const getRapports = async () => {
    try {
      const response = await fetch('http://localhost:3000/rapports')
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json()
      setRapports(data.data)

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
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

export default Listing;
