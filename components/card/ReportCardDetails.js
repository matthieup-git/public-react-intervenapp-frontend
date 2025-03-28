import { useSelector } from 'react-redux';

import { useState } from 'react';

import { ReportCardDetailsComponent, ReportCardRow, ReportCardColumn, ReportCardTitle, ReportCardContent } from "../../src/components/components/ui/card/card-details"

import ButtonDefault from "../components/ButtonDefault"
import SwitchStatus from '../components/SwitchStatus';

import moment from 'moment';
import 'moment/locale/fr';

function ReportCardDetails({ onModifyChange, alertIsVisible }) {

    const rapportInStore = useSelector((state) => state.rapport.value);
    const description = rapportInStore?.description
    const [isDone, setIsDone] = useState(rapportInStore?.states?.isDone);

    const formattedDate = rapportInStore?.date ? moment(rapportInStore?.date).locale('fr').format('DD MMMM YYYY') : '';

    const toModify = () => {
        if (onModifyChange) {
            onModifyChange(true);
        }
    };

    const displayDescription = description ? description?.replace(/\n/g, '<br>') : ""

    return (
        <div className={`flex flex-col gap-4 lg:w-1/2 lg:m-auto ${alertIsVisible && "after:mb-2"}`}>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Rapport #{rapportInStore?.countDocument}</h1>
                <ButtonDefault onClick={toModify} text="Modifier" variant="modify" size="modify" />
            </div>

            <div className="flex flex-col justify-center gap-2">
                <span className="font-bold text-lg">Statut</span>
                <div className="flex gap-6 items-center">
                    <div>Non traité</div>
                    <SwitchStatus isDone={isDone} setIsDone={setIsDone} token={rapportInStore?.token} />
                    <div >Traité</div>
                </div>
                <p><span className="underline">Créé par :</span> {rapportInStore?.createdBy?.firstname} {rapportInStore?.createdBy?.lastname}</p>
            </div>

            <ReportCardDetailsComponent>
                <ReportCardRow>
                    <ReportCardColumn>
                        <ReportCardTitle>Type</ReportCardTitle>
                        <ReportCardContent>{rapportInStore?.type === 'facture' ? 'Facture' : 'Devis'}</ReportCardContent>
                    </ReportCardColumn>
                    <ReportCardColumn>
                        <ReportCardTitle>Date d'intervention</ReportCardTitle>
                        <ReportCardContent>{formattedDate}</ReportCardContent>
                    </ReportCardColumn>
                </ReportCardRow>
                <ReportCardRow>
                    <ReportCardColumn>
                        <ReportCardTitle>Client</ReportCardTitle>
                        <ReportCardContent>{rapportInStore?.clientName}</ReportCardContent>
                    </ReportCardColumn>
                    <ReportCardColumn className="flex flex-col flex-1">
                        <ReportCardTitle>Localisation</ReportCardTitle>
                        <ReportCardContent>{rapportInStore?.addressOrPlaceOfRepair}</ReportCardContent>
                    </ReportCardColumn>
                </ReportCardRow>
                <ReportCardRow>
                    <ReportCardColumn>
                        <ReportCardTitle>Equipement</ReportCardTitle>
                        <ReportCardContent>{rapportInStore?.equipmentRepaired}</ReportCardContent>
                    </ReportCardColumn>
                    <ReportCardColumn>
                        <ReportCardTitle>N° de série</ReportCardTitle>
                        <ReportCardContent>{rapportInStore?.serialNumber}</ReportCardContent>
                    </ReportCardColumn>
                </ReportCardRow>
                <ReportCardRow>
                    <ReportCardColumn>
                        <ReportCardTitle>Heures</ReportCardTitle>
                        <ReportCardContent>{rapportInStore?.equipmentHours}</ReportCardContent>
                    </ReportCardColumn>
                    <ReportCardColumn>
                        <ReportCardTitle>Prix</ReportCardTitle>
                        <ReportCardContent>{rapportInStore?.price === 0 ? 'Prix à définir' : rapportInStore?.price + ' €'}</ReportCardContent>
                    </ReportCardColumn>
                </ReportCardRow>
                <ReportCardRow>
                    <ReportCardColumn>
                        <ReportCardTitle>Description</ReportCardTitle>
                        <ReportCardContent dangerouslySetInnerHTML={{ __html: displayDescription }} />
                    </ReportCardColumn>
                </ReportCardRow>
            </ReportCardDetailsComponent>
        </div>
    )
}

export default ReportCardDetails;