import ReportCardDetails from '../components/card/ReportCardDetails';
import EditReport from '../components/report/EditReport';

import { useAlert } from '../components/provider/AlertProvider';

import AlertComponent from '../components/alert/AlertComponent';

import Header from '../components/Header';

import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

function EditReportPage() {
    
    const router = useRouter();
    const userInStore = useSelector((state) => state.users.value);

    const [isModified, setIsModified] = useState(false);
    const { alertIsVisible, isFadingOut, handleReportSuccess } = useAlert();

    useEffect(() => {
        if (Object.keys(userInStore).length === 0 || userInStore.isAdmin === false) {
        router.push('/'); // Rediriger vers la page d'accueil si userInStore est vide
        } 
      }, [userInStore]);

    const handleModifyChange = (newIsModified) => {
        setIsModified(newIsModified);
    };

    return (
        <div className="flex flex-col">
            <Header btn={true} onModifyChange={handleModifyChange} isModified={isModified} />
            {isModified ? (
                <EditReport onModifyChange={handleModifyChange} onReportSuccess={handleReportSuccess} />
            ) : (
                <>
                    <ReportCardDetails onModifyChange={handleModifyChange} alertIsVisible={alertIsVisible}/>
                    {alertIsVisible && <AlertComponent text="Vos modifications ont été enregistrées avec succès." success={true} alertIsVisible={alertIsVisible} isFadingOut={isFadingOut} />}
                </>
            )}
        </div>
    );
}

export default EditReportPage;