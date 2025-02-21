import { useDispatch, useSelector } from 'react-redux';
import { addRapportToStore } from '../reducers/rapport';
import { useRouter } from 'next/router'

import styles from '../styles/Card.module.css'

import moment from 'moment';
import 'moment/locale/fr';

function Card(props) {

    const dispatch = useDispatch();
    const router = useRouter()

    const rapport = useSelector((state) => state.rapport.value); // la card sera stockée dans rapport

    const handleRapportSelected = () => { // rediriger vers /modifier-rapport + stocker les props dans le dispatch
        dispatch(addRapportToStore(props));
        router.push('/modifier-rapport')
    }

    let formattedDate = moment(props.date).locale('fr').format('DD MMMM YYYY'); // formatter la date

    return (
        <>
            <div className={styles.card} onClick={() => handleRapportSelected()}>
                <div className={`${styles.number} ${styles.displayflex}`}>
                    Rapport #1
                </div>
                <div className={styles.typestatus}>
                    <div className={styles.type}>
                        {props.type === 'facture' ? 'Facture' : 'Devis'}
                    </div>
                    <div className={styles.status}>
                        {props.isDone ? <div className={styles.done}>Traité</div> : <div className={styles.notDone}>Non Traité</div>}
                    </div>
                </div>
                <div className={`${styles.infos} ${styles.displayflex}`}>
                    <span>Crée par : {props.createdBy.firstname} {props.createdBy.lastname}</span>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.client}>{props.clientName}</span>
                    <span className={styles.address}>{props.addressOrPlaceOfRepair}</span>
                    <span className={styles.materiel}>{props.equipmentRepaired.length > 50 ? props.equipmentRepaired.slice(0, 50) + "..." : props.equipmentRepaired}</span>

                </div>
                <div className={styles.price}>
                    {props.price === 0 ? 'Prix à définir' : props.price + ' €'}
                </div>
                <div className={`${styles.description} ${styles.displayflex}`}>
                    <span>{props.description.length > 100 ? props.description.slice(0, 100) + "..." : props.description}</span>
                </div>
            </div>
        </>
    );
}

export default Card;