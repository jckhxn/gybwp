// File: components/Card/index.tsx

import React from "react";

// components
import Image from "next/image";
import Link from "next/link";

const Card = ({
  imageUrl,
  date,
  title,
  description = "",
}: {
  imageUrl: string;
  date: Date;
  title: string;
  description?: string;
}) => {
  const formatDate = () => {
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = () => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return year + "-" + month + "-" + day;
  };

  return (
    <article className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
      <Image
        alt="Office"
        src={imageUrl}
        className="h-56 w-full object-cover rounded-lg mb-4"
      />

      <div className="">
        <time
          dateTime={formatDateTime()}
          className="block text-xs text-gray-500"
        >
          {formatDate()}
        </time>

        <Link href="#">
          <h3 className="mt-0.5 text-lg text-gray-900 font-semibold">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-600">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};

export default Card;
