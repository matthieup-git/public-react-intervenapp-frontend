import { useSelector } from "react-redux";

import { useState } from "react";

import { ReportCardDetailsComponent, ReportCardRow, ReportCardColumn, ReportCardTitle, ReportCardContent } from "../../src/components/components/ui/card/card-details";

import ButtonDefault from "../components/ButtonDefault";
import SwitchStatus from "../components/SwitchStatus";

import moment from "moment";
import "moment/locale/fr";

function ReportCardDetails({ onModifyChange, alertIsVisible }) {
  const reportInStore = useSelector((state) => state.report.value);
  const description = reportInStore?.description;
  const [isDone, setIsDone] = useState(reportInStore?.states?.isDone);

  const formattedDate = reportInStore?.date ? moment(reportInStore?.date).locale("fr").format("DD MMMM YYYY") : "";

  const toModify = () => {
    if (onModifyChange) {
      onModifyChange(true);
    }
  };

  const displayDescription = description ? description?.replace(/\n/g, "<br>") : "";

  const createdBy = reportInStore.createdBy?.lastname.slice(0, 1).toUpperCase() + reportInStore.createdBy?.lastname.slice(1).toLowerCase() + " " + reportInStore.createdBy?.firstname.slice(0, 1).toUpperCase() + reportInStore.createdBy?.firstname.slice(1).toLowerCase();

  return (
    <div className={`flex flex-col gap-4 lg:w-1/2 lg:m-auto ${alertIsVisible && "after:mb-2"}`}>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Rapport #{reportInStore?.countDocument}</h1>
        <ButtonDefault onClick={toModify} text="Modifier" variant="modify" size="modify" />
      </div>

      <div className="flex flex-col justify-center gap-2">
        <span className="font-bold text-lg">Statut</span>
        <div className="flex gap-6 items-center">
          <div>Non traité</div>
          <SwitchStatus isDone={isDone} setIsDone={setIsDone} token={reportInStore?.token} />
          <div>Traité</div>
        </div>
        <p>
          <span className="underline">Créé par :</span> {createdBy}
        </p>
      </div>

      <ReportCardDetailsComponent>
        <ReportCardRow>
          <ReportCardColumn>
            <ReportCardTitle>Type</ReportCardTitle>
            <ReportCardContent>{reportInStore?.type === "facture" ? "Facture" : "Devis"}</ReportCardContent>
          </ReportCardColumn>
          <ReportCardColumn>
            <ReportCardTitle>Date d'intervention</ReportCardTitle>
            <ReportCardContent>{formattedDate}</ReportCardContent>
          </ReportCardColumn>
        </ReportCardRow>
        <ReportCardRow>
          <ReportCardColumn>
            <ReportCardTitle>Client</ReportCardTitle>
            <ReportCardContent>{reportInStore?.clientName}</ReportCardContent>
          </ReportCardColumn>
          <ReportCardColumn className="flex flex-col flex-1">
            <ReportCardTitle>Localisation</ReportCardTitle>
            <ReportCardContent>{reportInStore?.addressOrPlaceOfRepair}</ReportCardContent>
          </ReportCardColumn>
        </ReportCardRow>
        <ReportCardRow>
          <ReportCardColumn>
            <ReportCardTitle>Equipement</ReportCardTitle>
            <ReportCardContent>{reportInStore?.equipmentRepaired}</ReportCardContent>
          </ReportCardColumn>
          <ReportCardColumn>
            <ReportCardTitle>N° de série</ReportCardTitle>
            <ReportCardContent>{reportInStore?.serialNumber}</ReportCardContent>
          </ReportCardColumn>
        </ReportCardRow>
        <ReportCardRow>
          <ReportCardColumn>
            <ReportCardTitle>Heures</ReportCardTitle>
            <ReportCardContent>{reportInStore?.equipmentHours}</ReportCardContent>
          </ReportCardColumn>
          <ReportCardColumn>
            <ReportCardTitle>Prix</ReportCardTitle>
            <ReportCardContent>{reportInStore?.price === 0 ? "Prix à définir" : reportInStore?.price + " €"}</ReportCardContent>
          </ReportCardColumn>
        </ReportCardRow>
        <ReportCardRow>
          <ReportCardColumn>
            <ReportCardTitle>Description</ReportCardTitle>
            <ReportCardContent dangerouslySetInnerHTML={{ __html: displayDescription }} />
          </ReportCardColumn>
        </ReportCardRow>
      </ReportCardDetailsComponent>
    </div>
  );
}

export default ReportCardDetails;
