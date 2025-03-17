import React from 'react'

import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useRouter } from 'next/router'

import { Switch } from "../src/components/components/ui/switch"

import ButtonDefault from "./ButtonDefault"
import LabelDefault from "./LabelDefault"
import TextAreaDefault from './TextAreaDefault';
import InputDefault from './InputDefault';


function CardIsModified() {

    const router = useRouter();

    const rapportInStore = useSelector((state) => state.rapport.value);
    console.log("rapport in store", rapportInStore)

    const [dataToSend, setDataToSend] = useState({});

    let date = new Date(rapportInStore.date);

    // Obtenir les composants de la date et de l'heure en tenant compte du fuseau horaire local
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    // Construire la date au format local
    let localDate = `${year}-${month}-${day}T${hours}:${minutes}`;


    useEffect(() => {
        setDataToSend({
            //type: rapportInStore.type,
            date: localDate,
            clientName: rapportInStore.clientName,
            addressOrPlaceOfRepair: rapportInStore.addressOrPlaceOfRepair,
            equipmentRepaired: rapportInStore.equipmentRepaired,
            serialNumber: rapportInStore.serialNumber,
            equipmentHours: rapportInStore.equipmentHours,
            description: rapportInStore.description,
            price: rapportInStore.price,
        })
    }, [])
    console.log("dataToSend = ", dataToSend)

    const sendUpdatedRapport = async () => {
        //router.push('/tous-les-rapports');
        try {
            const response = await fetch(`http://localhost:3000/rapports/updatedRapport/${rapportInStore.token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    //     type: dataToSend.type,
                    date: dataToSend.date,
                    clientName: dataToSend.clientName,
                    addressOrPlaceOfRepair: dataToSend.addressOrPlaceOfRepair,
                    equipmentRepaired: dataToSend.equipmentRepaired,
                    serialNumber: dataToSend.serialNumber,
                    equipmentHours: dataToSend.equipmentHours,
                    description: dataToSend.description,
                    price: dataToSend.price,
                }),
            })
            console.log(response)
            if (!response.ok) {
                console.log("aucune modif effectuée")
            }

            const updatedRapport = await response.json();
            if (updatedRapport.result) {
                console.log(true)
                router.push('/tous-les-rapports')
            } else {
                console.log(false, updatedRapport.error)
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }


    return (
        <div>
            <h1>Rapport #3</h1>

            {/* <input type="text" placeholder="Enter your email" onChange={(e) => dispatch(addRapportToStore({ ...rapport, description: e.target.value }))} value={rapport.description} /> */}
            {/* <div>
                <input type="radio" value={dataToSend.type} onChange={() => setDataToSend({ ...dataToSend, type: 'devis' })} />
                <label for="radio">Devis</label>
            </div>
            <div>
                <input type="radio" id="facture" onChange={() => setDataToSend({ ...dataToSend, type: 'facture' })} />
                <label for="radio">Facture</label>
            </div> */}
            <div className="flex gap-4">
                <LabelDefault text="Non-traité" htmlFor="status" />
                <Switch id="status" />
                <LabelDefault text="Traité" htmlFor="status" />
            </div>
            <div className="flex flex-col gap-3">
                {/* <label for="date">*Date de l'intervention :</label>
                <input type="datetime-local" onChange={(e) => setDataToSend({ ...dataToSend, date: e.target.value })} value={dataToSend.date} /> */}
                <LabelDefault text="Date d'intervention" htmlFor="date" mandatory="(requis)" />
                <InputDefault type="datetime-local" id="date" onChange={(e) => setDataToSend({ ...dataToSend, date: e.target.value })} value={dataToSend.date} />
            </div>
            <div className="flex flex-col gap-3">
                <LabelDefault text="Nom du client" htmlFor="clientName" mandatory="(requis)" />
                <InputDefault type="text" id="clientName" onChange={(e) => setDataToSend({ ...dataToSend, clientName: e.target.value })} value={dataToSend.clientName} />
            </div>
            <div className="flex flex-col gap-3">
                <LabelDefault text="Adresse ou lieu de réparation" htmlFor="addressOrPlaceOfRepair" mandatory="(requis)" />
                <InputDefault type="text" id="addressOrPlaceOfRepair" onChange={(e) => setDataToSend({ ...dataToSend, addressOrPlaceOfRepair: e.target.value })} value={dataToSend.addressOrPlaceOfRepair} />
            </div>
            <div className="flex flex-col gap-3">
                <LabelDefault text="Matériel réparé" htmlFor="equipmentRepaired" mandatory="(requis)" />
                <InputDefault type="text" id="equipmentRepaired" onChange={(e) => setDataToSend({ ...dataToSend, equipmentRepaired: e.target.value })} value={dataToSend.equipmentRepaired} />
            </div>
            <div className="flex flex-col gap-3">
                <LabelDefault text="Heures du matériel" htmlFor="equipmentHours" mandatory="(requis)" />
                <InputDefault type="text" id="equipmentHours" onChange={(e) => setDataToSend({ ...dataToSend, equipmentHours: e.target.value })} value={dataToSend.equipmentHours} />
            </div>
            <div className="flex flex-col gap-3">
                <LabelDefault text="Numéro de série / parc" htmlFor="serialNumber" mandatory="(requis)" />
                <InputDefault type="text" id="serialNumber" onChange={(e) => setDataToSend({ ...dataToSend, serialNumber: e.target.value })} value={dataToSend.serialNumber} />
            </div>
            <div className="flex flex-col gap-3">
                <LabelDefault text="Description de l'intervention" htmlFor="description" mandatory="(requis)" />
                <TextAreaDefault id="description" placeholder="Description de l'intervention" onChange={(e) => setDataToSend({ ...dataToSend, description: e.target.value })} value={dataToSend.description}/> 
                {/* <Textarea id="description" className="h-36" placeholder="Description de l'intervention" onChange={(e) => setDataToSend({ ...dataToSend, description: e.target.value })} value={dataToSend.description} /> */}
            </div>
            <div className="flex flex-col gap-3">
                <LabelDefault text="Prix" htmlFor="price" mandatory="(optionnel)" />
                <InputDefault type="number" id="price" onChange={(e) => setDataToSend({ ...dataToSend, price: e.target.value })} value={dataToSend.price} />
            </div>

            <ButtonDefault onClick={sendUpdatedRapport} text="Sauvegarder les modifications" />
            <ButtonDefault destination="/tous-les-rapports" text="Retour" />
        </div>
    )
}

export default CardIsModified;