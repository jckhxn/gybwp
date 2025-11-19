"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import routes from "@/src/app/(website)/routes";
import { PAGES } from "./Header/static-data";
import logo from "@/public/images/logo.webp";

const Navigation = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const handleMobileHamburgerClick = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={routes.internal.home}
              className="flex items-center gap-3 group transition-colors duration-200"
            >
              <div className="relative">
                <Image
                  src={logo}
                  alt="Growing Your Business With People Logo"
                  width={60}
                  height={60}
                  className="rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-200"
                />
                <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-semibold text-main">
                  Growing Your Business With People
                </span>
                <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-200"></div>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {PAGES.map(({ name, url }) => (
              <Link
                key={name}
                href={url}
                className="relative text-base font-medium text-gray-700 hover:text-primary transition-colors duration-200 group"
              >
                <span className="relative z-10">{name}</span>
                <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                <div className="absolute inset-0 bg-primary/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 -z-10"></div>
              </Link>
            ))}
          </nav>
          <Link
            href="https://www.linkedin.com/company/growing-your-business-with-people "
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Follow Us
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden bg-gray-100 text-gray-700 rounded-full shadow-sm hover:shadow-md hover:bg-gray-200 transition-all duration-200"
            onClick={handleMobileHamburgerClick}
          >
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
              className={`h-6 w-6 transition-transform ${mobileNavOpen ? "rotate-90" : ""}`}
            >
              {mobileNavOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileNavOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={handleMobileHamburgerClick}
          />
          <div className="relative bg-white border-b border-gray-200 shadow-lg">
            <nav className="container py-8">
              <div className="flex flex-col space-y-2">
                {PAGES.map(({ name, url }) => (
                  <Link
                    key={name}
                    href={url}
                    className="group relative text-lg font-medium text-gray-900 hover:text-primary py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-primary/5"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span className="relative z-10">{name}</span>
                    <div className="absolute inset-y-0 left-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-200 rounded-r-full"></div>
                  </Link>
                ))}
                <Link
                  href={routes.external.follow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 bg-secondary text-white hover:bg-secondary/90 px-6 py-3 rounded-lg text-center font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Follow Us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
