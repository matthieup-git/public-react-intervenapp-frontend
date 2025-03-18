import { useState, useEffect } from 'react';

import ListOfCards from './ListOfCards'

import { Loader } from "lucide-react";


function Listing() {

  const [rapports, setRapports] = useState([]); // Etat pour afficher tous les rapports

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRapports();
  }, [])

  // Fonction pour afficher tous les rapports
  const getRapports = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/rapports`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json()
      setRapports(data.data)

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false)
    }
  }

  // .map pour afficher tous les rapports
  const dataRapports = rapports.map((data, i) => {
    return <ListOfCards key={i} {...data} />
  })

  return (
    <div className="flex flex-col gap-8">
      {loading ?
        (
          <div className="flex flex-col items-center">
            <Loader className="animate-spin" />
          </div>
            ) :
            dataRapports 
        }
          </div>
        )
}

      export default Listing;
