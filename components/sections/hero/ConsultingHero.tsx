export function ConsultingHero({
  title = "Consulting",
  subtitle,
  description,
}: any) {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/70 to-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
