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

    const [newReport, setnewReport] = useState({
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

    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false);

    // fonction pour le changement de Type input radio
    const handleChange = (field) => (event) => {
        setnewReport({
            ...newReport,
            [field]: event.target.value,
        });
    };

    const clearStates = () => {
        setnewReport({
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

    const validateReport = (newReport) => {
        const errors = {};
        if (!newReport.date) {
            errors.date = 'Date manquante';
        }
        if (!newReport.clientName.trim()) {
            errors.clientName = 'Nom du client manquant';
        }
        if (!newReport.addressOrPlaceOfRepair.trim()) {
            errors.addressOrPlaceOfRepair = 'Adresse ou lieu de réparation manquant';
        }
        if (!newReport.equipmentRepaired.trim()) {
            errors.equipmentRepaired = 'Matériel réparé manquant';
        }
        if (!newReport.description.trim()) {
            errors.description = 'Description manquante';
        }
        if (newReport.price < 0) {
            errors.price = 'Le prix doit être supérieur ou égal à 0'
        }
        return errors;
    }

    // fonction pour poster un nouveau rapport
    const postnewReport = async () => {
        const validationErrors = validateReport(newReport);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/rapports/save/${userInStore.token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newReport,
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
                    clearStates()
                    router.push('/tous-les-rapports') // si admin renvoie vers listing
                } else { // si champs pas ok
                    onReportSuccess(); // appelle la fonction pour afficher l'alert success
                    clearStates()
                    router.push('/nouveau-rapport') // si ouvrier renvoie vers nouveau rapport
                }
            }
        } catch (error) {
            alert('There was a problem with the fetch operation:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header {...(userInStore.isAdmin ? { btn: true } : { title: "Nouveau rapport" })} />
            <div className="flex flex-col gap-8 lg:w-1/2 lg:m-auto">
                <div className="flex flex-col gap-4">
                    <LabelDefault htmlFor="type" text="Type de document" mandatory="(requis)" />
                    <RadioGroup id="type" defaultValue="facture" value={newReport.type} onValueChange={(value) => setnewReport({ ...newReport, type: value })}>
                        <div className="flex items-center space-x-4 h-12">
                            <RadioGroupItem value="facture" id="facture" className={newReport.type === "facture" ? "border-text-title-label" : "border-border-input-radio"} />
                            <LabelDefault htmlFor="facture" text="Facture" className="font-normal text-base" />
                        </div>
                        <div className="flex items-center space-x-4 h-12">
                            <RadioGroupItem value="devis" id="devis" className={newReport.type === "devis" ? "border-text-title-label" : "border-border-input-radio"} />
                            <LabelDefault htmlFor="devis" text="Devis" className="font-normal text-base" />
                        </div>
                    </RadioGroup>
                </div>
                <div className={`flex flex-col ${errors.date ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="date" text="Date d'intervention" mandatory="(requis)" />
                    {errors.date && <InputErrorDefault title={errors.date} />}
                    <InputDefault type="datetime-local" id="date" onChange={handleChange('date')} value={newReport.date} className={errors.date ? "error" : ""} />
                </div>
                <div className={`flex flex-col ${errors.clientName ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="clientName" text="Nom du client" mandatory="(requis)" />
                    {errors.clientName && <InputErrorDefault title={errors.clientName} />}
                    <InputDefault type="text" id="clientName" onChange={handleChange('clientName')} value={newReport.clientName} className={errors.clientName ? "error" : ""} />
                </div>
                <div className={`flex flex-col ${errors.addressOrPlaceOfRepair ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="addressOrPlaceOfRepair" text="Adresse ou lieu de réparation" mandatory="(requis)" />
                    {errors.addressOrPlaceOfRepair && <InputErrorDefault title={errors.addressOrPlaceOfRepair} />}
                    <InputDefault type="text" id="addressOrPlaceOfRepair" variant={`${errors.addressOrPlaceOfRepair && "error"}`} onChange={handleChange('addressOrPlaceOfRepair')} value={newReport.addressOrPlaceOfRepair} className={errors.addressOrPlaceOfRepair ? "error" : ""} />
                </div>
                <div className={`flex flex-col ${errors.equipmentRepaired ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="equipmentRepaired" text="Matériel réparé" mandatory="(requis)" />
                    {errors.equipmentRepaired && <InputErrorDefault title={errors.equipmentRepaired} />}
                    <InputDefault type="text" id="equipmentRepaired" onChange={handleChange('equipmentRepaired')} value={newReport.equipmentRepaired} className={errors.equipmentRepaired ? "error" : ""} />
                </div>
                <div className="flex flex-col gap-4">
                    <LabelDefault htmlFor="serialNumber" text="Numéro de série / parc" mandatory="(optionnel)" />
                    <InputDefault type="text" id="serialNumber" onChange={handleChange('serialNumber')} value={newReport.serialNumber} />
                </div>
                <div className="flex flex-col gap-4">
                    <LabelDefault htmlFor="equipmentHours" text="Heures du matériel" mandatory="(optionnel)" />
                    <InputDefault type="text" id="equipmentHours" onChange={handleChange('equipmentHours')} value={newReport.equipmentHours} />
                </div>
                <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                    <LabelDefault htmlFor="description" text="Description de l'intervention" mandatory="(requis)" />
                    {errors.description && <InputErrorDefault title={errors.description} />}
                    <TextAreaDefault id="description" onChange={handleChange('description')} value={newReport.description} className={errors.description ? "error" : ""} />
                    {/* <AutosizeTextarea id="description" onChange={handleChange('description')} value={newReport.description} className={errors.description ? "error" : ""}/> */}
                </div>
                {userInStore.isAdmin && (
                    <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                        <LabelDefault htmlFor="price" text="Prix de la facture" mandatory="(optionnel)" />
                        {errors.price && <InputErrorDefault title={errors.price} />}
                        <InputDefault type="number" id="price" onChange={handleChange('price')} value={newReport.price} className={errors.price ? "error" : ""} />
                    </div>
                )}
                <ButtonDefault onClick={postnewReport} loading={loading} text="Créer rapport" variant="addAdmin" size="addAdmin" />
            </div>
        </>
    )
}

export default NewReport