import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.webp";
import hero from "@/public/images/blueprint.webp";
import consulting1 from "@/public/images/consulting1.webp";
import { SVGProps } from "react";
import JSONLD from "../../SEO/jsonld";
import { generateAboutPageStructuredData } from "@/src/lib/structured-data";

export const generateMetadata = () => ({
  title: "About | Growing Your Business With People",
  description:
    "Learn about the mission, host, and impact of the Growing Your Business With People podcast.",
  openGraph: {
    title: "About | Growing Your Business With People",
    description:
      "Learn about the mission, host, and impact of the Growing Your Business With People podcast.",
    images: ["/images/logo.webp"],
    url: "https:/gybwp.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Growing Your Business With People",
    description:
      "Learn about the mission, host, and impact of the Growing Your Business With People podcast.",
    images: ["/images/logo.webp"],
  },
});

export default function AboutPage() {
  const aboutStructuredData = generateAboutPageStructuredData();

  return (
    <>
      <JSONLD data={aboutStructuredData} id="organization-jsonld" />
      {/* Hero Section */}
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
            Growing Your Business With People
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Actionable insights for leaders who believe people are their
            greatest investment. Join us for fireside chats with Fortune 100
            CEOs, startup founders, bestselling authors, and industry pioneers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <PlatformBadge
              href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
              label="Apple Podcasts"
            />
            <PlatformBadge
              href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
              label="Spotify"
            />
            <PlatformBadge
              href="https://www.buzzsprout.com/2057493/share"
              label="BuzzSprout"
            />
            <PlatformBadge
              href="/consulting"
              label="Contact"
              icon={<MailIcon className="h-4 w-4" />}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-secondary/10 via-white to-primary/10">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Why This Podcast?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              We believe that people are not just a company’s most important
              asset—they’re an investment primed for growth. Our mission is to
              help leaders maximize their Return on People through practical,
              real-world conversations.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Interviews with top CEOs, founders, and thought leaders</li>
              <li>Actionable strategies for leadership, talent, and growth</li>
              <li>Stories that inspire and challenge conventional thinking</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src={hero}
              alt="Podcast Blueprint"
              className="rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md"
              width={400}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-white">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-gray-200/70 shadow-lg">
            <div className="relative mb-6">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-full blur-lg opacity-30"></div>
              <Image
                alt="Jeff Lackey - Host"
                className="relative rounded-full aspect-square border-4 border-white shadow-xl object-cover"
                src={consulting1}
                width={200}
                height={200}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-gray-900">
                Jeff Lackey
              </h3>
              <p className="text-primary font-medium">Host, GYBWP</p>
              <p className="text-gray-600 leading-relaxed text-base mt-2">
                Jeff is passionate about helping leaders unlock the full
                potential of their teams. With decades of experience in talent,
                leadership, and business transformation, he brings a unique
                perspective to every conversation.
              </p>
              <div className="flex gap-3 justify-center mt-3">
                <SocialLink
                  href="https://www.linkedin.com/in/jeff-lackey-gybwp/"
                  label="LinkedIn"
                  icon={<LinkedInIcon className="h-5 w-5" />}
                />
                <SocialLink
                  href="https://twitter.com/jefflackey"
                  label="Twitter"
                  icon={<TwitterIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Meet the Host
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              &quot;I firmly believe people aren’t just a company’s most vital
              asset; they’re an investment primed for growth.&quot;
            </p>
            <p className="text-base text-gray-500">
              Jeff’s leadership journey includes roles at Fortune 100 companies,
              startups, and everything in between. He’s on a mission to help you
              grow your business—with people.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section (optional, placeholder) */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-primary/5 via-secondary/10 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            What Listeners Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah K."
              text="Incredible guests and actionable advice. This podcast is a must-listen for any leader!"
            />
            <TestimonialCard
              name="Mike D."
              text="Jeff’s approach is authentic and insightful. I always walk away with something new."
            />
            <TestimonialCard
              name="Priya S."
              text="The best podcast for people-first leadership. Highly recommended!"
            />
          </div>
        </div>
      </section>

      {/* How to Listen & Connect */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/20 via-secondary/10 to-white">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center text-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            How to Listen & Connect
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Subscribe on your favorite platform, or{" "}
            <Link
              href="/consulting"
              className="text-primary underline hover:text-primary/80"
            >
              contact us
            </Link>{" "}
            to get in touch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <PlatformBadge
              href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
              label="Apple Podcasts"
            />
            <PlatformBadge
              href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
              label="Spotify"
            />
            <PlatformBadge
              href="https://www.buzzsprout.com/2057493/share"
              label="BuzzSprout"
            />
            <PlatformBadge
              href="/consulting"
              label="Contact"
              icon={<MailIcon className="h-4 w-4" />}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function PlatformBadge({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-primary/80 rounded-lg border border-primary/20 hover:border-primary/30 transition-all duration-200"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {icon || <PodcastIcon className="h-4 w-4" />} {label}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-primary/10 text-primary rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon} <span className="sr-only">{label}</span>
    </Link>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
      <div className="mb-3">
        <svg
          className="h-8 w-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M17.657 16.657A8 8 0 1 1 12 4v4a4 4 0 1 0 4 4h4a8 8 0 0 1-2.343 4.657z" />
        </svg>
      </div>
      <p className="text-gray-700 text-base mb-2">{text}</p>
      <span className="text-sm text-gray-500 font-medium">{name}</span>
    </div>
  );
}

function PodcastIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="11" r="3" />
      <path d="M19.07 4.93a10 10 0 1 1-14.14 0" />
      <path d="M15.54 8.46a5 5 0 1 1-7.08 0" />
    </svg>
  );
}

function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 6-8.97 6.48a2 2 0 0 1-2.06 0L2 6" />
    </svg>
  );
}

function LinkedInIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 8a6 6 0 0 1 6 6v5" />
      <path d="M2 21v-5a6 6 0 0 1 6-6" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.94 12.94 0 0 1 3.1.67a4.52 4.52 0 0 0-.61 2.28c0 1.57.8 2.96 2.02 3.77A4.48 4.48 0 0 1 2 5.13v.06c0 2.2 1.56 4.03 3.64 4.45-.38.1-.78.16-1.19.16-.29 0-.57-.03-.85-.08.58 1.8 2.25 3.12 4.23 3.16A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" />
    </svg>
  );
}
