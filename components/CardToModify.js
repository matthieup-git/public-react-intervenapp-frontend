import styles from '../styles/CardToModify.module.css'

import CardIsModified from './CardIsModified'

import { deleteRapportToStore } from '../reducers/rapport';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Link from 'next/link';

import { useRouter } from 'next/router'

import moment from 'moment';
import 'moment/locale/fr';

function CardToModify() {

    //const dispatch = useDispatch();
    const router = useRouter()

    const rapport = useSelector((state) => state.rapport.value);
    console.log("rapport cardtomodify = ", rapport)

    let formattedDate = moment(rapport.date).locale('fr').format('DD MMMM YYYY'); // formatter la date


    const [isModified, setIsModified] = useState(false); // Etat pour au si clic, afficher le composant CardIsModified
    const returnToHome = () => { // fonction pour le retour à la page d'accueil
        setIsModified(false);
        router.push('/tous-les-rapports');
        //dispatch(deleteRapportToStore());
    }
    const toModify = () => {
        setIsModified(!isModified)
    }



    return (

        // {!isModified && <button onClick={() => toModify()}>Modifier</button>}
       <> {isModified ? <CardIsModified /> :
        <div className={styles.containerCardToModify}>
            {/* {Object.keys(rapport).length > 0 &&  <>
                {!isModified && <button onClick={() => toModify()}>Modifier</button>}
                {isModified ? <CardIsModified /> : } */}

            <button onClick={() => returnToHome()}>Retour</button>

            <div className={styles.topHead}>
                <div className={styles.number}>Rapport #1</div>
                <button onClick={() => toModify()}>Modifier</button>
            </div>

            <div className={styles.isDone}>
                <span>Statut</span>
                {rapport.status ? <div className={styles.done}>Traité</div> : <div className={styles.notDone}>Non traité</div>}
                Crée par : {rapport.createdBy.firstname} {rapport.createdBy.lastname}
            </div>

            <div className={styles.card} >
                <div className={styles.leftcontent}>
                    <div className={styles.displayFlexColumn}>
                        <span>Type</span>
                        <span>{rapport.type === 'facture' ? 'Facture' : 'Devis'}</span>
                    </div>
                    <div className={styles.displayFlexColumn}>
                        <span>Client</span>
                        <span>{rapport.clientName}</span>
                    </div>
                    <div className={styles.displayFlexColumn}>
                        <span>Equipement</span>
                        <span>{rapport.equipmentRepaired}</span>
                    </div>
                    <div className={styles.displayFlexColumn}>
                        <span>Heures</span>
                        <span>{rapport.equipmentHours}</span>
                    </div>
                </div>
                <div className={styles.rightcontent}>
                    <div className={styles.displayFlexColumn}>
                        <span>Date</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className={styles.displayFlexColumn}>
                        <span>Localisation</span>
                        <span>{rapport.addressOrPlaceOfRepair}</span>
                    </div>
                    <div className={styles.displayFlexColumn}>
                        <span>N° de série</span>
                        <span>{rapport.serialNumber}</span>
                    </div>
                    <div className={styles.displayFlexColumn}>
                        <span>Prix</span>
                        <span>{rapport.price === 0 ? 'Prix à définir' : rapport.price + ' €'}</span>
                    </div>
                </div>

                <div className={styles.bottomcontent}>
                    <span>Description</span>
                    <span>{rapport.description}</span>

                </div>
            </div>

        </div>}</>
    )
}

export default CardToModify;