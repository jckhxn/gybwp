import Image from "next/image";
import { urlFor } from "@/src/lib/utils"; // Adjust if your image builder is elsewhere

export function AboutHost({
  host = "Host Name",
  hostImage,
  hostBio,
  heading,
  subtext,
  hostJourney,
  socialLinks = [],
}) {
  // Get the image URL from Sanity image object, or fallback
  let imageUrl = null;
  if (hostImage) {
    if (typeof hostImage === "string") {
      imageUrl = hostImage;
    } else if (hostImage.asset) {
      imageUrl =
        hostImage.asset.url ||
        (typeof urlFor === "function" ? urlFor(hostImage).url() : null);
    }
  }

  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-white">
      <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-gray-200/70 shadow-lg">
          <div className="relative mb-6">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-full blur-lg opacity-30"></div>
            {imageUrl ? (
              <Image
                alt={host}
                className="relative rounded-full aspect-square border-4 border-white shadow-xl object-cover"
                src={imageUrl}
                width={200}
                height={200}
              />
            ) : (
              <div className="w-[200px] h-[200px] rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-900">{host}</h3>
            <p className="text-primary font-medium">Host, GYBWP</p>
            <p className="text-gray-600 leading-relaxed text-base mt-2">
              {hostBio}
            </p>
            <div className="flex gap-3 justify-center mt-3">
              {socialLinks?.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon || link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {subtext}
          </p>
          {hostJourney && (
            <p className="text-base text-gray-500">{hostJourney}</p>
          )}
        </div>
      </div>
    </section>
  );
}
