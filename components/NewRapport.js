import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'

import InputDefault from './InputDefault';
import TextAreaDefault from './TextAreaDefault';
import ButtonDefault from './ButtonDefault';
import LabelDefault from './LabelDefault';
import InputErrorDefault from './InputErrorDefault';

import { RadioGroup, RadioGroupItem } from "../src/components/components/ui/radio-group"

function NewRapport() {

    const router = useRouter();
    const userInStore = useSelector((state) => state.users.value);

    const [newRapport, setNewRapport] = useState({
        type: '',
        date: '',
        clientName: '',
        addressOrPlaceOfRepair: '',
        equipmentRepaired: '',
        serialNumber: '',
        equipmentHours: '',
        description: '',
        price: null,
    });
    const [errors, setErrors] = useState({})

    // fonction pour le changement de Type input radio
    const handleChange = (field) => (event) => {
        setNewRapport({
            ...newRapport,
            [field]: event.target.value,
        });
    };

    const clearStates = () => {
        setNewRapport({
            type: '',
            date: '',
            clientName: '',
            addressOrPlaceOfRepair: '',
            equipmentRepaired: '',
            serialNumber: '',
            equipmentHours: '',
            description: '',
            price: 0,
        });
    };

    // fonction pour poster un nouveau rapport
    const postNewRapport = async () => {
        try {
            const response = await fetch(`http://localhost:3000/rapports/save/${userInStore.token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newRapport,
                    createdBy: userInStore.token,
                }),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // si champs ok
            if (result.result) {
                if (userInStore.isAdmin) {
                    clearStates();
                    setErrors({})
                    router.push('/tous-les-rapports') // si admin renvoie vers listing
                } else { // si champs pas ok
                    clearStates();
                    setErrors({})
                    router.push('/nouveau-rapport') // si ouvrier renvoie vers nouveau rapport
                }
            } else {
                setErrors({})
                const newErrors = {};

                // Validation des champs
                if (newRapport.clientName.trim() === "") {
                    newErrors.clientName = 'Nom du client manquant';
                }
                if (newRapport.addressOrPlaceOfRepair.trim() === "") {
                    newErrors.addressOrPlaceOfRepair = 'Adresse ou lieu de réparation manquant';
                }
                if (newRapport.equipmentRepaired.trim() === "") {
                    newErrors.equipmentRepaired = 'Equipement réparé manquant';
                }
                if (newRapport.description.trim() === "") {
                    newErrors.description = 'Description manquante';
                }

                // Mettre à jour l'état des erreurs
                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                }
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <LabelDefault htmlFor="" text="Type de document" mandatory="(optionnel)" />
                <RadioGroup id="type" defaultValue='facture' value={newRapport.type} onValueChange={(value) => setNewRapport({ ...newRapport, type: value })}>
                    <div className="flex items-center space-x-4">
                        <RadioGroupItem value="facture" id="facture" />
                        <LabelDefault htmlFor="facture" text="Facture" className="font-normal" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <RadioGroupItem value="devis" id="devis" />
                        <LabelDefault htmlFor="devis" text="Devis" className="font-normal" />
                    </div>
                </RadioGroup>
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault htmlFor="date" text="Date d'intervention" mandatory="(requis)" />
                <InputDefault type="datetime-local" id="date" onChange={handleChange('date')} value={newRapport.date} default={Date.now()} />
            </div>
            <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault htmlFor="clientName" text="Nom du client" mandatory="(requis)" />
                {errors.clientName && <InputErrorDefault title={errors.clientName} />}
                <InputDefault type="text" id="clientName" onChange={handleChange('clientName')} value={newRapport.clientName} />
            </div>
            <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault htmlFor="addressOrPlaceOfRepair" text="Adresse ou lieu de réparation" mandatory="(requis)" />
                {errors.addressOrPlaceOfRepair && <InputErrorDefault title={errors.addressOrPlaceOfRepair} />}
                <InputDefault type="text" id="addressOrPlaceOfRepair" variant={`${errors.addressOrPlaceOfRepair && "error"}`} onChange={handleChange('addressOrPlaceOfRepair')} value={newRapport.addressOrPlaceOfRepair} />
            </div>
            <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault htmlFor="equipmentRepaired" text="Equipement réparé" mandatory="(requis)" />
                {errors.equipmentRepaired && <InputErrorDefault title={errors.equipmentRepaired} />}
                <InputDefault type="text" id="equipmentRepaired" onChange={handleChange('equipmentRepaired')} value={newRapport.equipmentRepaired} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault htmlFor="equipmentHours" text="Heures du matériel" mandatory="(optionnel)" />
                <InputDefault type="text" id="equipmentHours" onChange={handleChange('equipmentHours')} value={newRapport.equipmentHours} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault htmlFor="serialNumber" text="Numéro de série / parc" mandatory="(optionnel)" />
                <InputDefault type="text" id="serialNumber" onChange={handleChange('serialNumber')} value={newRapport.serialNumber} />
            </div>
            <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault htmlFor="description" text="Description de l'intervention" mandatory="(requis)" />
                {errors.description && <InputErrorDefault title={errors.description} />}
                <TextAreaDefault id="description" onChange={handleChange('description')} value={newRapport.description} />
            </div>
            {userInStore.isAdmin && (
                <div className="flex flex-col gap-4">
                    <LabelDefault htmlFor="price" text="Prix de la facture" mandatory="(optionnel)" />
                    <InputDefault id="price" onChange={handleChange('price')} value={newRapport.price} />
                </div>
            )}
            <ButtonDefault onClick={postNewRapport} text="Créer rapport" variant="addRapport" size="addRapport" />
            {userInStore.isAdmin && <ButtonDefault text="Voir toutes les interventions" destination="/tous-les-rapports" />}
        </div>
    )
}

export default NewRapport