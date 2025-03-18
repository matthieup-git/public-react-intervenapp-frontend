import React from 'react'

import Listing from '../components/Listing'
import ButtonDefault from '../components/ButtonDefault'
import Header from '../components/Header'

import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteRapportToStore } from '../reducers/rapport'

import NotFoundPage from './page-non-trouvee'

function AllRapports() {

  const dispatch = useDispatch();

  const userInStore = useSelector((state) => state.users.value);

  useEffect(() => {
    if (!userInStore.isAdmin) {
      return <NotFoundPage />
    }
    dispatch(deleteRapportToStore())
  }, [])

  return (
    <div>
      <Header btn={false} title="Liste des rapports" />
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