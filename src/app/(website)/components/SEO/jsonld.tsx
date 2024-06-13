import React from "react";

type Props = { data: JSON };

const JSONLD = (data: Props) => {
  return (
    <script
      type="application/ld+json"
      key="jsonld-data"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JSONLD;
