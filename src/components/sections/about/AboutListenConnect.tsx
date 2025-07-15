import PlatformBadge from "./PlatformBadge";
import Link from "next/link";

export function AboutListenConnect({ heading, text, badges }) {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/20 via-secondary/10 to-white">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center text-center gap-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {heading}
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">{text}</p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {badges?.map((badge) => (
            <PlatformBadge key={badge.label} {...badge} />
          ))}
        </div>
      </div>
    </section>
  );
}
