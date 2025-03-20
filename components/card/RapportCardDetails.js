import { useSelector } from 'react-redux';

import { useState } from 'react';

import { Card } from "../../src/components/components/ui/card"

import ButtonDefault from "../components/ButtonDefault"
import SwitchStatus from '../components/SwitchStatus';

import moment from 'moment';
import 'moment/locale/fr';

function RapportCardDetails({ onModifyChange }) {

    const rapportInStore = useSelector((state) => state.rapport.value);
    const [isDone, setIsDone] = useState(rapportInStore.isDone);

    const formattedDate = rapportInStore.date ? moment(rapportInStore.date).locale('fr').format('DD MMMM YYYY - HH:mm') : '';

    const toModify = () => {
        if (onModifyChange) {
            onModifyChange(true);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <span className="font-bold text-2xl">Rapport #{rapportInStore.countDocument}</span>
                <ButtonDefault onClick={toModify} text="Modifier" variant="modify" size="modify" />
            </div>

            <div className="flex flex-col justify-center gap-2">
                <span className="font-bold">Statut</span>
                <div className="flex gap-2 items-center">
                    <div>Non traité</div>
                    <SwitchStatus isDone={isDone} setIsDone={setIsDone} token={rapportInStore.token} />
                    <div >Traité</div>
                </div>
                Crée par : {rapportInStore.createdBy?.firstname} {rapportInStore.createdBy?.lastname}
            </div>

            <Card className="grid grid-rows-[3fr_1fr] grid-cols-[1fr_1fr] min-h-[350px]">
                <div className="flex flex-col row-start-1 row-end-2 col-start-1 col-end-2 gap-3">
                    <div className="flex flex-col">
                        <span className="text-text-span">Type</span>
                        <span className="font-semibold">{rapportInStore.type === 'facture' ? 'Facture' : 'Devis'}</span>
                    </div>
                    {rapportInStore.clientName && <div className="flex flex-col">
                        <span className="text-text-span">Client</span>
                        <span className="font-semibold">{rapportInStore.clientName}</span>
                    </div>}
                    {rapportInStore.equipmentRepaired && <div className="flex flex-col">
                        <span className="text-text-span">Equipement</span>
                        <span className="font-semibold">{rapportInStore.equipmentRepaired}</span>
                    </div>}
                    {rapportInStore.equipmentHours && <div className="flex flex-col">
                        <span className="text-text-span">Heures</span>
                        <span className="font-semibold">{rapportInStore.equipmentHours}</span>
                    </div>}
                </div>
                <div className="flex flex-col row-start-1 row-end-2 col-start-2 col-end-3 gap-3">
                    <div className="flex flex-col">
                        <span className="text-text-span">Date</span>
                        <span className="font-semibold">{formattedDate}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-text-span">Localisation</span>
                        <span className="font-semibold">{rapportInStore.addressOrPlaceOfRepair}</span>
                    </div>
                    {rapportInStore.serialNumber && <div className="flex flex-col">
                        <span className="text-text-span">N° de série</span>
                        <span className="font-semibold">{rapportInStore.serialNumber}</span>
                    </div>}
                    <div className="flex flex-col">
                        <span className="text-text-span">Prix</span>
                        <span className="font-semibold">{rapportInStore.price === 0 ? 'Prix à définir' : rapportInStore.price + ' €'}</span>
                    </div>
                </div>
                <div className="flex flex-col row-start-2 row-end-3 col-start-1 col-end-3">
                    <span className="text-text-span">Description</span>
                    <span className="font-semibold">{rapportInStore.description}</span>
                </div>

            </Card>
        </div>
    )
}

export default RapportCardDetails;