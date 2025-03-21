import React, { useEffect, useState } from 'react'

import ButtonDefault from '../components/components/ButtonDefault'
import Header from '../components/Header'
import RapportCard from '../components/card/RapportCard'

import Loading from '../components/components/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { deleteRapportToStore } from '../reducers/rapport'

import { useRouter } from 'next/router';

function AllReportsPage() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [rapports, setRapports] = useState([]); // Etat pour afficher tous les rapports
  const [loading, setLoading] = useState(true)

  const userInStore = useSelector((state) => state.users.value);

  useEffect(() => {

    dispatch(deleteRapportToStore()); // Supprimer le rapport du store à chaque changement de userInStore

    if (Object.keys(userInStore).length === 0) {
      router.push('/'); // Rediriger vers la page d'accueil si userInStore est vide
    } else if (userInStore.hasOwnProperty('isAdmin')) {
      if (userInStore.isAdmin) {
        getRapports(); // Si l'utilisateur est admin, récupérer les rapports
      } else {
        router.push('/nouveau-rapport'); // Sinon, rediriger vers la page de nouveau rapport
      }
    } else {
      router.push('/'); // Rediriger vers la page d'accueil si aucune condition n'est remplie
    }
  }, [userInStore]);

  // Fonction pour afficher tous les rapports
  const getRapports = async () => {
    try {
      setLoading(true) // loading

      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/rapports`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const rapports = await response.json()
      setRapports(rapports.data) // stock dans l'état rapports

    } catch (error) {
      alert('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false) // loading false
    }
  }

  // .map pour afficher tous les rapports
  const dataRapports = rapports.map((data, i) => {
    return <RapportCard key={data.token} {...data} />
  })

  return (
    <div>
      <Header btn={false} title="Liste des rapports" />
      <div className="flex flex-col gap-4">
        {loading ?
          (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) :
          dataRapports
        }
      </div>
      <div className="h-[96px]"></div>
      <div className="fixed bottom-0 left-0 right-0 h-[80px] bg-fixed-contain-bg-grey flex flex-col justify-center items-center shadow-[0px_0px_8px_5px_rgba(0,0,0,0.1)]">
        <div className="w-[95vw]">
          <ButtonDefault variant="addAdmin" size="addAdmin" text="Créer un nouveau rapport" destination="/nouveau-rapport" />
        </div>
      </div>
    </div>
  )
}

export default AllReportsPage