import React, { useState } from "react";

// components
import { Section } from "components/shared";
import Button from "components/Button";

// copy
import { PODCAST } from "components/Pages/HomePage/static-data";

const Dropdown = ({
  setActiveSeason,
}: {
  setActiveSeason: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (seasonNumber?: number) => {
    if (seasonNumber) {
      setActiveSeason(seasonNumber);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Section relative>
      <Button
        color="white"
        className="inline-flex border-b border-black rounded-none px-2 py-1"
        onClick={() => handleClick()}
      >
        More
        <span
          className={
            isOpen ? "-rotate-180 pr-2 self-center" : "pl-2 self-center"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </Button>

      {isOpen && (
        <div className="z-50 absolute end-0 top-auto mt-2">
          <div className="w-40 min-w-fit rounded border border-gray-200 bg-white">
            <ul className="space-y-1 border-t border-gray-200 p-4">
              {PODCAST.map(({ seasonName, seasonNumber }) => (
                <li
                  key={seasonName}
                  className="hover:text-gray-700/75 cursor-pointer"
                  onClick={() => handleClick(seasonNumber)}
                >
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    {seasonName}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Dropdown;
