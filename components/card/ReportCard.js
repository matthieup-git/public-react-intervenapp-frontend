import { useDispatch, useSelector } from "react-redux";
import { addRapportToStore } from "../../reducers/rapport";
import { useRouter } from "next/router";

import {
  ReportCardComponents,
  ReportCardComponentsDesktop,
  ReportCardHeader,
  ReportCardDetails,
  ReportCardDescription,
} from "../../src/components/components/ui/card/card";
import { Badge } from "../../src/components/components/ui/badge";

import { useWidth } from "../provider/WidthProvider";

import moment from "moment";
import "moment/locale/fr";

function ReportCard(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const userInStore = useSelector((state) => state.users.value);
  const { isMobile } = useWidth();

  const handleRapportSelected = () => {
    // rediriger vers /modifier-rapport + stocker les props dans le dispatch
    dispatch(addRapportToStore(props));
    router.push("/modifier-rapport");
  };

  let formattedDate = moment(props.date).locale("fr").format("DD MMMM YYYY"); // formatter la date

  return (
    <>
      {isMobile ? (
        <ReportCardComponents
          onClick={() => handleRapportSelected()}
          isDone={props.states.isDone}
        >
          <ReportCardHeader>
            <h3 className="font-bold text-xl text-text-title-blue">
              Rapport #{props.countDocument}
            </h3>
            <div className="flex flex-1 justify-end gap-4">
              <Badge variant="type">
                {props.type === "facture" ? "Facture" : "Devis"}
              </Badge>
              {props.states.isDone ? (
                <Badge variant="done">Traité</Badge>
              ) : (
                <Badge variant="notDone">Non Traité</Badge>
              )}
            </div>
          </ReportCardHeader>
          <ReportCardDetails>
            <div className="flex-2">
              <p>
                <span className="underline">Créé par :</span>{" "}
                {props.createdBy?.firstname} {props.createdBy?.lastname}
              </p>
              <p>{formattedDate}</p>
              <p>{props.clientName}</p>
              <p>{props.addressOrPlaceOfRepair}</p>
              <p>{props.equipmentRepaired}</p>
            </div>
            <div className="flex flex-1 justify-end">
              <p className="font-bold text-text-title-blue">
                {props?.price === 0 || null || !userInStore.isAdmin
                  ? "Prix à définir"
                  : props?.price + " €"}
              </p>
            </div>
          </ReportCardDetails>
          <ReportCardDescription>
            <p>
              {props.description.length > 80
                ? props.description.slice(0, 80) + "..."
                : props.description}
            </p>
          </ReportCardDescription>
        </ReportCardComponents>
      ) : (
        <ReportCardComponentsDesktop
          onClick={() => handleRapportSelected()}
          isDone={props.states.isDone}
        ></ReportCardComponentsDesktop>
      )}
    </>
  );
}

export default ReportCard;
