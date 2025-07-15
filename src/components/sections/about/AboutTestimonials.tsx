export function AboutTestimonials({ heading, testimonials }) {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-r from-primary/5 via-secondary/10 to-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {heading}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200/70"
            >
              <div className="font-semibold text-lg text-primary mb-2">
                {t.name}
              </div>
              <div className="text-gray-700 text-base">{t.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
