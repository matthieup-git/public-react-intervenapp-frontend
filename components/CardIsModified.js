import React from 'react'

import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

function CardIsModified() {

    const rapportInStore = useSelector((state) => state.rapport.value);
    console.log("rapport in store = ", rapportInStore)

    const [dataToSend, setDataToSend] = useState({});

    useEffect(() => {
        setDataToSend({
            //type: rapportInStore.type,
            //date: rapportInStore.date,
            clientName: rapportInStore.clientName,
            addressOrPlaceOfRepair: rapportInStore.addressOrPlaceOfRepair,
            equipmentRepaired: rapportInStore.equipmentRepaired,
            serialNumber: rapportInStore.serialNumber,
            equipmentHours: rapportInStore.equipmentHours,
            description: rapportInStore.description,
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
                //     date: dataToSend.date,
                    clientName: dataToSend.clientName,
                    addressOrPlaceOfRepair: dataToSend.addressOrPlaceOfRepair,
                    equipmentRepaired: dataToSend.equipmentRepaired,
                    serialNumber: dataToSend.serialNumber,
                    equipmentHours: dataToSend.equipmentHours,
                    description: dataToSend.description,
                    price: dataToSend.price,
                }),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedRapport = await response.json();
            if (updatedRapport.result) {
                console.log(updatedRapport.error)
            } else {
                console.log(updatedRapport.error)
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

    }


    return (
        <>
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
            <div>
                <label for="date">*Date de l'intervention :</label>
                <input type="datetime-local" onChange={(e) => setDataToSend({ ...dataToSend, date: e.target.value })} value={dataToSend.date} />
            </div>
            <div>
                <label for="clientName">*Nom du client :</label>
                <input type="text" id="clientName" onChange={(e) => setDataToSend({ ...dataToSend, clientName: e.target.value })} value={dataToSend.clientName} />
            </div>
            <div>
                <label for="addressOrPlaceOfRepair">*Adresse ou lieu de réparation :</label>
                <input type="text" id="addressOrPlaceOfRepair" onChange={(e) => setDataToSend({ ...dataToSend, addressOrPlaceOfRepair: e.target.value })} value={dataToSend.addressOrPlaceOfRepair} />
            </div>
            <div>
                <label for="equipmentRepaired">*Matériel réparé :</label>
                <input type="text" id="equipmentRepaired" onChange={(e) => setDataToSend({ ...dataToSend, equipmentRepaired: e.target.value })} value={dataToSend.equipmentRepaired} />
            </div>
            <div>
                <label for="equipmentHours">Heures du matériel :</label>
                <input type="text" id="equipmentHours" onChange={(e) => setDataToSend({ ...dataToSend, equipmentHours: e.target.value })} value={dataToSend.equipmentHours} />
            </div>
            <div>
                <label for="serialNumber">*Numéro de série / parc :</label>
                <input type="text" id="serialNumber" onChange={(e) => setDataToSend({ ...dataToSend, serialNumber: e.target.value })} value={dataToSend.serialNumber} />
            </div>
            <div>
                <label for="description">*Description de l'intervention :</label>
                <textarea id="description" onChange={(e) => setDataToSend({ ...dataToSend, description: e.target.value })} value={dataToSend.description} ></textarea>
            </div>
            <div>
                <label for="price">Prix :</label>
                <input type="text" id="price" onChange={(e) => setDataToSend({ ...dataToSend, price: e.target.value })} value={dataToSend.price} />
            </div>

            <button onClick={() => sendUpdatedRapport()}>Valider les modifications</button>
        </>
    )
}

export default CardIsModified;