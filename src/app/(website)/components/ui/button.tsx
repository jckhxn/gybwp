import React, { forwardRef } from "react";
import classNames from "classnames";
import { cva, type VariantProps } from "class-variance-authority";

// Define button variants using cva for shadcn compatibility
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        outline:
          "border border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "text-primary hover:bg-primary-light",
        link: "text-primary underline-offset-4 hover:underline p-0",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        default: "px-4 py-2",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      className,
      onClick,
      type = "button",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={classNames(buttonVariants({ variant, size }), className)}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
