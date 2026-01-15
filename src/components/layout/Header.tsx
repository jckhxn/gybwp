"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import routes from "@/src/app/(website)/routes";
import { PAGES } from "./Header/static-data";
import logo from "@/public/images/logo.webp";

const Navigation = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileHamburgerClick = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-smooth-out ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-soft border-b border-surface-100" 
            : "bg-white border-b border-transparent"
        }`}
      >
        <div className="container flex h-18 items-center justify-between">
          {/* Logo */}
          <Link
            href={routes.internal.home}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src={logo}
                alt="Growing Your Business With People Logo"
                width={48}
                height={48}
                className="relative rounded-full shadow-soft group-hover:shadow-medium transition-all duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-surface-900 group-hover:text-primary transition-colors duration-300">
                GYBWP
              </span>
              <div className="h-0.5 w-0 bg-gradient-to-r from-primary to-primary-light group-hover:w-full transition-all duration-300 rounded-full"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {PAGES.map(({ name, url }) => (
              <Link
                key={name}
                href={url}
                className="relative px-4 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors duration-200 group rounded-lg hover:bg-surface-50"
              >
                <span className="relative z-10">{name}</span>
                <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/company/growing-your-business-with-people"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-surface-900 text-white text-sm font-semibold rounded-xl
                         shadow-soft transition-all duration-300 ease-smooth-out
                         hover:bg-surface-800 hover:shadow-medium hover:-translate-y-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>Follow Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-surface-50 text-surface-700
                       transition-all duration-200 hover:bg-surface-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={handleMobileHamburgerClick}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current rounded-full transform transition-all duration-300 origin-center ${mobileNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-200 ${mobileNavOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current rounded-full transform transition-all duration-300 origin-center ${mobileNavOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 top-[72px] z-40 md:hidden transition-all duration-300 ${
          mobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-surface-900/20 backdrop-blur-sm transition-opacity duration-300 ${
            mobileNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleMobileHamburgerClick}
        />
        
        {/* Menu Panel */}
        <div 
          className={`relative bg-white border-b border-surface-100 shadow-elevated transform transition-all duration-300 ease-smooth-out ${
            mobileNavOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <nav className="container py-6">
            <div className="flex flex-col gap-1">
              {PAGES.map(({ name, url }, index) => (
                <Link
                  key={name}
                  href={url}
                  className="group relative flex items-center text-lg font-medium text-surface-700 hover:text-surface-900 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-surface-50"
                  onClick={() => setMobileNavOpen(false)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: mobileNavOpen ? 'fadeInUp 0.4s ease-out forwards' : 'none'
                  }}
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-r-full group-hover:h-6 transition-all duration-200"></div>
                  <span className="relative z-10">{name}</span>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-surface-100">
                <Link
                  href={routes.external.follow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-surface-900 text-white font-semibold rounded-xl
                             shadow-soft transition-all duration-300 hover:bg-surface-800 hover:shadow-medium"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Follow on LinkedIn
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
