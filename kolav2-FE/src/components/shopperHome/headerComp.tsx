import { Button, Typography, Carousel } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import fruit from "@/assets/images/fruit.png";
import tomVite from "@/assets/images/tomVite.png";

const HeaderComp = () => {
  return (
    <Carousel
      className="rounded-lg"
      autoplay={true}
      autoplayDelay={4000}
      loop={true}
      transition={{ type: "tween", duration: 0.5, ease: "linear" }}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-2 w-2 cursor-pointer rounded-full transition-colors ${
                activeIndex === i ? "bg-blue_pry" : "bg-gray-400"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {/* First slide - Fruit positioned in upper-right */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 bg-blue_pry p-10 rounded-lg bg-opacity-10 relative overflow-hidden h-[400px]">
        <div className="flex flex-col gap-2 relative z-10">
          <Typography className="font-semibold text-3xl">
            Best prices. Easy returns.
          </Typography>
          <Typography>Free 48-hour delivery with easy returns</Typography>
        </div>
        <Button className="flex items-center gap-2 bg-blue_pry px-8 normal-case w-full max-w-[200px] justify-center relative z-10">
          Show Now
        </Button>
        <Image
          src={fruit}
          alt="fruit"
          className="absolute right-0 top-0 object-contain w-auto h-auto max-h-full"
        />
      </div>

      {/* Second slide - Tom Vite positioned in center-right */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 bg-[#EA7F131A] p-10 rounded-lg bg-opacity-10 relative overflow-hidden h-[400px]">
        <div className="flex flex-col gap-2 relative z-10">
          <Typography className="font-semibold text-3xl">
            Shop for product at the lowest prices
          </Typography>
          <Typography>Free 48-hour delivery with easy returns</Typography>
        </div>
        <Button className="flex items-center gap-2 bg-blue_pry px-8 normal-case w-full max-w-[200px] justify-center relative z-10">
          Show Now
        </Button>
        <Image
          src={tomVite}
          alt="tom vite"
          className="absolute right-0 top-0 object-contain w-auto h-auto max-h-full"
        />
      </div>
    </Carousel>
  );
};

export default HeaderComp;
