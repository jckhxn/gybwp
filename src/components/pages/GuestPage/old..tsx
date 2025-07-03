"use client";
import { Globe } from "lucide-react";
import Link from "next/link";

import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/src/components/ui/avatar";

import { client } from "@/src/lib/sanity-utils";
import { GUEST_QUERY } from "@/src/lib/queries";

import EpisodeCard from "@/src/components/EpisodeCard";
import { urlFor } from "@/src/lib/utils";
import { SVGProps, useEffect, useState } from "react";

type Props = {
  guest: string;
  then: Promise<any>["then"];
  catch: Promise<any>["catch"];
  finally: Promise<any>["finally"];
  [Symbol.toStringTag]: string;
};

const GuestPage = ({ guest }: Props) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(GUEST_QUERY, {
        slug: String(guest),
      });

      setData(result[0]);
    };
    fetchData();
  }, [guest]);

  if (!data) {
    return <div>Loading...</div>;
  }
  // Sanity weird URL builder for assets
  const guestImageUrl = urlFor(data?.image).url() || "";
  return (
    <div className="bg-light min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <Avatar className="w-32 h-32 mb- mr-4">
            <AvatarImage alt="Guest Avatar" src={guestImageUrl} />

            <AvatarFallback>{data.name}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold ">{data.name}</h1>
            <p className="text-gray-600 ">{data.title}</p>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={data.links ? data.links.website : ""}
            >
              <Globe className="text-gray-400 mt-2" size={24} />
            </Link>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-700">{data.about}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
          <ul className=" space-y-4">
            {data.episodes?.length > 0 ? (
              data.episodes.map((episode: any, idx: any) => (
                <EpisodeCard key={idx} {...episode} />
              ))
            ) : (
              <h3>No episodes for guest.</h3>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default GuestPage;
