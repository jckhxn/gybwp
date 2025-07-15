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
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={routes.internal.home}
              className="flex items-center gap-2"
            >
              <Image
                src={logo}
                alt="Growing Your Business With People Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-lg hidden sm:inline-block">
                Growing Your Business With People
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {PAGES.map(({ name, url }) => (
              <Link
                key={name}
                href={url}
                className="text-base font-normal hover:text-primary"
              >
                {name}
              </Link>
            ))}
          </nav>
          <Link
            href="https://www.linkedin.com/company/growing-your-business-with-people "
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-secondary text-white hover:bg-secondary-dark px-4 py-2 rounded-md"
          >
            Follow Us
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden bg-gray-900 rounded-full shadow border border-gray-800"
            onClick={handleMobileHamburgerClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
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
            className="fixed inset-0 bg-white/20 backdrop-blur-sm"
            onClick={handleMobileHamburgerClick}
          />
          <div className="relative bg-white border-b border-gray-200 shadow-lg">
            <nav className="container py-6">
              <div className="flex flex-col space-y-4">
                {PAGES.map(({ name, url }) => (
                  <Link
                    key={name}
                    href={url}
                    className="text-lg font-medium text-gray-900 hover:text-primary py-2 border-b border-gray-100 last:border-b-0"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
                <Link
                  href={routes.external.follow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-secondary text-white hover:bg-secondary-dark px-4 py-3 rounded-md text-center font-medium"
                  onClick={() => setMobileNavOpen(false)}
                >
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
