import * as React from "react"

import { cn } from "@components/lib/utils"

function ReportCardDetailsComponent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-details"
            className={cn(
                "gap-4 min-h-[350px] bg-bg-card rounded-xl border p-4 shadow-sm flex flex-col",
                className
            )}
            {...props}
        />
    )
}

function ReportCardRow({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-row"
            className={cn(
                "flex",
                className
            )}
            {...props}
        />
    )
}

function ReportCardColumn({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-column"
            className={cn(
                "flex flex-col flex-1",
                className
            )}
            {...props}
        />
    )
}

function ReportCardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <h3
            data-slot="card-title"
            className={cn(
                "text-text-card-grey-weak",
                className
            )}
            {...props}
        />
    )
}

function ReportCardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <p
            data-slot="card-content"
            className={cn(
                "font-semibold",
                className
            )}
            {...props}
        />
    )
}


export { ReportCardDetailsComponent, ReportCardRow, ReportCardColumn, ReportCardTitle, ReportCardContent }
