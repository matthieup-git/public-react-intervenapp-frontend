import styles from '../styles/CardToModify.module.css'

import { deleteRapportToStore } from '../reducers/rapport';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router'

import ButtonDefault from "./ButtonDefault"
import { Card } from "../src/components/components/ui/card"


import moment from 'moment';
import 'moment/locale/fr';

function CardToModify({ onModifyChange }) {

    const dispatch = useDispatch();
    const router = useRouter()

    const rapport = useSelector((state) => state.rapport?.value);

    const formattedDate = rapport?.date ? moment(rapport.date).locale('fr').format('DD MMMM YYYY') : '';

    const returnToHome = () => {
        if (onModifyChange) {
            onModifyChange(false);
        }
        dispatch(deleteRapportToStore());
        router.push('/tous-les-rapports');
    };

    const toModify = () => {
        if (onModifyChange) {
            onModifyChange(true);
        }
    };

    return (
        <div>
            {/* {Object.keys(rapport).length > 0 &&  <>
                {!isModified && <button onClick={() => toModify()}>Modifier</button>}
                {isModified ? <CardIsModified /> : } */}

            <ButtonDefault onClick={returnToHome} text="Retour" />

            {Object.keys(rapport).length > 0 &&

                <div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-2xl">Rapport #1</span>
                        {/* <button onClick={() => toModify()}>Modifier</button> */}
                        <ButtonDefault onClick={toModify} text="Modifier"/>
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="font-bold">Statut</span>
                        {rapport.status ? (
                            <div className={styles.done}>Traité</div>
                        ) : (
                            <div className={styles.notDone}>Non traité</div>
                        )}
                        Crée par : {rapport.createdBy?.firstname} {rapport.createdBy?.lastname}
                    </div>

                    <Card className=" grid grid-rows-[3fr_1fr] grid-cols-[1fr_1fr]">
                        <div className="flex flex-col row-start-1 row-end-2 col-start-1 col-end-2 gap-3">
                            <div className="flex flex-col">
                                <span className="text-text-span">Type</span>
                                <span className="font-semibold">{rapport.type === 'facture' ? 'Facture' : 'Devis'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-text-span">Client</span>
                                <span className="font-semibold">{rapport.clientName}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-text-span">Equipement</span>
                                <span className="font-semibold">{rapport.equipmentRepaired}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-text-span">Heures</span>
                                <span className="font-semibold">{rapport.equipmentHours}</span>
                            </div>
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
                            <div className="flex flex-col">
                                <span className="text-text-span">N° de série</span>
                                <span className="font-semibold">{rapport.serialNumber}</span>
                            </div>
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
                </div>}
        </div>
    )
}

export default CardToModify;