import React from "react";

// components
import { Section } from "components/shared";
import Image from "next/image";
import Link from "next/link";

// copy
import { episodeType } from "components/Pages/HomePage/episode-data";

const Collection = ({
  header,
  description,
  items,
}: {
  header?: string;
  description?: string;
  items: Array<episodeType>;
}) => {
  return (
    <Section>
      <div className="mt-8 max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        {(header || description) && (
          <header className="text-center">
            {header && (
              <h2 className="text-xl font-light text-gray-900 sm:text-3xl">
                {header}
              </h2>
            )}

            {description && (
              <p className="max-w-md mx-auto mt-4 text-gray-500">
                {description}
              </p>
            )}
          </header>
        )}

        <ul className="flex justify-center gap-8 mt-12 flex-wrap">
          {items.map(
            ({ episodeNumber, episodeName, uuid, image, url, season }) => (
              <li key={`collection-item-${uuid}`}>
                <Link href={url}>
                  <Image
                    id={`${uuid}-img`}
                    src={image}
                    alt={`${episodeName} image`}
                    className="w-[300px] h-[170px] object-cover transition duration-500 group-hover:scale-105"
                    width={300}
                    height={170}
                  />

                  <div className="flex justify-center items-center ">
                    {" "}
                    Season {season} | Episode {episodeNumber}
                  </div>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </Section>
  );
};

export default Collection;
