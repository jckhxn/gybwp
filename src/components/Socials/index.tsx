import React, { useState } from "react";

// components
import Button from "components/Button";
import Image from "next/image";

// copy
import { socialsType } from "components/Pages/SponsorsPage/static-data";
import { Section } from "components/shared";

//
//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const Socials = ({
  socials,
  dropdown = false,
  className: passedClasses,
}: {
  socials: socialsType[];
  dropdown?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const generateSocialIcon = ({ name, link, icon }: socialsType) => {
    return (
      <Button
        as="a"
        href={link}
        target="_blank"
        color="secondary"
        className="rounded-full h-fit mx-2"
      >
        <Image src={icon} alt={`social-${name}`} height={30} width={30} />
      </Button>
    );
  };

  return (
    <Section className={`flex flex-row mt-8 ${passedClasses}`}>
      {!dropdown &&
        socials
          .slice(0, dropdown ? 4 : 5)
          .map((social) => generateSocialIcon(social))}

      <div className="relative">
        {dropdown && socials.length > 5 && (
          <div className="relative inline-flex items-center overflow-hidden rounded-md border border-gray-400 bg-white">
            <div className="border-e border-e-gray-400 p-2 text-sm/none text-gray-600">
              {socials
                .slice(0, dropdown ? 4 : 5)
                .map((social) => generateSocialIcon(social))}
            </div>

            <button
              onClick={handleClick}
              className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            >
              <span className="sr-only">More Social Links</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 m-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {isOpen && (
          <div
            className="absolute end-0 z-10 mt-1 w-max max-w-56 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
          >
            <div className="p-2">
              {socials
                .slice(5, socials.length + 1)
                .map((social) => generateSocialIcon(social))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Socials;
