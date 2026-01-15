import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/src/lib/utils"
import { Button, ButtonProps } from "./button"

// Clean professional button without complex effects
export interface ExecutiveButtonProps extends ButtonProps {
  // Removed shimmer and glow props for cleaner design
}

const ExecutiveButton = React.forwardRef<HTMLButtonElement, ExecutiveButtonProps>(
  ({ className, variant = "primary", size = "lg", children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          // Clean professional styling
          "font-medium tracking-wide",
          className
        )}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
ExecutiveButton.displayName = "ExecutiveButton"

// Clean professional CTA button
export const ProfessionalCTA = React.forwardRef<HTMLButtonElement, ExecutiveButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ExecutiveButton
        variant="primary"
        className={cn(
          "shadow-sm hover:shadow-md",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="flex items-center gap-2">
          {children}
        </span>
      </ExecutiveButton>
    )
  }
)
ProfessionalCTA.displayName = "ProfessionalCTA"

// Clean authority button for leadership content
export const AuthorityButton = React.forwardRef<HTMLButtonElement, ExecutiveButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ExecutiveButton
        variant="primary"
        className={cn(className)}
        ref={ref}
        {...props}
      >
        <span className="flex items-center gap-2">
          {children}
        </span>
      </ExecutiveButton>
    )
  }
)
AuthorityButton.displayName = "AuthorityButton"

// Clean subtle button for modern feel
export const GlassButton = React.forwardRef<HTMLButtonElement, ExecutiveButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ExecutiveButton
        variant="subtle"
        className={cn(
          "hover:shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="flex items-center gap-2">
          {children}
        </span>
      </ExecutiveButton>
    )
  }
)
GlassButton.displayName = "GlassButton"

export { ExecutiveButton }