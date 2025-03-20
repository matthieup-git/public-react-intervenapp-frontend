import { useDispatch, useSelector } from 'react-redux';
import { addRapportToStore } from '../../reducers/rapport';
import { useRouter } from 'next/router'

import { Card } from "../../src/components/components/ui/card"
import { Badge } from "../../src/components/components/ui/badge"

import moment from 'moment';
import 'moment/locale/fr';


function RapportCard(props) {

    const dispatch = useDispatch();
    const router = useRouter()

    const userInStore = useSelector((state) => state.users.value);

    const handleRapportSelected = () => { // rediriger vers /modifier-rapport + stocker les props dans le dispatch
        dispatch(addRapportToStore(props));
        router.push('/modifier-rapport')
    }

    let formattedDate = moment(props.date).locale('fr').format('DD MMMM YYYY - HH:mm'); // formatter la date

    return (
        <Card className="gap-y-2 max-h-[228px] grid grid-rows-[1fr_2fr_3fr] grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]" onClick={() => handleRapportSelected()}>
            <div className="row-start-1 row-end-1 col-start-1 col-end-5 flex items-center font-bold text-xl text-text-title-blue">
                Rapport #{props.countDocument}
            </div>
            <div className="row-start-1 row-end-1 col-start-5 col-end-10 flex items-center justify-end gap-4">
                <Badge variant="type">{props.type === 'facture' ? 'Facture' : 'Devis'}</Badge>
                {props.isDone ? <Badge variant="done">Traité</Badge> : <Badge variant="notDone">Non Traité</Badge>}
            </div>
            <div className="row-start-2 row-end-2 col-start-1 col-end-7 grid grid-rows-auto max-h-full gap-1 text-text-card text-sm">
                <div className="row-start-1">Créé par : {props.createdBy?.firstname} {props.createdBy?.lastname}</div>
                <span className="row-start-2">{formattedDate}</span>
                <span className="row-start-3">{props.clientName}</span>
                <span className="row-start-4">{props.addressOrPlaceOfRepair}</span>
                <span className="row-start-5">{props.equipmentRepaired}</span>
            </div>
            <div className="row-start-2 row-end-2 col-start-7 col-end-10 flex justify-end font-bold text-text-title-blue text-sm">
                {props?.price === 0 || null || !userInStore.isAdmin ? 'Prix à définir' : props?.price + ' €'}
            </div>
            <div className="row-start-3 row-end-4 col-start-1 col-end-10 flex shrink overflow-hidden text-text-card text-sm">
                <span>{props.description?.length > 70 ? props.description.slice(0, 70) + "..." : props.description}</span>
            </div>
        </Card>
    )
}

export default RapportCard;