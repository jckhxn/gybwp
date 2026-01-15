import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 ease-smooth-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-surface-900 text-white rounded-xl shadow-soft hover:bg-surface-800 hover:shadow-medium hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-surface-900",
        primary: "bg-primary text-white rounded-xl shadow-soft hover:bg-primary-dark hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-primary",
        secondary: "bg-secondary text-white rounded-xl shadow-soft hover:bg-secondary-dark hover:shadow-medium hover:-translate-y-0.5 focus-visible:ring-secondary",
        destructive: "bg-red-500 text-white rounded-xl shadow-soft hover:bg-red-600 hover:shadow-medium focus-visible:ring-red-500",
        outline: "bg-transparent text-surface-900 rounded-xl border-2 border-surface-200 hover:border-primary hover:text-primary hover:bg-primary/5 focus-visible:ring-primary",
        subtle: "bg-surface-100 text-surface-900 rounded-xl hover:bg-surface-200 focus-visible:ring-surface-400",
        ghost: "text-surface-600 rounded-xl hover:bg-surface-100 hover:text-surface-900 focus-visible:ring-surface-400",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
        glass: "bg-white/10 text-white rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 focus-visible:ring-white",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm rounded-xl",
        sm: "h-9 px-4 text-sm rounded-lg",
        lg: "h-12 px-6 text-base rounded-xl",
        xl: "h-14 px-8 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
