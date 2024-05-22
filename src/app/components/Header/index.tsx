"use client";
import React, { useState } from "react";
import routes from "@/src/app/routes";

// components
import Link from "next/link";
import Image from "next/image";
import logo from "images/logo.webp";

// static data
import { PAGES, COPY } from "./static-data";

const Navigation = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const handleMobileHamburgerClick = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <header aria-label="Site Header" className="bg-white pt-2">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="flex" href={routes.internal.home}>
              <span className="sr-only">Home</span>
              <Image
                priority
                loading="eager"
                className="h-16 w-auto"
                alt="Growing Your Business with People Logo"
                src={logo}
              />
              <p className="self-center hidden ml-0 text-sm lg:text-xl md:block lg:ml-3">
                Growing Your Business With People
              </p>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            {/* NAVIGATION LINKS */}
            <nav aria-label="Site Nav" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {PAGES.map(({ name, url }) => (
                  <li key={name}>
                    <Link
                      className="text-secondary transition hover:text-gray-500/75"
                      href={url}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {/* FOLLOW US BUTTON */}
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-main px-5 py-2.5 text-sm font-medium text-white shadow"
                  href={routes.external.follow}
                  target="_blank"
                >
                  {COPY.buttonText}
                </Link>
              </div>

              {/* MOBILE NAVIGATION BUTTON */}
              <div className="block md:hidden relative">
                <button
                  onClick={handleMobileHamburgerClick}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <span className="sr-only">Open Navigation Menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* MOBILE NAVIGATION DROPDOWN MENU */}
                {mobileNavOpen && (
                  <div
                    className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                    role="menu"
                  >
                    <div className="p-2">
                      <div className="flow-root">
                        <nav
                          aria-label="Millie Navigation"
                          className="-my-2 flex flex-col divide-y divide-gray-100"
                        >
                          <ul className="space-y-1 py-2">
                            {PAGES.map(({ name, url }) => (
                              <li
                                key={name}
                                onClick={handleMobileHamburgerClick}
                              >
                                <Link
                                  key={name}
                                  href={url}
                                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-main"
                                >
                                  {name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
