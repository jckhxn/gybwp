import React from "react";
import routes from "routes";
import useBreakpoints from "styles/useBreakpoints";

// components
import Image from "next/image";
import logo from "images/logo.png";

const Footer = () => {
  const { ltMd } = useBreakpoints();
  return (
    <footer className="bg-footer-bg text-footer-text shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className={`justify-center lg:justify-normal flex items-center mb-4 sm:mb-0`}
          >
            {!ltMd && (
              <Image
                src={logo}
                className="h-8 w-auto mr-3"
                alt="Next.js Web Template Logo"
              />
            )}
            <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Next.js Web Template
            </div>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm justify-center lg:justify-normal font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a
                href={routes.internal.privacy}
                className="mr-4 hover:underline md:mr-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href={routes.internal.tou}
                className="mr-4 hover:underline md:mr-6 "
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Next.js Web Template
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
