import React from "react";
import * as icons from "components/Socials/logos";

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

const getLogo = (socialName: string) => {
  // This also handles podcast links, ignore param name lol
  switch (socialName) {
    case "apple":
      return icons.apple.src;
    case "spotify":
      return icons.spotify.src;
    case "google":
      return icons.google.src;
    case "amazon":
      return icons.amazon.src;
    case "facebook":
      return icons.facebook.src;
    case "linkedin":
      return icons.linkedin.src;
    case "instagram":
      return icons.instagram.src;
    case "more":
      return icons.more.src;
  }
};
const Socials = ({
  socials,
  className: passedClasses,
}: {
  socials: socialsType[];
  dropdown?: boolean;
  className?: string;
}) => {
  const generateSocialIcon = ({ name, link, icon }: socialsType) => (
    <Button
      key={`social-button${name}`}
      as="a"
      href={link}
      target="_blank"
      color="secondary"
      className="rounded-full h-fit mx-2"
    >
      <Image
        className="rounded-full h-fit"
        src={getLogo(name) || icons.home.src}
        alt={`social-${name}`}
        height={30}
        width={30}
      />
    </Button>
  );

  return (
    <Section className={`flex flex-row mt-8 ${passedClasses}`}>
      {[
        ...socials,
        {
          name: "more",
          link: "https://www.buzzsprout.com/2057493/share",
          icon: icons.more.src,
        },
      ].map((social) => generateSocialIcon(social))}
    </Section>
  );
};

export default Socials;
