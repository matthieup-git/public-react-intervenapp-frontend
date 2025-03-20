import RapportCardDetails from '../components/card/RapportCardDetails';
import EditReport from '../components/report/EditReport';

import Header from '../components/Header';

import { useState } from 'react';

function EditReportPage() {

    const [isModified, setIsModified] = useState(false);

    const handleModifyChange = (newIsModified) => {
        setIsModified(newIsModified);
    };

    return (
        <div className="flex flex-col">
            <Header btn={true} onModifyChange={handleModifyChange} isModified={isModified} />
            {isModified ? (
                <EditReport />
            ) : (
                <RapportCardDetails onModifyChange={handleModifyChange} />
            )}
        </div>
    );
}

export default EditReportPage;