import styles from '../styles/NewRapport.module.css';

import { useSelector } from 'react-redux';
import { useState } from 'react'
import { useRouter } from 'next/router'

import Header from '../components/Header'


function NewRapport() {

    const router = useRouter();
    const userInStore = useSelector((state) => state.users.value);
    console.log(userInStore);

    const [type, setType] = useState('facture');
    const [date, setDate] = useState('');
    const [clientName, setClientName] = useState('');
    const [addressOrPlaceOfRepair, setAddressOrPlaceOfRepair] = useState('');
    const [equipmentRepaired, setEquipmentRepaired] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [equipmentHours, setEquipmentHours] = useState('');
    const [description, setDescription] = useState('');

    // fonction pour le changement de Type input radio
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const clearStates = () => {
        setType('facture');
        setDate('');
        setClientName('');
        setAddressOrPlaceOfRepair('');
        setEquipmentRepaired('');
        setSerialNumber('');
        setEquipmentHours('');
        setDescription('');
    }

    // fonction pour poster un nouveau rapport
    const postNewRapport = async () => {
        try {
            const response = await fetch(`http://localhost:3000/rapports/save/${userInStore.token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: type || 'facture',
                    date: date,
                    clientName: clientName,
                    addressOrPlaceOfRepair: addressOrPlaceOfRepair,
                    equipmentRepaired: equipmentRepaired,
                    serialNumber: serialNumber,
                    equipmentHours: equipmentHours,
                    description: description,
                    createdBy: userInStore.token
                }),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newRapport = await response.json();

            // si champs ok
            if (newRapport.result) {
                if (userInStore.isAdmin) {
                    clearStates();
                    router.push('/tous-les-rapports') // si admin renvoie vers listing
                } else { // si champs pas ok
                    console.log(newRapport.result)
                    clearStates();
                    router.push('/nouveau-rapport') // si ouvrier renvoie vers nouveau rapport
                }
            } else {
                console.log(newRapport.result)
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // fonction pour rediriger vers toutes les interventions
    const handleClickToAllRapports = () => {
        router.push('/tous-les-rapports')
    }

    return (
        <div className='container'>
            <h1 className={styles.underline}>
                Hello world!
            </h1>
            <Header title="Nouveau rapport" />
            <div>
                <input type="radio" id="devis" value={type} checked={type === 'devis'} onChange={handleTypeChange} />
                <label for="radio">Devis</label>
            </div>
            <div>
                <input type="radio" id="facture" value={type} checked={type === 'facture'} onChange={handleTypeChange} defaultChecked={true} />
                <label for="radio">Facture</label>
            </div>
            <div>
                <label for="date">*Date de l'intervention :</label>
                <input type="datetime-local" id="date" onChange={(e) => setDate(e.target.value)} value={date} />
            </div>
            <div>
                <label for="clientName">*Nom du client :</label>
                <input type="text" id="clientName" onChange={(e) => setClientName(e.target.value)} value={clientName} />
            </div>
            <div>
                <label for="addressOrPlaceOfRepair">*Adresse ou lieu de réparation :</label>
                <input type="text" id="addressOrPlaceOfRepair" onChange={(e) => setAddressOrPlaceOfRepair(e.target.value)} value={addressOrPlaceOfRepair} />
            </div>
            <div>
                <label for="equipmentRepaired">*Matériel réparé :</label>
                <input type="text" id="equipmentRepaired" onChange={(e) => setEquipmentRepaired(e.target.value)} value={equipmentRepaired} />
            </div>
            <div>
                <label for="equipmentHours">Heures du matériel :</label>
                <input type="text" id="equipmentHours" onChange={(e) => setEquipmentHours(e.target.value)} value={equipmentHours} />
            </div>
            <div>
                <label for="serialNumber">*Numéro de série / parc :</label>
                <input type="text" id="serialNumber" onChange={(e) => setSerialNumber(e.target.value)} value={serialNumber} />
            </div>
            <div>
                <label for="description">*Description de l'intervention :</label>
                <textarea id="description" onChange={(e) => setDescription(e.target.value)} value={description} ></textarea>
            </div>
            <div>
                <button id="btn-send" onClick={postNewRapport}>Envoyer</button>
                {userInStore.isAdmin && <button id="btn-send" onClick={handleClickToAllRapports}>Voir toutes les interventions</button>}
            </div>
        </div>
    )
}

export default NewRapport;