import { SponsorCard } from "./SponsorCard";

interface SponsorsListProps {
  sponsors: Array<{
    _id?: string;
    name: string;
    uuid?: string;
    slug?: { current: string };
    logo?: any;
    image?: string;
    description?: string;
    website?: string;
    tier?: string;
    bgColor?: string;
  }>;
  layout?: "grid" | "horizontal";
  size?: "small" | "medium" | "large";
  title?: string;
  className?: string;
  noContainer?: boolean;
}

export function SponsorsList({
  sponsors,
  layout = "grid",
  size = "medium",
  title = "Sponsored by",
  className,
  noContainer = false,
}: SponsorsListProps) {
  if (!sponsors?.length) return null;

  const layoutClasses = {
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8",
    horizontal: "flex flex-wrap items-center justify-center gap-4",
  };

  const containerClass = className || `sponsors-list ${layoutClasses[layout]}`;

  const content = (
    <>
      {title && (
        <h3 className="sponsors-title text-lg font-semibold mb-4 text-center">
          {title}
        </h3>
      )}
      <div className={containerClass}>
        {sponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor._id || sponsor.uuid || sponsor.name}
            sponsor={sponsor}
            size={size}
          />
        ))}
      </div>
    </>
  );

  if (noContainer) {
    return content;
  }

  return (
    <div className="sponsors-section my-8 p-6 bg-gray-50 rounded-lg">
      {content}
    </div>
  );
}
