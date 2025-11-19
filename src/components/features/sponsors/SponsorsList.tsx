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
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10",
    horizontal: "flex flex-wrap items-center justify-center gap-6",
  };

  const containerClass = className || `sponsors-list ${layoutClasses[layout]}`;

  const content = (
    <>
      {title && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-professional mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Partners</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-main">
            {title}
          </h3>
        </div>
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
    <div className="sponsors-section my-12 p-10 bg-white rounded-2xl border border-gray-100/50 shadow-professional">
      {content}
    </div>
  );
}
