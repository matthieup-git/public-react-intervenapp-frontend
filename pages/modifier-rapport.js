import CardToModify from '../components/CardToModify';
import CardIsModified from '../components/CardIsModified';

import { useState } from 'react';

function toModify() {

    const [isModified, setIsModified] = useState(false);

    const handleModifyChange = (newIsModified) => {
        setIsModified(newIsModified);
    };

    return (
        <div className="w-[95vw] m-auto flex flex-col gap-8">
            {isModified ? (
                <div>
                    <CardIsModified />
                </div>
            ) : (
                <div>
                    <CardToModify onModifyChange={handleModifyChange} />
                </div>
            )}
        </div>
    );
}

export default toModify;