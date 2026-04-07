import { getAllProducts } from "@/services/products.service";
import ProductRecommendClient from "../Shared/ProductComp/ProductRecommendClient";

export default async function ProductRecommend({ ProCatId }: { ProCatId: string }) {
  const allProducts = await getAllProducts();

  const relatedProducts = allProducts
    .filter((product) => product.category._id === ProCatId)
    .slice(0, 8);

  return <ProductRecommendClient products={relatedProducts} />;
}