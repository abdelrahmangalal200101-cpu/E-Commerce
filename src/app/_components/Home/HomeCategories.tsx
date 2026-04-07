import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import HomeCategoriesCards from "../Shared/HomeComp/HomeCategoriesCards";
import HomeMarketing from "../Shared/HomeComp/HomeMarketing";
import { getAllCategories } from "@/services/Category.service";

export default async function HomeCategories() {
  const categories = await getAllCategories();

  return (
    <div className="px-10 py-10 bg-white">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 sm:h-8 rounded-full bg-[linear-gradient(180deg,#00BC7D_0%,#007A55_100%)]"></div>

            <h2 className="text-[#1E2939] font-bold text-xl sm:text-2xl md:text-3xl">
              Shop By <span className="text-homeGreen2">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="group flex items-center gap-2 sm:gap-3 self-start sm:self-auto"
          >
            <p className="text-homeGreen group-hover:text-[#15803D] transition-all duration-150 text-sm sm:text-base font-medium">
              View All Categories
            </p>

            <FaLongArrowAltRight className="text-homeGreen group-hover:text-[#15803D] transition-all duration-150 text-sm sm:text-base" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories?.map((obj) => (
            <HomeCategoriesCards
              key={obj._id}
              id={obj._id}
              title={obj.name}
              img={obj.image}
            />
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 w-full">
          {" "}
          <HomeMarketing
            key={"first"}
            background="linear-gradient(135deg , #00BC7D 0% , #007A55 100%)"
            icon="🔥"
            badgeContent="Deal of the Day"
            h3Card="Fresh Organic Fruits"
            P="Get up to 40% off on selected organic fruits"
            h4Card="40% OFF"
            code="ORGANIC40"
            textbtn="homeGreen2"
            btnContent="Shop Now"
          />
          <HomeMarketing
            key={"second"}
            background="linear-gradient(135deg , #FF8904 0% , #FF2056 100%)"
            icon="✨"
            badgeContent="New Arrivals"
            h3Card="Exotic Vegetables"
            P="Discover our latest collection of premium vegetables"
            h4Card="25% OFF"
            code="FRESH25"
            textbtn="homeOrange2"
            btnContent="Explore Now"
          />
        </div>
      </div>
    </div>
  );
}
