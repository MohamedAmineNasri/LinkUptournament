import React from "react";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z--1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}

          <div className="flex justify-center items-center uppercase font-semibold gap-x-2 text-[32px] sm:text-[64px] lg:text-[72px]">
            <span style={{ fontSize: "1.5em" }} className="pr-4">
              For
            </span>

            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Academies",
                2000,
                "Footballer",
                2000,
                "Youth",
                2000,
              ]}
              speed={50}
              style={{ fontSize: "1.5em" }}
              repeat={Infinity}
              className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-[#BBF7D0]"
            />
          </div>
          {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          /> */}
          <img
            src="https://i.pinimg.com/originals/7c/b0/78/7cb078025327e99122aecb116efb279d.gif"
            alt="Modal video thumbnail"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
