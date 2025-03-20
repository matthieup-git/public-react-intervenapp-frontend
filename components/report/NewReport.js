import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'

import InputDefault from '../components/InputDefault';
import TextAreaDefault from '../components/TextAreaDefault';
import ButtonDefault from '../components/ButtonDefault';
import LabelDefault from '../components/LabelDefault';
import InputErrorDefault from '../components/InputErrorDefault';
import Header from '../Header';

import { RadioGroup, RadioGroupItem } from "../../src/components/components/ui/radio-group"

function NewReport({ setIsEdible, onReportSuccess }) {

    const router = useRouter();
    const userInStore = useSelector((state) => state.users.value);

    const [newRapport, setNewRapport] = useState({
        type: 'facture',
        date: '',
        clientName: '',
        addressOrPlaceOfRepair: '',
        equipmentRepaired: '',
        serialNumber: '',
        equipmentHours: '',
        description: '',
        price: '',
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
            type: 'facture',
            date: '',
            clientName: '',
            addressOrPlaceOfRepair: '',
            equipmentRepaired: '',
            serialNumber: '',
            equipmentHours: '',
            description: '',
            price: 0,
        });
        setErrors({})
        setIsEdible(false)
    };

    const goToListing = () => {
        clearStates()
        router.push('/tous-les-rapports')
    }

    // fonction pour poster un nouveau rapport
    const postNewRapport = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/rapports/save/${userInStore.token}`, {
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
                onReportSuccess(); // appelle la fonction pour afficher l'alert success
                if (userInStore.isAdmin) {
                    clearStates()
                    router.push('/tous-les-rapports') // si admin renvoie vers listing
                } else { // si champs pas ok
                    clearStates()
                    alert('Votre rapport a été créé avec succès. ')
                    router.push('/nouveau-rapport') // si ouvrier renvoie vers nouveau rapport
                }
            } else {
                setErrors({})
                const newErrors = {};

                // Validation des champs
                if (newRapport.date === "") {
                    newErrors.date = 'Date manquante';
                }
                if (newRapport.clientName.trim() === "") {
                    newErrors.clientName = 'Nom du client manquant';
                }
                if (newRapport.addressOrPlaceOfRepair.trim() === "") {
                    newErrors.addressOrPlaceOfRepair = 'Adresse ou lieu de réparation manquant';
                }
                if (newRapport.equipmentRepaired.trim() === "") {
                    newErrors.equipmentRepaired = 'Matériel réparé manquant';
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
            alert('There was a problem with the fetch operation:', error);
        }
    }

    return (
        <div>
            <Header title="Nouveau rapport" />
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <LabelDefault htmlFor="type" text="Type de document" mandatory="(requis)" />
                    <RadioGroup id="type" defaultValue="facture" value={newRapport.type} onValueChange={(value) => setNewRapport({ ...newRapport, type: value })}>
                        <div className="flex items-center space-x-4 h-12">
                            <RadioGroupItem value="facture" id="facture" className={newRapport.type === "facture" ? "border-text-title-label" : "border-border-input-radio"} />
                            <LabelDefault htmlFor="facture" text="Facture" className="font-normal text-base" />
                        </div>
                        <div className="flex items-center space-x-4 h-12">
                            <RadioGroupItem value="devis" id="devis" className={newRapport.type === "devis" ? "border-text-title-label" : "border-border-input-radio"} />
                            <LabelDefault htmlFor="devis" text="Devis" className="font-normal text-base" />
                        </div>
                    </RadioGroup>
                </div>
                <div className={`flex flex-col ${errors.date ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="date" text="Date d'intervention" mandatory="(requis)" />
                    {errors.date && <InputErrorDefault title={errors.date} />}
                    <InputDefault type="datetime-local" id="date" onChange={handleChange('date')} value={newRapport.date} className={errors.date ? "error" : ""} />
                </div>
                <div className={`flex flex-col ${errors.clientName ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="clientName" text="Nom du client" mandatory="(requis)" />
                    {errors.clientName && <InputErrorDefault title={errors.clientName} />}
                    <InputDefault type="text" id="clientName" onChange={handleChange('clientName')} value={newRapport.clientName} className={errors.clientName ? "error" : ""} />
                </div>
                <div className={`flex flex-col ${errors.addressOrPlaceOfRepair ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="addressOrPlaceOfRepair" text="Adresse ou lieu de réparation" mandatory="(requis)" />
                    {errors.addressOrPlaceOfRepair && <InputErrorDefault title={errors.addressOrPlaceOfRepair} />}
                    <InputDefault type="text" id="addressOrPlaceOfRepair" variant={`${errors.addressOrPlaceOfRepair && "error"}`} onChange={handleChange('addressOrPlaceOfRepair')} value={newRapport.addressOrPlaceOfRepair} className={errors.addressOrPlaceOfRepair ? "error" : ""} />
                </div>
                <div className={`flex flex-col ${errors.equipmentRepaired ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="equipmentRepaired" text="Matériel réparé" mandatory="(requis)" />
                    {errors.equipmentRepaired && <InputErrorDefault title={errors.equipmentRepaired} />}
                    <InputDefault type="text" id="equipmentRepaired" onChange={handleChange('equipmentRepaired')} value={newRapport.equipmentRepaired} className={errors.equipmentRepaired ? "error" : ""} />
                </div>
                <div className="flex flex-col gap-4">
                    <LabelDefault htmlFor="serialNumber" text="Numéro de série / parc" mandatory="(optionnel)" />
                    <InputDefault type="text" id="serialNumber" onChange={handleChange('serialNumber')} value={newRapport.serialNumber} />
                </div>
                <div className="flex flex-col gap-4">
                    <LabelDefault htmlFor="equipmentHours" text="Heures du matériel" mandatory="(optionnel)" />
                    <InputDefault type="text" id="equipmentHours" onChange={handleChange('equipmentHours')} value={newRapport.equipmentHours} />
                </div>
                <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="description" text="Description de l'intervention" mandatory="(requis)" />
                    {errors.description && <InputErrorDefault title={errors.description} />}
                    <TextAreaDefault id="description" onChange={handleChange('description')} value={newRapport.description} className={errors.description ? "error" : ""} />
                    {/* <AutosizeTextarea id="description" onChange={handleChange('description')} value={newRapport.description} className={errors.description ? "error" : ""}/> */}
                </div>
                {userInStore.isAdmin && (
                    <div className="flex flex-col gap-4">
                        <LabelDefault htmlFor="price" text="Prix de la facture" mandatory="(optionnel)" />
                        <InputDefault type="number" id="price" onChange={handleChange('price')} value={newRapport.price} />
                    </div>
                )}
                <ButtonDefault onClick={postNewRapport} text="Créer rapport" variant="addAdmin" size="add" />
                {userInStore.isAdmin && <ButtonDefault text="Voir toutes les interventions" onClick={goToListing} />}
            </div>
        </div>
    )
}

export default NewReport