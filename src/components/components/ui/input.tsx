import * as React from "react"

import { cn } from "@components/lib/utils"

function Input({ className, type, min = 0, ...props }: React.ComponentProps<"input">) {

  const inputMin = type === "number" ? 0 : min;

  return (
    <input
      type={type}
      min={inputMin}
      data-slot="input"
      className={cn(
        "bg-input-bg-add border border-ring text-text-title-blue text-base flex h-9 w-full min-w-0 rounded-lg px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-input-stroke-selected-add focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input };
