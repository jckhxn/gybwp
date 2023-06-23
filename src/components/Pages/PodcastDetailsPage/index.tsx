import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import routes from "routes";

// components
import { Section, SectionHeading } from "components/shared";
import Image from "next/image";
import Button from "components/Button";
import Socials from "components/Socials";

// copy
import { episodeType } from "../HomePage/static-data";
import { SOCIALS, getEpisode, getNextEpisode } from "./static-data";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

export interface compiledEpisodeType extends episodeType {
  season: string;
}

const PodcastDetailsPageComponent = () => {
  const [episode, setEpisode] = useState<compiledEpisodeType>();
  const [nextEpisode, setNextEpisode] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const episodeUuid = window.location.pathname.split("/")[2];
    const season = episodeUuid[0];

    const foundEpisode = getEpisode(season, episodeUuid);
    const queriedEpisode = {
      ...foundEpisode,
      season,
    };

    if (foundEpisode) {
      setEpisode(queriedEpisode);

      const nextEpisode = getNextEpisode(queriedEpisode.uuid);
      if (nextEpisode) {
        setNextEpisode(nextEpisode);
      }
    } else {
      router.push(routes.internal.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!episode) {
    return null;
  }

  return (
    <>
      <Section flex className="bg-light">
        <div className="md:px-20 py-6 w-full">
          <Button
            as="a"
            href={routes.internal.home}
            className="ml-8 md:ml-0 px-10 py-2 mt-4"
            color="main"
          >
            Back
          </Button>
          {nextEpisode && (
            <Button
              as="a"
              href={nextEpisode}
              className="ml-8 md:ml-2 px-6 py-2 mt-4"
              color="primary"
            >
              Next Episode
            </Button>
          )}

          <div className="flex flex-col-reverse xl:flex-row flex-wrap justify-around mx-10 mb-10 mt-4 xl:mt-0">
            <div className="flex flex-col mt-12 lg:max-w-[40vw]">
              <h2 className="text-2xl font-bold">{episode.episodeName}</h2>
              <div className="mb-8 font-light">
                Season {episode.season} | Episode {episode.episodeNumber}
              </div>

              <div className="xl:max-w-lg">{episode.description}</div>

              <Socials dropdown socials={SOCIALS} />
            </div>

            <div className="video-responsive m-auto">
              <iframe
                className="block sm:hidden"
                width="280"
                height="157"
                src={`https://www.youtube.com/embed/${
                  episode.url.split("/")[3]
                }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <iframe
                className="hidden sm:block"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  episode.url.split("/")[3]
                }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Section>

      {/* LEFT-IMAGE CTA */}
      <Section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full object-cover sm:h-full"
          height={224}
          width={224}
        />

        <div className="p-8 md:p-12 lg:px-16 lg:py-24 h-[500px]">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl mb-6">
              Super Cool Featured Guest Name
            </h2>
            <p className="hidden text-gray-500 md:mt-4 md:block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>
            <div className="border-b-[.5px] border-black my-4" />
            <p className="italic font-thin">
              Founder and chief visionary officer of Charleston News
            </p>

            <div className="mt-6 md:mt-12">
              <a
                href="#"
                className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/70"
              >
                Check them out
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section className="mx-20 mt-8">
        <SectionHeading className="text-right">
          About This Episode
        </SectionHeading>

        <div className="mt-8">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem. Nemo enim ipsam
          voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          Neque porro quisquam est, qui dolorem. <br /> <br />
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem. Nemo enim ipsam
          voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          Neque porro quisquam est, qui dolorem. Nemo enim ipsam voluptatem quia
          voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
          quisquam est, qui dolorem.
        </div>

        <div className="mt-8 italic font-thin">
          #earlycareer #college #hiring
        </div>
      </Section>

      <Section className="mx-20 mt-8">
        <SectionHeading className="text-right">Important Links</SectionHeading>

        <div className="mt-8">
          Click here to download the powerpoint https://collegerecruiter.com/
          <br /> <br />
          To access the slides for this podcast, visit:
          https://collegerecruiter.com/
          <br /> <br />
          For more information, visit: https://collegerecruiter.com/
          <br /> <br />
        </div>
      </Section>

      <Section>
        {episode.sponsors.map((sponsor, idx) => (
          <Image key={idx} src="" alt="" />
        ))}
      </Section>

      <Section className="bg-main mt-20">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="flex mx-20 text-left flex-col md:flex-row items-center">
            <SectionHeading className="text-white text-2xl md:text-3xl w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </SectionHeading>

            <Button
              as="a"
              color={"primary"}
              href={"#"}
              className="px-12 py-3 mt-4 md:mt-0"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default PodcastDetailsPageComponent;
