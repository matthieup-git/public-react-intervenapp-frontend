import * as React from "react"

import { cn } from "@components/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full",
        "bg-input-bg-add border border-ring text-text-title-blue text-base flex h-9 w-full min-w-0 rounded-lg px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-input-stroke-selected-add focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
