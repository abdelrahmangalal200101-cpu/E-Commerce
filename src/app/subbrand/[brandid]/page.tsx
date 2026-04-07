import Cards from "@/app/_components/Shared/Cards";
import Coverpage from "@/app/_components/Shared/Coverpage";
import { getSpecificBrand } from "@/services/Brand.service";
import { getPostsBrands } from "@/services/products.service";
import { PackageSearch } from "lucide-react";
import { MdOutlineLabelImportant } from "react-icons/md";
import { FaTag } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

import React from "react";
import Link from "next/link";

export default async function page(props: {
  params: Promise<{ brandid: string }>;
}) {
  const params = await props.params;
  const id = params.brandid;
  const products = await getPostsBrands(id);
  const brand = await getSpecificBrand(id);

  return (
    <>
      <Coverpage
        isSub={true}
        isbrand={true}
        href="/brands"
        sContent="Brands"
        categoryOrBrand={brand ?? undefined}
        pContent="Explore More About Specific Brand"
        bgcolor="bg-[linear-gradient(135deg,#7F22FE_0%,#8E51FF_50%,#C27AFF_100%)]"
        h3Content=""
      />

      <div className="py-10 px-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2.5 items-center">
            <div className="flex items-center gap-2">
              <MdOutlineLabelImportant className="text-secondary text-base" />
              <span className="text-sm text-secondary font-bold">
                Active Link :
              </span>
            </div>
            <div className="items-center gap-2 flex py-1 px-3 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold">
              <FaTag />
              <span>{brand?.name}</span>
            </div>
            <Link href={"/brands"} className="text-secondary text-base hover:text-red-600 duration-200 transition-all">
              <IoMdCloseCircle />
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <div className="size-20 rounded-2xl bg-blue-50 flex items-center justify-center">
                <PackageSearch className="size-10 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">
                No Products Yet
              </h2>
              <p className="text-sm text-gray-400 max-w-xs">
                This category doesn't have any products at the moment. Check
                back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <Cards products={products} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
