import RapportCardDetails from '../components/card/RapportCardDetails';
import EditReport from '../components/report/EditReport';

import { useAlert } from '../components/provider/AlertProvider';

import AlertComponent from '../components/alert/AlertComponent';

import Header from '../components/Header';

import { useState } from 'react';

function EditReportPage() {

    const [isModified, setIsModified] = useState(false);

    const { alertIsVisible, isFadingOut, handleReportSuccess } = useAlert();

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
                    <RapportCardDetails onModifyChange={handleModifyChange} alertIsVisible={alertIsVisible}/>
                    {alertIsVisible && <AlertComponent text="Vos modifications ont été enregistrées avec succès." success={true} alertIsVisible={alertIsVisible} isFadingOut={isFadingOut} />}
                </>
            )}
        </div>
    );
}

export default EditReportPage;