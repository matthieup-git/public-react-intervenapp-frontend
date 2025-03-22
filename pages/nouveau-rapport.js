import { useState, useEffect } from 'react';

import { useAlert } from "../components/provider/AlertProvider"

import { useSelector } from 'react-redux';

import NewReport from '../components/report/NewReport';

import ButtonDefault from '../components/components/ButtonDefault';

import AlertComponent from "../components/alert/AlertComponent"

function NewReportPage() {

    const userInStore = useSelector((state) => state.users.value);

    const [isEdible, setIsEdible] = useState(false);
    
    const { alertIsVisible, isFadingOut, handleReportSuccess } = useAlert();

    const handleIsEdible = () => {
        setIsEdible(true);
    }

    return userInStore.isAdmin || isEdible ? (
        <NewReport setIsEdible={setIsEdible} onReportSuccess={handleReportSuccess} />
    ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
            {alertIsVisible && <AlertComponent text="Votre rapport a été créé avec succès." success={true} alertIsVisible={alertIsVisible} isFadingOut={isFadingOut} />}
            <ButtonDefault onClick={handleIsEdible} variant="addAdmin" size="addAdmin" text="Créer un nouveau rapport" />
        </div>
    );
}

export default NewReportPage