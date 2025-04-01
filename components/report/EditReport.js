import React from 'react'

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateReportInStore } from "../../reducers/report"

import InputDefault from '../components/InputDefault';
import TextAreaDefault from '../components/TextAreaDefault';
import ButtonDefault from "../components/ButtonDefault"
import LabelDefault from "../components/LabelDefault"
import InputErrorDefault from '../components/InputErrorDefault';

import { RadioGroup, RadioGroupItem } from "../../src/components/components/ui/radio-group"

function EditReport({ onModifyChange, onReportSuccess }) {

    const dispatch = useDispatch()

    const reportInStore = useSelector((state) => state.report.value);
    // console.log("reportInStore", reportInStore)

    const [dataToSend, setDataToSend] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    let date = new Date(reportInStore.date);

    // Obtenir les composants de la date et de l'heure en tenant compte du fuseau horaire local
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    // Construire la date au format local
    let localDate = `${year}-${month}-${day}T${hours}:${minutes}`;


    useEffect(() => {
        setDataToSend({ ...reportInStore, date: localDate })
    }, [])

    const handleTypeChange = (newValue) => {
        setDataToSend({ ...dataToSend, type: newValue });
    };

    const validateReport = (dataToSend) => {
        const errors = {};
        if (!dataToSend.date) {
            errors.date = 'Date manquante';
        }
        if (!dataToSend.clientName.trim()) {
            errors.clientName = 'Nom du client manquant';
        }
        if (!dataToSend.addressOrPlaceOfRepair.trim()) {
            errors.addressOrPlaceOfRepair = 'Adresse ou lieu de réparation manquant';
        }
        if (!dataToSend.equipmentRepaired.trim()) {
            errors.equipmentRepaired = 'Matériel réparé manquant';
        }
        if (!dataToSend.description.trim()) {
            errors.description = 'Description manquante';
        }
        if (dataToSend.price < 0 || dataToSend.price === "") {
            errors.price = 'Le prix doit être supérieur ou égal à 0'
        }
        return errors;
    }

    const sendUpdatedReport = async () => {
        const validationErrors = validateReport(dataToSend);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/reports/updatedReport/${reportInStore.token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: dataToSend.type,
                    date: dataToSend.date,
                    clientName: dataToSend.clientName,
                    addressOrPlaceOfRepair: dataToSend.addressOrPlaceOfRepair,
                    equipmentRepaired: dataToSend.equipmentRepaired,
                    serialNumber: dataToSend.serialNumber,
                    equipmentHours: dataToSend.equipmentHours,
                    description: dataToSend.description,
                    price: dataToSend.price === null || dataToSend.price === "" ? dataToSend.price = 0 : dataToSend.price,
                }),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedReport = await response.json();
            if (updatedReport.result) {
                onModifyChange(false);
                onReportSuccess(); // déclenche l'alert success
                dispatch(updateReportInStore(dataToSend)) // modifie le reducer
            } else {
                alert(updatedReport.error)
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-8 lg:w-1/2 lg:m-auto">
            <h1 className="font-bold text-2xl">Rapport #{reportInStore.countDocument}</h1>
            <div className="flex flex-col gap-4">
                <LabelDefault htmlFor="type" text="Type de document" mandatory="(requis)" />
                <RadioGroup id="type" value={dataToSend.type} onValueChange={handleTypeChange}>
                    <div className="flex items-center space-x-4 h-12">
                        <RadioGroupItem value="facture" id="facture" className={dataToSend.type === "facture" ? "border-text-title-label" : "border-border-input-radio"} />
                        <LabelDefault htmlFor="facture" text="Facture" className="font-normal text-base" />
                    </div>
                    <div className="flex items-center space-x-4 h-12">
                        <RadioGroupItem value="devis" id="devis" className={dataToSend.type === "devis" ? "border-text-title-label" : "border-border-input-radio"} />
                        <LabelDefault htmlFor="devis" text="Devis" className="font-normal text-base" />
                    </div>
                </RadioGroup>
            </div>
            <div className={`flex flex-col ${errors.date ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault text="Date d'intervention" htmlFor="date" mandatory="(requis)" />
                {errors.date && <InputErrorDefault title={errors.date} />}
                <InputDefault type="datetime-local" id="date" onChange={(e) => setDataToSend({ ...dataToSend, date: e.target.value })} value={dataToSend.date} className={errors.date ? "error" : ""} />
            </div>
            <div className={`flex flex-col ${errors.clientName ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault text="Nom du client" htmlFor="clientName" mandatory="(requis)" />
                {errors.clientName && <InputErrorDefault title={errors.clientName} />}
                <InputDefault type="text" id="clientName" onChange={(e) => setDataToSend({ ...dataToSend, clientName: e.target.value })} value={dataToSend.clientName} className={errors.clientName ? "error" : ""} />
            </div>
            <div className={`flex flex-col ${errors.addressOrPlaceOfRepair ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault text="Adresse ou lieu de réparation" htmlFor="addressOrPlaceOfRepair" mandatory="(requis)" />
                {errors.addressOrPlaceOfRepair && <InputErrorDefault title={errors.addressOrPlaceOfRepair} />}
                <InputDefault type="text" id="addressOrPlaceOfRepair" onChange={(e) => setDataToSend({ ...dataToSend, addressOrPlaceOfRepair: e.target.value })} value={dataToSend.addressOrPlaceOfRepair} className={errors.addressOrPlaceOfRepair ? "error" : ""} />
            </div>
            <div className={`flex flex-col ${errors.equipmentRepaired ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault text="Matériel réparé" htmlFor="equipmentRepaired" mandatory="(requis)" />
                {errors.equipmentRepaired && <InputErrorDefault title={errors.equipmentRepaired} />}
                <InputDefault type="text" id="equipmentRepaired" onChange={(e) => setDataToSend({ ...dataToSend, equipmentRepaired: e.target.value })} value={dataToSend.equipmentRepaired} className={errors.equipmentRepaired ? "error" : ""} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Numéro de série / parc" htmlFor="serialNumber" mandatory="(optionnel)" />
                <InputDefault type="text" id="serialNumber" onChange={(e) => setDataToSend({ ...dataToSend, serialNumber: e.target.value })} value={dataToSend.serialNumber} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelDefault text="Heures du matériel" htmlFor="equipmentHours" mandatory="(optionnel)" />
                <InputDefault type="text" id="equipmentHours" onChange={(e) => setDataToSend({ ...dataToSend, equipmentHours: e.target.value })} value={dataToSend.equipmentHours} />
            </div>
            <div className={`flex flex-col ${errors.description ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault text="Description de l'intervention" htmlFor="description" mandatory="(requis)" />
                {errors.description && <InputErrorDefault title={errors.description} />}
                <TextAreaDefault id="description" onChange={(e) => setDataToSend({ ...dataToSend, description: e.target.value })} value={dataToSend.description} className={errors.description ? "error" : ""} />
            </div>
            <div className={`flex flex-col ${errors.price ? 'gap-2' : 'gap-4'}`}>
                <LabelDefault text="Prix" htmlFor="price" mandatory="(optionnel)" />
                {errors.price && <InputErrorDefault title={errors.price} />}
                <InputDefault type="number" id="price" onChange={(e) => setDataToSend({ ...dataToSend, price: e.target.value })} value={dataToSend.price} className={errors.price ? "error" : ""} />
            </div>
            <ButtonDefault onClick={sendUpdatedReport} loading={loading} text="Sauvegarder les modifications" variant="addAdmin" size="addAdmin" />
        </div>
    )
}

export default EditReport;