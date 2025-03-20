import RapportCardDetails from '../components/card/RapportCardDetails';
import RapportCardModified from '../components/card/RapportCardModified';

import Header from '../components/Header';

import { useState } from 'react';

function toModify() {

    const [isModified, setIsModified] = useState(false);

    const handleModifyChange = (newIsModified) => {
        setIsModified(newIsModified);
    };

    return (
        <div className="flex flex-col">
            <Header btn={true} onModifyChange={handleModifyChange} isModified={isModified} />
            {isModified ? (
                <RapportCardModified />
            ) : (
                <RapportCardDetails onModifyChange={handleModifyChange} />
            )}
        </div>
    );
}

export default toModify;