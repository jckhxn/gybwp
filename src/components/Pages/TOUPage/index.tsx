import React from "react";

// components
import { Section } from "components/shared";
import DocumentHeader from "components/DocumentHeader";

// copy
import { TOU_VERBIAGE, UPDATED_DATE } from "./static-data";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const TOUPageComponent = () => {
  return (
    <>
      <Section className="mt-12 md:mt-20 mx-[10vw]">
        <DocumentHeader activePage="tou" updatedDate={UPDATED_DATE} />

        {TOU_VERBIAGE.map(({ sectionName, body }, idx) => (
          <div key={`tou-section-${sectionName || idx}`} className="mt-6">
            {sectionName && <div className="font-semibold">{sectionName}</div>}

            {body.map((section, bodyIdx) => (
              <div
                key={`tou-section-${sectionName}-${idx}.${bodyIdx}`}
                className="mt-3"
              >
                {sectionName && `${idx}.${bodyIdx + 1}`} {`${section}`}
              </div>
            ))}
          </div>
        ))}
      </Section>
    </>
  );
};

export default TOUPageComponent;
