import * as React from "react"

import { cn } from "../../../lib/utils"

interface ReportCardComponentsProps extends React.HTMLAttributes<HTMLDivElement> {
  isDone: boolean;
}

const ReportCardComponents: React.FC<ReportCardComponentsProps> = ({
  className,
  isDone,
  ...props
}) => {
  // Détermine la classe de fond en fonction de l'état `isDone`
  const bg = isDone ? "lg:bg-bg-card-green-isdone" : "lg:bg-bg-card";

  return (
    <div
      data-slot="report-card"
      className={cn(
        `${bg} gap-y-1 max-h-[230px] bg-bg-card grid grid-rows-[1fr_2fr_1fr] rounded-xl border p-4 shadow-sm`,
        className
      )}
      {...props}
    />
  );
};

function ReportCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="report-card-header"
      className={cn(
        "flex items-center",
        className
      )}
      {...props}
    />
  )
}

function ReportCardDetails({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="report-card-details"
      className={cn(
        "flex text-sm text-text-card-grey-weak ",
        className
      )}
      {...props}
    />
  )
}

function ReportCardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="report-card-description"
      className={cn(
        "text-sm text-text-card-grey-weak",
        className
      )}
      {...props}
    />
  )
}

export { ReportCardComponents, ReportCardHeader, ReportCardDetails, ReportCardDescription, }
