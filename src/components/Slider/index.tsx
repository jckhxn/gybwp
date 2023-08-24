import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// components
import Button from "components/Button";
import Image from "next/image";
import Link from "next/link";

//
//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV
// And maybe not even then, lol gsap why are you so complicated

const Slider: React.FC<{ items?: any[]; activeSeason: number }> = ({
  items,
  activeSeason,
}) => {
  console.log(items);
  const [sliderIndex, setSliderIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const getDeviceValue = () => {
    const { innerWidth: width } = window;
    return width <= 768; // average size of mobile device -- "medium" device size
  };

  useEffect(() => {
    setIsMobileDevice(getDeviceValue());

    const handleChange = () => setIsMobileDevice(getDeviceValue());
    window.addEventListener("resize", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
    };
  }, []);

  const animateTransition = (next: number) => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: -1 * next * (250 + 40), // Each tout is 250px w/ 40px of margin
        ease: "modern",
        duration: 0.75,
      });
    }
  };

  useEffect(() => {
    setSliderIndex(0); // resets index of active slide to start
    animateTransition(0); // resets slide animation back to beginning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSeason]);

  useEffect(() => {
    if (wrapperRef.current && sliderRef.current) {
      wrapperRef.current.style.height = `${sliderRef.current.clientHeight}px`;
    }
  }, []);

  if (!items || !items.length) {
    return null;
  }

  const increment = isMobileDevice ? 1 : 3;

  const incrementSlider = () => {
    if (sliderIndex !== items.length - increment) {
      animateTransition(sliderIndex + increment);
      setSliderIndex((p) => p + increment);
    }
  };

  const decrementSlider = () => {
    if (sliderIndex !== 0) {
      animateTransition(sliderIndex - increment);
      setSliderIndex((p) => p - increment);
    }
  };

  const generateHeader = ({
    episodeNumber,
    uuid,
  }: {
    episodeNumber: number;
    uuid: string;
  }) => {
    const standardEpisode = `Episode ${episodeNumber}`;

    if (episodeNumber === 0) {
      return "Season Trailer";
    }

    if (uuid.includes("-")) {
      return standardEpisode + ` - Part ${uuid.split("-")[1]}`;
    }

    if (uuid.includes("_")) {
      return "Clip | " + standardEpisode;
    }

    return standardEpisode;
  };

  return (
    <>
      <div
        className="mt-8 overflow-x-visible w-full relative h-[400px]"
        ref={wrapperRef}
      >
        <div
          id="slider"
          className="flex absolute left-[8px] md:left-[50px]"
          ref={sliderRef}
        >
          {items.map(({ episodeName, episodeNumber, image, uuid }, idx) => (
            <div
              key={`carousel-item-${idx}`}
              className="bg-white border border-gray-200 w-[250px] mr-[40px] h-[400px]"
            >
              <Link href={`/episode/${uuid}`} className="bg-main group">
                <Image
                  src={image || ""}
                  alt={episodeName}
                  className="rounded-box object-cover group-hover:opacity-90 h-[250px]"
                  width={250}
                  height={350}
                />
                <div className="mt-4 px-3 pb-4 h-20">
                  <h3 className="text-md font-semibold text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {generateHeader({ episodeNumber, uuid })}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 overflow-ellipsis">
                    {episodeName}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 gap-4 ml-[8px] md:ml-[50px]">
        <Button
          aria-label={`${
            sliderIndex === 0 ? "disabled" : "enabled"
          } menu back button`}
          className="h-[60px] w-[60px] md:h-[70px] md:w-[70px] mt-4 mr-4"
          type={sliderIndex === 0 ? "disabled" : "default"}
          onClick={() => decrementSlider()}
        >
          ←
        </Button>
        <Button
          aria-label="menu forward button"
          className="h-[60px] w-[60px] md:h-[70px] md:w-[70px] mt-4"
          type={
            sliderIndex >= items.length - increment ? "disabled" : "default"
          }
          onClick={() => incrementSlider()}
        >
          →
        </Button>
      </div>
    </>
  );
};

export default Slider;
