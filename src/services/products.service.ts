import { Products } from "../types/Products";

export async function getAllProducts(): Promise<Products[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      next: { revalidate: 60 * 60 * 24 * 5 },
    });

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
export async function getPostsCategory(id: string): Promise<Products[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
      {
        next: { revalidate: 60 * 60 * 24 * 5 },
      },
    );

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getPostsBrands(id: string): Promise<Products[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      {
        next: { revalidate: 60 * 60 * 24 * 5 },
      },
    );

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function searchProducts(
  keyword: string,
  params?: Record<string, string | string[]>
) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
  const data = await res.json();
  let products: Products[] = data.data;

  // Filter by keyword
  if (keyword.trim()) {
    const lower = keyword.toLowerCase();
    products = products.filter((p) =>
      p.title.toLowerCase().includes(lower) ||
      p.category?.name?.toLowerCase().includes(lower) ||
      p.brand?.name?.toLowerCase().includes(lower)
    );
  }

  // Filter by category
  const categories = params?.["category[in]"];
  if (categories?.length) {
    const cats = Array.isArray(categories) ? categories : [categories];
    products = products.filter((p) => cats.includes(p.category._id));
  }

  const brands = params?.["brand"];
  if (brands?.length) {
    const bran = Array.isArray(brands) ? brands : [brands];
    products = products.filter((p) => bran.includes(p.brand._id));
  }

  // Filter by price
  const minPrice = params?.["price[gte]"];
  const maxPrice = params?.["price[lte]"];
  if (minPrice) products = products.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) products = products.filter((p) => p.price <= Number(maxPrice));

  // Sort
  const sort = params?.["sort"];
  if (sort === "-price") products.sort((a, b) => b.price - a.price);
  if (sort === "price") products.sort((a, b) => a.price - b.price);
  if (sort === "-ratingsAverage") products.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  if (sort === "-sold") products.sort((a, b) => b.sold - a.sold);

  return products;
}