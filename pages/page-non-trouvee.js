import React from 'react'

import ButtonDefault from '../components/ButtonDefault';

import { useSelector } from 'react-redux';

function NotFoundPage() {

  const userInStore = useSelector((state) => state.users.value)

  return (
    <div>
      <div className="text-center">Page Non trouvée</div>
      {userInStore.isAdmin ? <ButtonDefault text="Retour" destination="/tous-les-rapports" /> : <ButtonDefault text="Retour" destination="/nouveau-rapport" />}
    </div>
  )
}

export default NotFoundPage