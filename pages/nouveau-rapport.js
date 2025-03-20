import NewReport from '../components/report/NewReport';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ButtonDefault from '../components/components/ButtonDefault';

function NewReportPage() {
    const [isEdible, setIsEdible] = useState(false);
    const userInStore = useSelector((state) => state.users.value);
    
    const handleIsEdible = () => setIsEdible(true);
    console.log("isEdible", isEdible)

    return userInStore.isAdmin || isEdible ? (
        <NewReport setIsEdible={setIsEdible} isEdible={isEdible}/>
    ) : (
        <div className="w-full h-screen flex justify-center items-center">
            <ButtonDefault onClick={handleIsEdible} variant="addAdmin" size="add" text="Créer un nouveau rapport" />
        </div>
    );
}

export default NewReportPage