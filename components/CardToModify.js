import styles from '../styles/CardToModify.module.css'

import { deleteRapportToStore } from '../reducers/rapport';

import { useDispatch, useSelector } from 'react-redux';
// import Link from 'next/link';

import { useRouter } from 'next/router'

import moment from 'moment';
import 'moment/locale/fr';

function RapportToModify() {

    const dispatch = useDispatch();
    const router = useRouter()


    const rapport = useSelector((state) => state.rapport.value);
    console.log(rapport)

    let formattedDate = moment(rapport.date).locale('fr').format('DD MMMM YYYY'); // formatter la date


    const returnToHome = () => {
        dispatch(deleteRapportToStore())
        router.push('/')
    }

    return (
        <div className='container'>
            <div onClick={() => returnToHome()}>Retour</div>
            <div className={styles.card}>
                <div className={`${styles.number} ${styles.displayflex}`}>
                    Rapport #1
                </div>
                <div className={styles.typestatus}>
                    <div className={styles.type}>
                        {rapport.type}
                    </div>
                    <div className={styles.status}>
                        {rapport.status ? <div className={styles.done}>Traité</div> : <div className={styles.notDone}>Non traité</div>}
                    </div>
                </div>
                <div className={`${styles.infos} ${styles.displayflex}`}>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.client}>{rapport.clientName}</span>
                    <span className={styles.address}>{rapport.addressOrPlaceOfRepair}</span>
                    {/* <span className={styles.materiel}>{rapport.equipmentRepaired.length > 50 ? rapport.equipmentRepaired.slice(0, 50) + "..." : rapport.equipmentRepaired}</span> */}
                </div>
                {rapport.price && <div className={styles.price}>
                    {rapport.price} €
                </div>}
                <div className={`${styles.description} ${styles.displayflex}`}>
                    {/* <span>{rapport.description.length > 100 ? rapport.description.slice(0, 100) + "..." : rapport.description}</span> */}
                </div>
            </div>
        </div>
    )
}

export default RapportToModify;