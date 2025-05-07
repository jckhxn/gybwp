import React, { forwardRef } from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      className,
      onClick,
      type = "submit",
      disabled = false,
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
      default: "bg-primary text-white hover:bg-primary-dark",
      outline:
        "border border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-primary hover:bg-primary-light",
      link: "text-primary underline-offset-4 hover:underline p-0",
    };
    const sizeStyles = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classNames(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
