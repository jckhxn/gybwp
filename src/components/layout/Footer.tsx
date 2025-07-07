import React from "react";
import routes from "@/src/app/(website)/routes";

// components
import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/src/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background relative">
      <div className="absolute top-0 left-0 w-full border-t" />
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.webp"
                alt="Growing Your Business With People Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold text-lg">
                Growing Your Business With People
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A podcast dedicated to helping businesses grow through strategic
              people management.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Listen On</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="https://podcasts.apple.com/podcast/id1659743511"
                className="hover:underline"
              >
                Apple Podcasts
              </Link>
              <Link
                href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
                className="hover:underline"
              >
                Spotify
              </Link>
              <Link
                href="https://www.buzzsprout.com/2057493/follow"
                className="hover:underline"
              >
                Buzzsprout
              </Link>
              <Link
                href="https://www.youtube.com/@JKLAdvisors"
                className="hover:underline"
              >
                YouTube
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/episodes" className="hover:underline">
                All Episodes
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
              <Link href="/consulting" className="hover:underline">
                Consulting
              </Link>
              <Link href="/sponsors" className="hover:underline">
                Sponsors
              </Link>
              <Link href="/news" className="hover:underline">
                News
              </Link>
            </nav>
          </div>
        </div>
        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} JKL Advisors, LLC. We ❤️ our
            subscribers!
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t" />
    </footer>
  );
};

export default Footer;
