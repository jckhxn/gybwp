import Script from "next/script";
import React from "react";

import type { BlogPosting, WithContext } from "schema-dts";

const schema: WithContext<BlogPosting> = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Welcome to my website",
  description: "A blog post welcoming you to my website",
  image: "https://example.com/photos/1x1/photo.jpg",
};
type Props = { data: any };

const JSONLD = (data: Props) => {
  return (
    <script
      type="application/ld+json"
      key="jsonld-data"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JSONLD;
