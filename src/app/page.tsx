import React from "react";
import HomeSlider from "./_components/Home/HomeSlider";
import HomeHelpers from "./_components/Home/HomeHelpers";
import HomeCategories from "./_components/Home/HomeCategories";
import HomeProducts from "./_components/Home/HomeProducts";
import HomeForm from "./_components/Home/HomeForm";

export default async function page() {
  

  return (
    <>
      <HomeSlider />
      <HomeHelpers />
      <HomeCategories />
      <HomeProducts />
      <HomeForm />
    </>
  );
}
