import { Category } from "@/types/Products";

export async function getAllCategories(): Promise<Category[] | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}

export async function getSpecificCat(id : string): Promise<Category | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}
