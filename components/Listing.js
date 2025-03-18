import { useState, useEffect } from 'react';

import ListOfCards from './ListOfCards'

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
    return <ListOfCards key={i} {...data} />
  })

  return (
    <div className="flex flex-col gap-8">
      {dataRapports}
    </div>
  )
}

export default Listing;
