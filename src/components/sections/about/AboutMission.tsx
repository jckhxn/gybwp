import Image from "next/image";

export function AboutMission({ heading, text, bullets, image }) {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-r from-secondary/10 via-white to-primary/10">
      <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {text}
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {bullets?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="flex justify-center">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              className="rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md"
              width={400}
              height={300}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
