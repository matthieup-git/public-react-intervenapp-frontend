import { useDispatch, useSelector } from "react-redux";
import { addReportToStore } from "../../reducers/report";
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
  const { isDesktop } = useWidth();

  const handleReportSelected = () => {
    // rediriger vers /modifier-rapport + stocker les props dans le dispatch
    dispatch(addReportToStore(props));
    router.push("/modifier-rapport");
  };

  let formattedDate = moment(props.date).locale("fr").format("DD MMMM YYYY"); // formatter la date
  const displayDescription = props.description
    ? props.description?.replace(/\n/g, "<br>")
    : "";

  const getCommonClassesDesktop = () => "flex flex-col justify-center flex-1 ";

  const createdBy = props.createdBy?.lastname.slice(0,1).toUpperCase() + props.createdBy?.lastname.slice(1).toLowerCase() + " " + props.createdBy?.firstname.slice(0,1).toUpperCase() + props.createdBy?.firstname.slice(1).toLowerCase()

  return (
    <>
      {!isDesktop ? (
        <ReportCardComponents
          onClick={() => handleReportSelected()}
          isDone={props.states.isDone}>
          <ReportCardHeader>
            <h3 className="font-bold text-xl text-text-title-blue">
              <p>Rapport #{props.countDocument}</p>
            </h3>
            <div className="flex flex-1 justify-end gap-4">
              <Badge variant="type">
                <p>{props.type === "facture" ? "Facture" : "Devis"}</p>
              </Badge>
              <p>
                {props.states.isDone ? (
                  <Badge variant="done">Traité</Badge>
                ) : (
                  <Badge variant="notDone">Non Traité</Badge>
                )}
              </p>
            </div>
          </ReportCardHeader>
          <ReportCardDetails>
            <div className="flex-2">
              <p>
                <span className="underline">Créé par :</span>{" "}
                {createdBy}
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
          onClick={() => handleReportSelected()}
          isDone={props.states.isDone}>
          <div className={getCommonClassesDesktop()}>
            <p>Rapport #{props.countDocument}</p>
            <p>{formattedDate}</p>
          </div>
          <div className={getCommonClassesDesktop()}>
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
          </div>
          <div className={getCommonClassesDesktop()}>
            <p>{formattedDate}</p>
            </div>
          <div className={getCommonClassesDesktop()}>
            <p>{props.clientName}</p>
          </div>
          <div className={getCommonClassesDesktop()}>
            <p>{props.addressOrPlaceOfRepair}</p>
          </div>
          <div className={getCommonClassesDesktop()}>
            <p>{props.equipmentRepaired}</p>
          </div>
          <div className={getCommonClassesDesktop()}>
            <p>{props.serialNumber}</p>
          </div>
          <div className={getCommonClassesDesktop()}>
            <p>{props.equipmentHours}</p>
          </div>
          <div className="flex flex-col flex-2 justify-center text-left">
            <p dangerouslySetInnerHTML={{ __html: displayDescription }} />
          </div>
          <div className={getCommonClassesDesktop()}>
            <p>
              {props?.price === 0 || null || !userInStore.isAdmin
                ? "Prix à définir"
                : props?.price + " €"}
            </p>
          </div>
          <div className={getCommonClassesDesktop()}>
            <p>{props.states.isDone ? "Traité" : "Non Traité"}</p>
          </div>
        </ReportCardComponentsDesktop>
      )}
    </>
  );
}

export default ReportCard;
