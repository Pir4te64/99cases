import React from "react";
import FastMarquee from "react-fast-marquee";

const textItems = [
  "ENVIOS A TODO EL PAÍS",
  "HECHO EN ARGENTINA",
  "SOMOS 99% CASES",
];

const Marquee = () => {
  return (
    <div className="h-12 overflow-hidden whitespace-nowrap bg-red-600">
      <FastMarquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        loop={0}
        autoFill={true}
        className="flex h-full items-center"
      >
        {textItems.map((item, i) => (
          <span
            key={i}
            className="mx-8 font-favoritMono text-xs font-bold uppercase italic text-white sm:text-sm md:text-base"
          >
            {item}
          </span>
        ))}
      </FastMarquee>
    </div>
  );
};

export default Marquee;
