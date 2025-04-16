import React from "react";
import routes from "@/src/app/(website)/routes";

// components
import Link from "next/link";
import Image from "next/image";
import logo from "images/logo.webp";
import Button from "../Button";

// copy
import { footer } from "./static-data";
import { Separator } from "../ui/separator";

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
            <div className="flex space-x-4 mt-4">
              <div className="p-2 rounded-full bg-background hover:bg-gray-200 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M10 15l5.19-3L10 9v6z"></path>
                  <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"></path>
                </svg>
              </div>
              <div className="p-2 rounded-full bg-background hover:bg-gray-200 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Listen On</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#" className="hover:underline">
                Apple Podcasts
              </Link>
              <Link href="#" className="hover:underline">
                Spotify
              </Link>
              <Link href="#" className="hover:underline">
                Google Podcasts
              </Link>
              <Link href="#" className="hover:underline">
                Amazon Music
              </Link>
              <Link href="#" className="hover:underline">
                Stitcher
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#" className="hover:underline">
                All Episodes
              </Link>
              <Link href="#" className="hover:underline">
                Business Toolkit
              </Link>
              <Link href="#" className="hover:underline">
                Recommended Books
              </Link>
              <Link href="#" className="hover:underline">
                Free Guides
              </Link>
              <Link href="#" className="hover:underline">
                Courses
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#" className="hover:underline">
                About Us
              </Link>
              <Link href="#" className="hover:underline">
                Our Team
              </Link>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
              <Link href="#" className="hover:underline">
                Advertise
              </Link>
              <Link href="#" className="hover:underline">
                Sponsorship
              </Link>
            </nav>
          </div>
        </div>
        <div className="my-8 border-t" />
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} JKL Advisors, LLC. We ❤️ our
            subscribers!
          </p>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t" />
    </footer>
  );
};

export default Footer;
