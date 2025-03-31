import React, { useEffect, useState } from "react";

import ButtonDefault from "../components/components/ButtonDefault";
import Header from "../components/Header";
import ReportCard from "../components/card/ReportCard";
import FiltersBar from "../components/FiltersBar";

import Loading from "../components/components/Loading";

import { useDispatch, useSelector } from "react-redux";
import { deleteRapportToStore } from "../reducers/rapport";

import { useWidth } from "../components/provider/WidthProvider";

import { useRouter } from "next/router";

function AllReportsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInStore = useSelector((state) => state.users.value);
  const { isDesktop } = useWidth();
  const [reports, setReports] = useState([]); // Etat pour afficher tous les rapports
  const [loading, setLoading] = useState(true); // Etat du loader
  const [isAscending, setIsAscending] = useState(true); // Etat pour filtrer par date

  useEffect(() => {
    dispatch(deleteRapportToStore()); // Supprimer le rapport du store à chaque changement de userInStore
    if (Object.keys(userInStore).length === 0 || !userInStore.isAdmin) {
      router.push("/"); // Rediriger vers la page d'accueil si userInStore est vide
    } else {
      getReports(); // Si l'utilisateur est admin, récupérer les rapports
    }
  }, [userInStore]);

  // useEffect(() => {
  //   if (!isDesktop){
  //     setIsAscending(true)
  //   }
  // }, [isDesktop])

  // Fonction pour afficher tous les rapports
  const getReports = async () => {
    try {
      setLoading(true); // loading

      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/rapports`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reports = await response.json();
      setReports(reports.data); // stock dans l'état les rapports
    } catch (error) {
      alert("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false); // loading false
    }
  };

  // Etat pour la gestion du tri croissant ou décroissant des dates
  const filteringDate = () => {
    setIsAscending(!isAscending);
  };

  // Tri croissant ou décroissant
  const sortedReports = [...reports].sort((a, b) => {
    if (isAscending){
      return new Date(b.date) - new Date(a.date)
    } else {
      return new Date(a.date) - new Date(b.date)
    }
  })

  const dataReports =
    sortedReports.length === 0 ? (
      <p>Aucun rapport enregistré, veuillez en créer un.</p>
    ) : (
      sortedReports.map((data) => {
        return <ReportCard key={data.token} {...data} />;
      })
    );

  return (
    <>
      <Header btn={false} title="Liste des rapports" />
      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {isDesktop && <FiltersBar filteringDate={filteringDate} isAscending={isAscending} />}
          <div className="flex flex-col gap-4 lg:gap-0 after:mb-24 lg:after:mb-12">{dataReports}</div>
        </>
      )}
      {!isDesktop && (
        <div className="fixed bottom-0 left-0 right-0 h-[80px] bg-fixed-contain-bg-grey flex flex-col justify-center items-center shadow-[0px_0px_8px_5px_rgba(0,0,0,0.1)]">
          <div className="w-[95vw]">
            <ButtonDefault variant="addAdmin" size="addAdmin" text="Créer un nouveau rapport" destination="/nouveau-rapport" />
          </div>
        </div>
      )}
    </>
  );
}

export default AllReportsPage;
