import React from "react";
export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body>{children}</body>
    </>
  );
}
