import React from "react";

import { ChevronsUpDown, ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

function FiltersBar({ filteringDate, isAscending }) {

  const getCommonClassesDesktop = () => "flex flex-1 justify-center items-center";

  const ChevronsIcon = <ChevronsUpDown strokeWidth={2} size={20} />;

  const filteringDateIcon = isAscending ? <ArrowDownNarrowWide strokeWidth={2} size={20} /> : <ArrowUpNarrowWide strokeWidth={2} size={20} />

  return (
    <div className="flex bg-bg-filtersbar h-14 outline outline-badge-stroke-type-grey rounded-t-sm text-text-filtersbar items-center justify-center p-4">
      <div className={getCommonClassesDesktop()} onClick={filteringDate}>
        <p>Horodateur</p>
        {filteringDateIcon}
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>Type</p>
        {ChevronsIcon}
      </div>
      <div className={getCommonClassesDesktop()}>
        <p className="leading-4 text-center">Date d'intervention</p>
        {ChevronsIcon}
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>Client</p>
        {ChevronsIcon}
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>Adresse</p>
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>Matériel</p>
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>N° Série</p>
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>Heures</p>
      </div>
      <div className="flex-2 text-left">
        <p>Description</p>
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>Prix</p>
        {ChevronsIcon}
      </div>
      <div className={getCommonClassesDesktop()}>
        <p>Status</p>
        {ChevronsIcon}
      </div>
    </div>
  );
}

export default FiltersBar;
