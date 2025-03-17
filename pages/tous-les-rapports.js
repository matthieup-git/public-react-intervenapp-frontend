import React from 'react'

import Listing from '../components/Listing'
import ButtonDefault from '../components/ButtonDefault'
import Header from '../components/Header'

import { useSelector } from 'react-redux'

import NotFoundPage from './page-non-trouvee'


function AllRapports() {

  const userInStore = useSelector((state) => state.users.value)

  if (!userInStore.isAdmin) {
    return <NotFoundPage />
  }

  return (
    <div>
      <Header title="Liste des interventions" />
      <Listing />
      <div className="h-[96px]"></div>
      <div className="fixed bottom-0 left-0 right-0 h-[80px] bg-bg-addRapport flex flex-col justify-center items-center shadow-[4px_4px_6px_2px_rgbargba(218,218,218,1)]">
        <div className="w-[95vw]">
          <ButtonDefault variant="addRapport" size="addRapport" text="Créer un nouveau rapport" destination="/nouveau-rapport" />
        </div>
      </div>
    </div>
  )
}

export default AllRapports