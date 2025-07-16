import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

export type ButtonColors = "main" | "primary" | "secondary" | "white" | "light";

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  as?: "a";
  href?: string;
  target?: string;
  rel?: string;
  color?: ButtonColors;
  type?: "default" | "icon" | "disabled";
  className?: string;
}

const Button = ({
  children,
  onClick: handleClick,
  as,
  href,
  target,
  rel,
  color = "main",
  type = "default",
  className: passedClasses = "",
}: ButtonProps) => {
  let fontStyle = color === "white" ? "text-black" : "text-white";
  let bgColor = "";
  let bgHoverColor = "";

  switch (color) {
    case "main":
      bgColor = "bg-main";
      bgHoverColor = "hover:bg-main/80";
      break;
    case "primary":
      bgColor = "bg-primary";
      bgHoverColor = "hover:bg-primary/80";
      break;
    case "secondary":
      bgColor = "bg-secondary";
      bgHoverColor = "hover:bg-secondary/80";
      break;
    case "white":
      bgColor = "bg-white";
      bgHoverColor = "hover:bg-white/80";
      break;
    case "light":
      bgColor = "bg-gray-100";
      bgHoverColor = "hover:bg-gray-200";
      break;
    default:
      bgColor = "bg-primary";
      bgHoverColor = "hover:bg-primary/80";
      break;
  }

  const buttonClasses = `inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200 ${bgColor} ${bgHoverColor} ${fontStyle} ${passedClasses}`;

  let button;

  if (as === "a" && href) {
    if (href.startsWith("http")) {
      button = (
        <a
          href={href}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className={buttonClasses}
          onClick={handleClick}
        >
          {children}
        </a>
      );
    } else {
      button = (
        <Link href={href} className={buttonClasses} onClick={handleClick}>
          {children}
        </Link>
      );
    }
  } else {
    button = (
      <button
        type="button"
        className={buttonClasses}
        onClick={handleClick}
        disabled={type === "disabled"}
      >
        {children}
      </button>
    );
  }

  return button;
};

export default Button;
