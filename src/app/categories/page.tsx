import React, { lazy, Suspense } from "react";
import Coverpage from "../_components/Shared/Coverpage";
import { MdCategory } from "react-icons/md";
import { getAllCategories } from "@/services/Category.service";
import LazyComp from "../_components/Shared/LazyComp";

export default async function page() {
  const categories = await getAllCategories();  

  const LazyCategoryCard = lazy(
    () => import("../_components/Shared/CategoryComp/CategoryCard"),
  );

  return (
    <>
      <Coverpage
        href="/"
        pContent="Browse our wide range of product categories"
        h3Content="All Categories"
        bgcolor="bg-[linear-gradient(135deg,_#16A34A_0%,_#22C55E_50%,_#4ADE80_100%)]"
        Icon={MdCategory}
        sContent="Categories"
      />
      <div className="py-10 px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories?.map((category) => (
          <Suspense key={category._id} fallback={<LazyComp />}>
            <LazyCategoryCard category={category} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
