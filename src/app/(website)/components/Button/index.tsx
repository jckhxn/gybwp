import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

export type ButtonColors = "main" | "primary" | "secondary" | "white" | "light";

interface ButtonProps {
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

  let bgColor: string;
  let bgHoverColor: string;
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
      bgColor = "bg-light";
      bgHoverColor = "hover:bg-light/80";
      break;
    default:
      bgColor = "bg-main";
      bgHoverColor = "hover:bg-main/80";
      break;
  }

  let disabledStyle = "";
  if (type === "disabled") {
    bgColor = `bg-white`;
    bgHoverColor = `hover:bg-white/80`;
    fontStyle = "black";
    disabledStyle = "border border-grey border-1 !cursor-not-allowed";
  }

  const button = (
    <button
      disabled={type === "disabled"}
      onClick={handleClick}
      className={`inline-block rounded ${bgColor} text-sm ${fontStyle} transition ${bgHoverColor} ${passedClasses} ${disabledStyle}`}
    >
      {children}
    </button>
  );

  if (as === "a") {
    return (
      <Link
        href={href || "/"}
        target={target}
        rel={rel}
        onClick={handleClick}
        className="w-fit"
      >
        {button}
      </Link>
    );
  }

  return button;
};

export default Button;
