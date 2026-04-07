import Cards from "@/app/_components/Shared/Cards";
import Coverpage from "@/app/_components/Shared/Coverpage";
import { getSpecificCat } from "@/services/Category.service";
import { getPostsCategory } from "@/services/products.service";
import { PackageSearch } from "lucide-react";
import React from "react";

export default async function page(props: {
  params: Promise<{ catid: string }>;
}) {
  const params = await props.params;
  const id = params.catid;
  const products = await getPostsCategory(id);
  const Category = await getSpecificCat(id);

  return (
    <>
      <Coverpage
        isSub={true}
        href="/categories"
        sContent="Categories"
        categoryOrBrand={Category ?? undefined}
        pContent="Explore More About Specific Category"
        bgcolor="bg-[linear-gradient(135deg,_#16A34A_0%,_#22C55E_50%,_#4ADE80_100%)]"
        h3Content=""
      />

      <div className="py-10 px-4">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="size-20 rounded-2xl bg-green-50 flex items-center justify-center">
              <PackageSearch className="size-10 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              No Products Yet
            </h2>
            <p className="text-sm text-gray-400 max-w-xs">
              This category doesn't have any products at the moment. Check back
              later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <Cards products={products} />
          </div>
        )}
      </div>
    </>
  );
}
