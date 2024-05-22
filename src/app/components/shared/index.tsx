import React, { RefObject, HTMLAttributes } from "react";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOURE A DEV

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  relative?: boolean;
  flex?: boolean;
  style?: React.CSSProperties;
  innerRef?: RefObject<HTMLDivElement>;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  relative = false,
  flex = false,
  className: passedClasses = "",
  style = {},
  innerRef,
  id,
}) => {
  const defaultClasses = flex ? "flex flex-col items-center" : "";
  const relativeClasses = relative ? "relative" : "";
  const classes = `${defaultClasses} ${passedClasses} ${relativeClasses}`;

  if (innerRef) {
    return (
      <section id={id} className={classes} style={style} ref={innerRef}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={classes} style={style}>
      {children}
    </section>
  );
};

export const SectionHeading: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
}) => <h2 className={`${className} text-2xl md:text-4xl`}>{children}</h2>;

export const generateImage = ({
  text,
  foregroundColor = "#000000",
  backgroundColor = "#F2F2F3",
  width = 300,
  height = 170,
}: {
  text: string;
  foregroundColor?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}) => {
  if (typeof window !== "undefined") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    if (!context) {
      return null;
    }

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 28px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
  }

  return "";
};
