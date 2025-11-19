import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-gray-50 hover:bg-gray-800",
        destructive: "bg-red-500 text-gray-50 hover:bg-red-600",
        outline: "border border-gray-200 bg-white hover:bg-gray-50 hover:text-gray-900",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-gray-900 underline-offset-4 hover:underline",
        // Clean single-color button variants
        primary: "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary",
        professional: "bg-main text-white hover:bg-main-dark focus-visible:ring-main",
        premium: "bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary",
        subtle: "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200",
        authority: "bg-white text-main border-2 border-primary hover:border-primary/80 hover:bg-primary/5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // Clean sizes without excessive styling
        executive: "h-12 px-8 py-3 text-base rounded-lg",
        premium: "h-14 px-10 py-4 text-lg rounded-xl",
        compact: "h-8 px-4 py-1 text-xs rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
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
