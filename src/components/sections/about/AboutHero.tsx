import PlatformBadge from "./PlatformBadge";

export function AboutHero({ title, subtitle, badges }) {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-primary/30 via-secondary/10 to-white">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
            <line x1="8" x2="16" y1="22" y2="22" />
          </svg>
          About the Podcast
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {badges?.map((badge) => (
            <PlatformBadge key={badge.label} {...badge} />
          ))}
        </div>
      </div>
    </section>
  );
}
