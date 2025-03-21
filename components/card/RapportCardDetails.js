import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';

import { Card } from "../../src/components/components/ui/card"

import ButtonDefault from "../components/ButtonDefault"
import SwitchStatus from '../components/SwitchStatus';

import moment from 'moment';
import 'moment/locale/fr';

function RapportCardDetails({ onModifyChange }) {

    useEffect(() => {
        const rapportInStore = useSelector((state) => state.rapport.value);
        const [isDone, setIsDone] = useState(rapportInStore.isDone);
    }, [])

    const formattedDate = rapportInStore.date ? moment(rapportInStore.date).locale('fr').format('DD MMMM YYYY') : '';

    const toModify = () => {
        if (onModifyChange) {
            onModifyChange(true);
        }
    };

    const displayText = rapportInStore.description.replace(/\n/g, '<br>');

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Rapport #{rapportInStore.countDocument}</h1>
                <ButtonDefault onClick={toModify} text="Modifier" variant="modify" size="modify" />
            </div>

            <div className="flex flex-col justify-center gap-2">
                <span className="font-bold text-lg">Statut</span>
                <div className="flex gap-2 items-center">
                    <div>Non traité</div>
                    <SwitchStatus isDone={isDone} setIsDone={setIsDone} token={rapportInStore.token} />
                    <div >Traité</div>
                </div>
                Crée par : {rapportInStore.createdBy?.firstname} {rapportInStore.createdBy?.lastname}
            </div>

            <Card className="grid min-h-[350px] gap-4">
                <div className="flex">
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">Type</span>
                        <span className="font-semibold">{rapportInStore.type === 'facture' ? 'Facture' : 'Devis'}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">Date d'intervention</span>
                        <span className="font-semibold">{formattedDate}</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">Client</span>
                        <span className="font-semibold">{rapportInStore.clientName}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">Localisation</span>
                        <span className="font-semibold">{rapportInStore.addressOrPlaceOfRepair}</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">Equipement</span>
                        <span className="font-semibold">{rapportInStore.equipmentRepaired}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">N° de série</span>
                        <span className="font-semibold">{rapportInStore.serialNumber}</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">Heures</span>
                        <span className="font-semibold">{rapportInStore.equipmentHours}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-text-span">Prix</span>
                        <span className="font-semibold">{rapportInStore.price === 0 ? 'Prix à définir' : rapportInStore.price + ' €'}</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col">
                        <span className="text-text-span">Description</span>
                        <p className="font-semibold" dangerouslySetInnerHTML={{ __html: displayText }} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default RapportCardDetails;