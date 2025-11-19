import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getComponentId } from "@/src/lib/sectionId";

interface NewsletterProps {
  section: {
    _type: "newsletter";
    _key?: string;
    sectionId?: string;
    title?: string;
    subtitle?: string;
    pillLabel?: string;
    supportingText?: string;
    joinedByText?: string;
    joinedByBrands?: string[];
    linkedInUrl?: string;
    linkedInCta?: string;
    privacyNotice?: string;
  };
}

export function Newsletter({ section }: NewsletterProps) {
  const componentId = getComponentId(section, "newsletter");
  
  const {
    title = "Subscribe to our newsletter",
    subtitle = "Be first to know when new episodes drop! Get notified about our latest podcast releases, exclusive guest interviews, and behind-the-scenes content.",
    pillLabel = "Never Miss an Episode",
    supportingText = "Connect with like-minded business leaders and get weekly insights delivered straight to your inbox.",
    joinedByBrands = [
      "LinkedIn",
      "Wall Street Journal",
      "CEO Weekly",
      "+ 100s more",
    ],
    linkedInUrl = "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7049506606413213696",
    linkedInCta = "Subscribe on LinkedIn",
    privacyNotice = "Your data is secure. We never share your information.",
  } = section;

  return (
    <section id={componentId} className="relative w-full py-12 md:py-16 flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 max-w-lg text-center space-y-6">
        {/* Professional pill badge */}
        <div className="glass-card inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-primary shadow-glass mx-auto">
          <div className="relative">
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
              className="w-4 h-4"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <span className="tracking-wide">{pillLabel}</span>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-3xl sm:text-4xl text-main leading-tight">{title}</h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-md mx-auto">{subtitle}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{supportingText}</p>
        </div>
        
        {/* Executive brands showcase */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-professional border border-gray-100/50">
          <p className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">Trusted by leaders at:</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-gray-600">
            {joinedByBrands.map((brand, i) => (
              <span key={i} className="authority-badge">{brand}</span>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <Link
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-primary hover:bg-primary/90 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:shadow-executive hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-w-[220px]"
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <span className="font-bold tracking-wide">{linkedInCta}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 duration-300" />
          </Link>
          
          {/* Professional privacy notice */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 glass-card px-4 py-2 rounded-full w-fit mx-auto">
            <div className="relative">
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
                className="text-primary w-4 h-4"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <span className="font-medium">{privacyNotice}</span>
          </div>
        </div>
      </div>
    </section>
  );
}