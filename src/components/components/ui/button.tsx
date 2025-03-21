import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@components/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-md font-btn whitespace-nowrap duration-100 ease-in cursor-pointer",
  // "disabled:pointer-events-auto disabled:opacity-50",
  // "[&_svg]:pointer-events-auto [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
  // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        addAdmin: "bg-btn-bg-add text-white focus:outline-btn-outline-add-focus focus:outline-1 focus:outline-offset-2",
        addWorker: "",
        return: "text-btn-text-return underline underline-offset-3 hover:bg-btn-bg-return-hover hover:no-underline active:bg-btn-bg-return-active",
        modify: "text-btn-text-modify bg-btn-bg-modify border border-btn-stroke-modify hover:bg-btn-bg-modify-hover active:bg-btn-bg-modify-active"
      },
      size: {
        default: "h-9 px-4 py-2",
        addAdmin: "h-[48px] w-10/10",
        addWorker: "",
        return: "h-9 px-4 py-2",
        modify: "h-[48px] w-24"
        // sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        // lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        // icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
