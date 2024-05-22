import React from "react";
import routes from "@/src/app/routes";

// components
import { Section, SectionHeading } from "../shared";
import Link from "next/link";

const DocumentHeader = ({
  activePage,
  updatedDate,
}: {
  activePage: "tou" | "privacy";
  updatedDate: string;
}) => {
  return (
    <>
      <Section className="text-left">
        <SectionHeading>Documents</SectionHeading>

        <div className="text-primary mt-6 mb-10">
          <div className={activePage === "tou" ? "font-semibold" : ""}>
            <Link href={routes.internal.tou}>Terms of Use</Link>
          </div>
          <div className={activePage === "privacy" ? "font-semibold" : ""}>
            <Link href={routes.internal.privacy}>Privacy Policy</Link>
          </div>
        </div>

        <div className="max-w-[400px] border-b border-secondary w-full m-auto"></div>

        <div className="mt-20 mb-12">
          <div className="text-2xl font-semibold mb-2">
            {activePage === "tou" ? "Terms Of Use" : "Privacy Policy"}
          </div>
          <div>Last updated: {updatedDate}</div>
        </div>
      </Section>
    </>
  );
};

export default DocumentHeader;
