import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

const HeroSlider = () => {
  return (
    <div className=" relative  text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[33px] md:right-[51px] bottom-0 w-8 md:w-12 h-7 md:h-10 bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm text-white md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, Next) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-8 md:w-12 h-7 md:h-10 bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm rotate-180 text-white md:text-lg" />
          </div>
        )}
      >
        <div>
          <picture>
            <img
              src="/assets/slide-2.png"
              alt="slider"
              className="aspect-[16/10] md:aspect-auto object-cover"
            />
          </picture>
          <button className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-black absolute bottom-[25px] md:bottom-[75px] left-0 text-white text-[15px] md:text-[30px] font-medium cursor-pointer hover:opacity-90">
            SHOP NOW
          </button>
        </div>
        <div>
          <picture>
            <img
              src="/assets/slide-1.png"
              alt="slider"
              className="aspect-[16/10] md:aspect-auto object-cover"
            />
          </picture>
          <button className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-black absolute bottom-[25px] md:bottom-[75px] left-0 text-white text-[15px] md:text-[30px] font-medium cursor-pointer hover:opacity-90">
            SHOP NOW
          </button>
        </div>
        <div>
          <picture>
            <img
              src="/assets/slide-3.png"
              alt="slider"
              className="aspect-[16/10] md:aspect-auto object-cover"
            />
          </picture>
          <button className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-black absolute bottom-[25px] md:bottom-[75px] left-0 text-white text-[15px] md:text-[30px] font-medium cursor-pointer hover:opacity-90">
            SHOP NOW
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSlider;
