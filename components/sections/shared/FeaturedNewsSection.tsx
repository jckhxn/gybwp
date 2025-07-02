import FeaturedNews from "@/src/app/(website)/components/FeaturedNews";

interface FeaturedNewsSectionProps {
  section: {
    _type: "featuredNews";
    _key: string;
    title?: string;
    subtitle?: string;
    color?: "light" | "secondary";
    hideHeading?: boolean;
    hideBadge?: boolean;
  };
}

export function FeaturedNewsSection({ section }: FeaturedNewsSectionProps) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-off-white rounded-xl mt-8 mb-6">
      <FeaturedNews
        color={section.color || "light"}
        hideHeading={section.hideHeading || false}
        hideBadge={section.hideBadge || false}
      />
    </section>
  );
}
