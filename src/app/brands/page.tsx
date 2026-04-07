import React, { lazy, Suspense } from "react";
import Coverpage from "../_components/Shared/Coverpage";
import { FaTags } from "react-icons/fa";
import { getAllBrands } from "@/services/Brand.service";
import LazyComp from "../_components/Shared/LazyComp";

export default async function page() {
  const brands = await getAllBrands();

  const LazyBrandCard = lazy(
    () => import("../_components/Shared/BrandsComp/BrandCard"),
  );

  return (
    <>
      <Coverpage
        h3Content="Top Brands"
        pContent="Shop From Your Favourite Brand"
        sContent="Brands"
        bgcolor="bg-[linear-gradient(135deg,#7F22FE_0%,#8E51FF_50%,#C27AFF_100%)]"
        Icon={FaTags}
      />
      <div className="py-10 px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {brands?.map((brand) => (
          <Suspense key={brand._id} fallback={<LazyComp />}>
            <LazyBrandCard Brands={brand} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
