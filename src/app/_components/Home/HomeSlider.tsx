import React from "react";
import Slider from "../Shared/Slider";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import slide1 from "../../../assets/HomeImages/imgslider.png";
import slide2 from "../../../assets/HomeImages/imgslider2.png";
import slide3 from "../../../assets/HomeImages/imgslider3.png";
import Homebtn from "../Shared/HomeComp/Homebtn";

const homeSlides = [
  {
    image: slide1.src,
    alt: "Slide 1",
    content: (
      <div className="pt-8 sm:pt-16 md:pt-31 pb-4 sm:pb-6 md:pb-[33.42px] 
                pr-4 sm:pr-6 md:pr-8 
                pl-6 sm:pl-12 md:pl-30 
                flex flex-col gap-3 sm:gap-4">
        <h2 className="text-white font-bold text-3xl leading-9">
          Fresh Products Delivered <br /> to your Door
        </h2>
        <p className="font-medium text-base text-white">
          Get 20% off your first order
        </p>
        <div className="flex gap-2">
          <Homebtn
            textclr={"homeGreen"}
            bgclr={"white"}
            linkto={"/products"}
            content={"Shop Now"}
          />
          <Homebtn
            textclr="white"
            bgclr="transparent"
            linkto="/Deals"
            content="View Deals"
          />
        </div>
      </div>
    ),
  },
  {
    image: slide2.src,
    alt: "Slide 2",
    content: (
      <div className="pt-8 sm:pt-16 md:pt-31 pb-4 sm:pb-6 md:pb-[33.42px] 
                pr-4 sm:pr-6 md:pr-8 
                pl-6 sm:pl-12 md:pl-30 
                flex flex-col gap-3 sm:gap-4">
        <h2 className="text-white font-bold text-3xl leading-9">
          Premium Quality <br /> Guaranteed
        </h2>
        <p className="font-medium text-base text-white">
          Fresh from farm to your table
        </p>
        <div className="flex gap-2">
          <Homebtn
            textclr={"blue-500"}
            bgclr={"white"}
            linkto={"/products"}
            content={"Shop Now"}
          />
          <Homebtn
            textclr="white"
            bgclr="transparent"
            linkto="/about"
            content="Learn More"
          />
        </div>
      </div>
    ),
  },
  {
    image: slide3.src,
    alt: "Slide 3",
    content: (
      <div className="pt-8 sm:pt-16 md:pt-31 pb-4 sm:pb-6 md:pb-[33.42px] 
                pr-4 sm:pr-6 md:pr-8 
                pl-6 sm:pl-12 md:pl-30 
                flex flex-col gap-3 sm:gap-4">
        <h2 className="text-white font-bold text-3xl leading-9">
          Fast & Free Delivery{" "}
        </h2>
        <p className="font-medium text-base text-white">
          Same day delivery available{" "}
        </p>
        <div className="flex gap-2">
          <Homebtn
            textclr={"blue-500"}
            bgclr={"white"}
            linkto={"/products"}
            content={"Order Now"}
          />
          <Homebtn
            textclr="white"
            bgclr="transparent"
            linkto="/deals"
            content="Dilevery Info"
          />
        </div>
      </div>
    ),
  },
];

const homeOverlay =
  "linear-gradient(90deg, rgba(0, 201, 80, 0.9) 0%, rgba(5, 223, 114, 0.5) 100%)";

export default function HomeSlider() {
  return (
    <Slider
      slides={homeSlides}
      className="home-slider"
      height={400}
      overlay={homeOverlay}
      prevIcon={<MdChevronLeft size={30} color="rgba(0, 201, 80, 0.8)" />}
      nextIcon={<MdChevronRight size={30} color="rgba(0, 201, 80, 0.8)" />}
    />
  );
}
