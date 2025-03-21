import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import NewReport from '../components/report/NewReport';

import ButtonDefault from '../components/components/ButtonDefault';

import AlertComponent from "../components/alert/AlertComponent"

function NewReportPage() {

    const userInStore = useSelector((state) => state.users.value);

    const [isEdible, setIsEdible] = useState(false);
    const [alertIsVisible, setAlertIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleIsEdible = () => {
        setIsEdible(true);
    }

    const handleReportSuccess = () => {
        setAlertIsVisible(true)
    }

    useEffect(() => {
        if (alertIsVisible) {
            const timer = setTimeout(() => {
                setIsFadingOut(true)
                setTimeout(() => {
                    setAlertIsVisible(false);
                    setIsFadingOut(false);
                }, 500)
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alertIsVisible]);

    return userInStore.isAdmin || isEdible ? (
        <NewReport setIsEdible={setIsEdible} onReportSuccess={handleReportSuccess} />
    ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
            {alertIsVisible && <AlertComponent success={true} alertIsVisible={alertIsVisible} isFadingOut={isFadingOut} />}
            <ButtonDefault onClick={handleIsEdible} variant="addAdmin" size="addAdmin" text="Créer un nouveau rapport" />
        </div>
    );
}

export default NewReportPage