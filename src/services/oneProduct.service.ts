import { Products } from "../types/Products";

export async function getOneProduct(id : string): Promise<Products | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
