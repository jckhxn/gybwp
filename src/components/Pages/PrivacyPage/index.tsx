import React from "react";

// components
import { Section } from "components/shared";
import DocumentHeader from "components/DocumentHeader";
import { PRIVACY_POLICY_VERBIAGE, UPDATED_DATE } from "./static-data";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const PrivacyPageComponent = () => {
  return (
    <>
      <Section className="mt-20 mx-[10vw]">
        <DocumentHeader activePage="privacy" updatedDate={UPDATED_DATE} />

        {PRIVACY_POLICY_VERBIAGE.map(
          ({ sectionName, subHeader, body }, idx) => (
            <div key={`privacy-section-${sectionName || idx}`} className="mt-6">
              {sectionName && (
                <div className="font-semibold">{sectionName}</div>
              )}

              {subHeader && <div className="italic">{subHeader}</div>}

              {body.map((section, bodyIdx) => (
                <div
                  key={`privacy-section-${sectionName}-${idx}.${bodyIdx}`}
                  className={`mt-3 ${subHeader ? "list-item ml-4" : ""}`}
                >
                  {`${section}`}
                </div>
              ))}
            </div>
          )
        )}
      </Section>
    </>
  );
};

export default PrivacyPageComponent;
