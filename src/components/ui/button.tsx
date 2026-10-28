import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Oxford Blue solid */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        /** Signal Red: primary commercial actions only */
        signal: "bg-signal text-white hover:bg-signal-dark",
        /** Oxford Blue outline */
        outline: "border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary/5",
        /** Tonal utility button */
        tertiary: "bg-tonal text-primary hover:bg-primary/10",
        ghost: "text-primary hover:bg-primary/5",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-6 py-2.5 text-base",
        sm: "min-h-11 px-4 py-2 text-sm",
        lg: "min-h-12 px-7 py-3 text-base",
        icon: "size-11",
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
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
