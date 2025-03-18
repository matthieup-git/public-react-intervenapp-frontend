import styles from '../styles/CardToModify.module.css'

import { useSelector } from 'react-redux';

import { useState } from 'react';

import { Card } from "../src/components/components/ui/card"

import ButtonDefault from "./ButtonDefault"
import SwitchStatus from './SwitchStatus';


import moment from 'moment';
import 'moment/locale/fr';

function CardToModify({ onModifyChange }) {

    const rapport = useSelector((state) => state.rapport?.value);
    const [isDone, setIsDone] = useState(rapport.isDone);

    const formattedDate = rapport?.date ? moment(rapport.date).locale('fr').format('DD MMMM YYYY') : '';

    const toModify = () => {
        if (onModifyChange) {
            onModifyChange(true);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <span className="font-bold text-2xl">Rapport #1</span>
                {/* <button onClick={() => toModify()}>Modifier</button> */}
                <ButtonDefault onClick={toModify} text="Modifier" variant="modify" />
            </div>

            <div className="flex flex-col justify-center gap-2">
                <span className="font-bold">Statut</span>
                <div className="flex gap-2 items-center">
                    <div className={styles.done}>Traité</div>
                    <SwitchStatus isDone={isDone} setIsDone={setIsDone} token={rapport.token} />
                <div className={styles.notDone}>Non traité</div>
                </div>
                Crée par : {rapport?.createdBy?.firstname} {rapport?.createdBy?.lastname}
            </div>

            <Card className="grid grid-rows-[3fr_1fr] grid-cols-[1fr_1fr] min-h-[350px]">
                <div className="flex flex-col row-start-1 row-end-2 col-start-1 col-end-2 gap-3">
                    <div className="flex flex-col">
                        <span className="text-text-span">Type</span>
                        <span className="font-semibold">{rapport.type === 'facture' ? 'Facture' : 'Devis'}</span>
                    </div>
                    {rapport.clientName && <div className="flex flex-col">
                        <span className="text-text-span">Client</span>
                        <span className="font-semibold">{rapport.clientName}</span>
                    </div>}
                    {rapport.equipmentRepaired && <div className="flex flex-col">
                        <span className="text-text-span">Equipement</span>
                        <span className="font-semibold">{rapport.equipmentRepaired}</span>
                    </div>}
                    {rapport.equipmentHours && <div className="flex flex-col">
                        <span className="text-text-span">Heures</span>
                        <span className="font-semibold">{rapport.equipmentHours}</span>
                    </div>}
                </div>
                <div className="flex flex-col row-start-1 row-end-2 col-start-2 col-end-3 gap-3">
                    <div className="flex flex-col">
                        <span className="text-text-span">Date</span>
                        <span className="font-semibold">{formattedDate}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-text-span">Localisation</span>
                        <span className="font-semibold">{rapport.addressOrPlaceOfRepair}</span>
                    </div>
                    {rapport.serialNumber && <div className="flex flex-col">
                        <span className="text-text-span">N° de série</span>
                        <span className="font-semibold">{rapport.serialNumber}</span>
                    </div>}
                    <div className="flex flex-col">
                        <span className="text-text-span">Prix</span>
                        <span className="font-semibold">{rapport.price === 0 ? 'Prix à définir' : rapport.price + ' €'}</span>
                    </div>
                </div>
                <div className="flex flex-col row-start-2 row-end-3 col-start-1 col-end-3">
                    <span className="text-text-span">Description</span>
                    <span className="font-semibold">{rapport.description}</span>
                </div>

            </Card>
        </div>
    )
}

export default CardToModify;