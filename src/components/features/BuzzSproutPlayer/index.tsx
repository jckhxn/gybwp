// index.tsx
import React from "react";

// Types for Props
interface Podcast {
  podcast: string;
  lg: boolean;
}
export const BuzzSproutPlayer = ({ podcast, lg }: Podcast) => {
  const podcastSrc = `${podcast}?client_source=small_player&amp;iframe=true&amp;referrer=https%3A%2F%2Fwww.buzzsprout.com%2F2255489.js%3Fcontainer_id%3Dbuzzsprout-small-player%26player%3Dsmall\``;
  return (
    <>
      <div className="max-w-5xl mx-auto px-4">
        <div className="episode flex justify-center items-center mt-4">
          {lg ? (
            <iframe
              id="player_iframe"
              className="w-full h-96 rounded-lg shadow-md"
              src="https://www.buzzsprout.com/2057493?client_source=large_player&iframe=true&referrer=https://www.buzzsprout.com/2057493.js?container_id=buzzsprout-large-player&player=large"
              width="100%"
              height="375"
              frameBorder="0"
              scrolling="no"
              title="Growing your business with People\"
            ></iframe>
          ) : (
            <iframe
              className="w-full h-96 rounded-lg shadow-md"
              src={podcastSrc}
              loading="lazy"
              width="100% "
              height="200"
              frameBorder="0"
              scrolling="no"
              title="Growing your business with People, Unpacking the Power of Purpose in Leadership w/ Kevin McCarthy | S3E12"
            ></iframe>
          )}
        </div>
      </div>
    </>
  );
};
