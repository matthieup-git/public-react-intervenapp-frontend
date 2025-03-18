import CardToModify from '../components/CardToModify';
import CardIsModified from '../components/CardIsModified';

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
                <CardIsModified />
            ) : (
                <CardToModify onModifyChange={handleModifyChange} />
            )}
        </div>
    );
}

export default toModify;