import React from 'react'

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteRapportToStore} from "../../reducers/rapport"

import { useRouter } from 'next/router'

import ButtonDefault from "../components/ButtonDefault"
import LabelDefault from "../components/LabelDefault"
import TextAreaDefault from '../components/TextAreaDefault';
import InputDefault from '../components/InputDefault';

function EditReport() {

    const router = useRouter();
    const dispatch = useDispatch()

    const rapportInStore = useSelector((state) => state.rapport.value);

    const [dataToSend, setDataToSend] = useState({});
    console.log("dataToSend = ", dataToSend)

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

    const sendUpdatedRapport = async () => {
        //router.push('/tous-les-rapports');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/rapports/updatedRapport/${rapportInStore.token}`, {
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
                alert('Modification effectuée')
                router.push('/tous-les-rapports')
                dispatch(deleteRapportToStore())
            } else {
                alert(updatedRapport.error)
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }


    return (
        <div className="flex flex-col gap-8">
            <h1>Rapport #{rapportInStore.countDocument}</h1>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Date d'intervention" htmlFor="date" mandatory="(requis)" />
                <InputDefault type="datetime-local" id="date" onChange={(e) => setDataToSend({ ...dataToSend, date: e.target.value })} value={dataToSend.date} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Nom du client" htmlFor="clientName" mandatory="(requis)" />
                <InputDefault type="text" id="clientName" onChange={(e) => setDataToSend({ ...dataToSend, clientName: e.target.value })} value={dataToSend.clientName} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Adresse ou lieu de réparation" htmlFor="addressOrPlaceOfRepair" mandatory="(requis)" />
                <InputDefault type="text" id="addressOrPlaceOfRepair" onChange={(e) => setDataToSend({ ...dataToSend, addressOrPlaceOfRepair: e.target.value })} value={dataToSend.addressOrPlaceOfRepair} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Matériel réparé" htmlFor="equipmentRepaired" mandatory="(requis)" />
                <InputDefault type="text" id="equipmentRepaired" onChange={(e) => setDataToSend({ ...dataToSend, equipmentRepaired: e.target.value })} value={dataToSend.equipmentRepaired} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Numéro de série / parc" htmlFor="serialNumber" mandatory="(requis)" />
                <InputDefault type="text" id="serialNumber" onChange={(e) => setDataToSend({ ...dataToSend, serialNumber: e.target.value })} value={dataToSend.serialNumber} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Heures du matériel" htmlFor="equipmentHours" mandatory="(requis)" />
                <InputDefault type="text" id="equipmentHours" onChange={(e) => setDataToSend({ ...dataToSend, equipmentHours: e.target.value })} value={dataToSend.equipmentHours} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Description de l'intervention" htmlFor="description" mandatory="(requis)" />
                <TextAreaDefault id="description" onChange={(e) => setDataToSend({ ...dataToSend, description: e.target.value })} value={dataToSend.description} />
                {/* <Textarea id="description" className="h-36" placeholder="Description de l'intervention" onChange={(e) => setDataToSend({ ...dataToSend, description: e.target.value })} value={dataToSend.description} /> */}
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Prix" htmlFor="price" mandatory="(optionnel)" />
                <InputDefault type="number" id="price" onChange={(e) => setDataToSend({ ...dataToSend, price: e.target.value })} value={dataToSend.price} />
            </div>
            <ButtonDefault onClick={sendUpdatedRapport} text="Sauvegarder les modifications" variant="addAdmin" size="add"/>
        </div>
    )
}

export default EditReport;