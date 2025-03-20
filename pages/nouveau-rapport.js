import NewRapport from '../components/NewRapport';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ButtonDefault from '../components/components/ButtonDefault';

function NewRapportPage() {

    const [isEdible, setIsEdible] = useState(false)
    const userInStore = useSelector((state) => state.users.value);

    useEffect(() => {
        setIsEdible(false)
    }, [])

    const handleIsEdible = () => {
        setIsEdible(true)
    }

    if (userInStore.isAdmin) {
        return <NewRapport setIsEdible={setIsEdible} />
    }

    return (
        isEdible ? (
            <NewRapport setIsEdible={setIsEdible} />
        ) : (
            <div className="w-full h-screen flex justify-center items-center">
                <ButtonDefault onClick={handleIsEdible} variant="addAdmin" size="add" text="Créer un nouveau rapport" />
            </div>
        )
    )
}

export default NewRapportPage