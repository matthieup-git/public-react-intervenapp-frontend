import { useDispatch, useSelector } from 'react-redux';
import { addRapportToStore } from '../reducers/rapport';
import { useRouter } from 'next/router'

import styles from '../styles/Card.module.css'

import moment from 'moment';
import 'moment/locale/fr';


function Listing(props) {

    const dispatch = useDispatch();
    const router = useRouter()

    const rapport = useSelector((state) => state.rapport.value);
    console.log(rapport)

    // const [rapportSelected, setRapportSelected] = useState([]); // Etat pour sélectionner un rapport

    const handleRapportSelected = () => {
        dispatch(addRapportToStore(props));
        router.push('/modifier-rapport')
        // window.location.href = `/modifier-rapport`;
    }
    // console.log(rapportSelected)

    let formattedDate = moment(props.date).locale('fr').format('DD MMMM YYYY'); // formatter la date

    return (
        <>
            <div className={styles.card} onClick={() => handleRapportSelected()}>
                <div className={`${styles.number} ${styles.displayflex}`}>
                    Rapport #1
                </div>
                <div className={styles.typestatus}>
                    <div className={styles.type}>
                        {props.type}
                    </div>
                    <div className={styles.status}>
                        {props.status ? <div className={styles.done}>Traité</div> : <div className={styles.notDone}>Non traité</div>}
                    </div>
                </div>
                <div className={`${styles.infos} ${styles.displayflex}`}>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.client}>{props.clientName}</span>
                    <span className={styles.address}>{props.addressOrPlaceOfRepair}</span>
                    {/* <span className={styles.materiel}>{props.equipmentRepaired.length > 50 ? props.equipmentRepaired.slice(0, 50) + "..." : props.equipmentRepaired}</span> */}
                </div>
                {props.price && <div className={styles.price}>
                    {props.price} €
                </div>}
                <div className={`${styles.description} ${styles.displayflex}`}>
                    {/* <span>{props.description.length > 100 ? props.description.slice(0, 100) + "..." : props.description}</span> */}
                </div>
            </div>
        </>
    );
}

export default Listing;