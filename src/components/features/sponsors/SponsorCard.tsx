import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/src/lib/sanity-image";

interface SponsorCardProps {
  sponsor: {
    _id?: string;
    name: string;
    uuid?: string;
    slug?: { current: string };
    logo?: any;
    image?: string; // Legacy field
    description?: string;
    website?: string;
    tier?: string;
    bgColor?: string;
  };
  size?: "small" | "medium" | "large";
}

export function SponsorCard({ sponsor, size = "medium" }: SponsorCardProps) {
  const sizeClasses = {
    small: "w-24 h-12",
    medium: "w-32 h-16",
    large: "w-full h-24",
  };

  const cardClasses = {
    small: "p-3 min-h-[120px]",
    medium: "p-4 min-h-[160px]",
    large: "p-6 min-h-[220px]",
  };

  // Use logo image if available, fallback to legacy image URL
  const logoUrl = sponsor.logo
    ? urlForImage(sponsor.logo)?.width(300).height(200).url()
    : sponsor.image;

  const sponsorUrl = sponsor.slug?.current
    ? `/sponsors/${sponsor.slug.current}`
    : sponsor.uuid
      ? `/sponsors/${sponsor.uuid}`
      : null;

  const getTierColor = (tier?: string) => {
    switch (tier?.toLowerCase()) {
      case "platinum":
        return "bg-gray-800 text-white";
      case "gold":
        return "bg-yellow-500 text-white";
      case "silver":
        return "bg-gray-400 text-white";
      case "bronze":
        return "bg-orange-600 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const content = (
    <div
      className={`group bg-white rounded-xl border border-gray-100 hover:shadow-xl transition-shadow shadow-lg ${cardClasses[size]} flex flex-col`}
    >
      {/* Logo Container */}
      <div
        className={`${sizeClasses[size]} relative overflow-hidden rounded-lg bg-white border border-gray-100 flex items-center justify-center mb-4`}
      >
        <Image
          src={logoUrl || "/placeholder-logo.png"}
          alt={`${sponsor.name} logo`}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      {size !== "small" && (
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 text-center text-sm md:text-base leading-tight mb-2">
            {sponsor.name}
          </h3>

          {sponsor.description && size === "large" && (
            <p className="text-xs md:text-sm text-gray-600 text-center line-clamp-2 mb-3 flex-1">
              {sponsor.description}
            </p>
          )}

          {sponsor.tier && (
            <div className="flex justify-center">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getTierColor(sponsor.tier)}`}
              >
                {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (sponsorUrl) {
    return (
      <Link
        href={sponsorUrl}
        className="block hover:scale-[1.02] transition-transform duration-300"
      >
        {content}
      </Link>
    );
  }

  if (sponsor.website) {
    return (
      <Link
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:scale-[1.02] transition-transform duration-300"
      >
        {content}
      </Link>
    );
  }

  return content;
}
