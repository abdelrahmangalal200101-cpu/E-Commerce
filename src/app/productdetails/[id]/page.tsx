import ProductHeader from "@/app/_components/ProductDetails/ProductHeader";
import ProductNavs from "@/app/_components/ProductDetails/ProductNavs";
import ProductRecommend from "@/app/_components/ProductDetails/ProductRecommend";
import { getOneProduct } from "@/services/oneProduct.service";
import React from "react";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await getOneProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductHeader product={product} />
      <ProductNavs product={product} />
      <ProductRecommend ProCatId={product.category._id} />
    </>
  );
}
