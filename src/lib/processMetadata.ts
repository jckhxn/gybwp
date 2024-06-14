import type { Metadata } from "next";

interface Data {
  seo?: {
    title?: string;
    description?: string;
    ogimage?: string[];
    noIndex?: boolean;
  };

  pathname?: {
    current?: string;
  };
}

export default async function processMetadata(data: Data): Promise<Metadata> {
  const { title, description, ogimage, noIndex } = data?.seo || {};
  // @ts-ignore
  const [{ blurb, youtube, url }] = data.data;

  return {
    metadataBase: new URL("https://gybwp.com"),
    title: youtube.title || "No title",
    description: blurb || "No description",

    openGraph: {
      type: "website",
      url: youtube
        ? `https://www.youtube.com/watch?v=${youtube.id}`
        : "https://gybwp.com/" + (data?.pathname?.current || ""),
      title,
      description,

      images: [
        {
          url:
            youtube.thumbnail ||
            ogimage ||
            "https://gybwp.com/images/logo.webp",

          width: 1200,
          height: 630,
        },
      ],

      videos: [
        // Embed the youtube video in the opengraph embed.
        {
          url: url,
          secureUrl: `https://www.youtube.com/embed/${youtube.id}`,
          type: "video.other",
        },
      ],
    },
    alternates: {
      canonical: url
        ? url
        : "https://gybwp.com/" + (data?.pathname?.current || ""),
    },
    robots: {
      index: !noIndex,
    },
  };
}
