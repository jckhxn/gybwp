import React from "react";
import routes from "@/src/app/(website)/routes";

// components
import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/src/components/ui/separator";

const podcastPlatforms = [
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/podcast/id1659743511",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.606.156 1.002.156 1.803 0 1.488-.252 2.67-.876 4.116-.18.396-.468.984-.636 1.284l-.18.324-.492-.312a12.528 12.528 0 01-.996-.684l-.312-.24.156-.324c.168-.348.456-1.02.564-1.308.396-1.044.564-1.896.564-2.856 0-.744-.072-1.248-.264-1.896-.456-1.536-1.464-2.808-2.892-3.648a5.878 5.878 0 00-3.108-.876c-1.56 0-3 .504-4.164 1.452-1.416 1.152-2.244 2.94-2.244 4.836 0 1.356.336 2.664.984 3.828.108.204.324.6.468.876l.264.504-.492.312c-.264.168-.648.432-1.02.696l-.504.348-.216-.384c-.12-.204-.372-.696-.564-1.092-1.26-2.568-1.416-5.376-.456-8.004 1.14-3.084 3.864-5.328 7.092-5.844.492-.072 1.728-.108 2.148-.072.384.024.396.024.768.072.204.024.54.072.756.12zm-.024 3.36c1.512.168 2.916.972 3.828 2.196.468.624.792 1.308.972 2.064.12.492.156.804.156 1.476 0 1.092-.156 1.752-.636 2.736-.216.444-.528.96-.732 1.224l-.168.216-.492-.324c-.276-.168-.6-.396-.72-.504l-.228-.18.168-.276c.564-.9.756-1.512.756-2.388 0-.84-.192-1.464-.66-2.124-.624-.888-1.584-1.416-2.688-1.488-1.548-.108-2.988.756-3.624 2.172-.264.564-.36.972-.384 1.596-.024.816.18 1.464.648 2.136.12.18.216.324.216.336 0 .012-.24.192-.54.408-.288.204-.552.396-.576.42-.048.036-.108-.024-.228-.216-.396-.624-.696-1.404-.816-2.1-.072-.456-.048-1.476.048-1.932.384-1.824 1.716-3.276 3.48-3.78.588-.168 1.596-.228 2.22-.168zm-.132 3.744c.492.12.936.456 1.212.912.168.288.252.576.276.948.036.468-.06.852-.288 1.212l-.144.228-.156-.024a25.08 25.08 0 00-1.596-.192l-.384-.036.012-.144c.012-.12.012-.348-.012-.504-.036-.252-.108-.42-.252-.6-.168-.216-.492-.408-.708-.408-.12 0-.12-.012-.084-.312.024-.168.072-.42.12-.564l.072-.252.24.012c.612.036.852.024 1.26-.108.084-.024.156-.048.18-.06.024-.012.096-.012.252.012zm-.18 3.9c.276.036.48.252.48.54a.54.54 0 01-.096.312c-.036.048-.132.528-.24 1.2-.168.912-.204 1.14-.312 1.536-.408 1.452-.612 2.184-.612 2.184 0 .048-.072.132-.168.18-.204.12-.468.12-.684 0-.096-.048-.168-.132-.168-.18 0 0-.204-.732-.612-2.184-.108-.396-.144-.624-.312-1.536-.108-.672-.204-1.152-.24-1.2a.54.54 0 01-.096-.312.533.533 0 01.48-.54z"/>
      </svg>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@JKLAdvisors",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Buzzsprout",
    href: "https://www.buzzsprout.com/2057493/follow",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
  },
];

const footerLinks = {
  resources: [
    { name: "All Episodes", href: "/episodes" },
    { name: "Latest Episode", href: "/episodes" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Consulting", href: "/consulting" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "News", href: "/news" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/tou" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative w-full bg-surface-900 text-white overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/images/logo.webp"
                  alt="Growing Your Business With People Logo"
                  width={48}
                  height={48}
                  className="relative rounded-full"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white">GYBWP</span>
                <div className="text-sm text-surface-400">Growing Your Business With People</div>
              </div>
            </Link>
            <p className="text-surface-400 leading-relaxed max-w-sm">
              The podcast for CEOs and business leaders focused on growth through investing in their most valuable asset: their people.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/growing-your-business-with-people"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-surface-400
                           transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {/* Listen On */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Listen On
                </h3>
                <ul className="space-y-3">
                  {podcastPlatforms.map((platform) => (
                    <li key={platform.name}>
                      <Link
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-surface-400 transition-colors duration-200 hover:text-white"
                      >
                        <span className="text-surface-500 group-hover:text-primary transition-colors duration-200">
                          {platform.icon}
                        </span>
                        <span className="text-sm">{platform.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-surface-400 transition-colors duration-200 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-surface-400 transition-colors duration-200 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-surface-700 to-transparent"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            © {new Date().getFullYear()} JKL Advisors, LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-surface-500 transition-colors duration-200 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
