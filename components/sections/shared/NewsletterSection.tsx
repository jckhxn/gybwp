import { Newsletter } from "@/src/app/(website)/components/Newsletter";

interface NewsletterSectionProps {
  section: {
    _type: "newsletter";
    _key: string;
    title?: string;
    subtitle?: string;
    description?: string;
  };
}

export function NewsletterSection({ section }: NewsletterSectionProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
        <div className="absolute top-0 right-0 w-64 h-64 -mt-16 -mr-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -mb-16 -ml-16 bg-gradient-to-tr from-accent/5 to-secondary/5 rounded-full blur-3xl"></div>

        <Newsletter />
      </div>
    </section>
  );
}
