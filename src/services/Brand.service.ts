import { Brand } from "@/types/Products";

export async function getAllBrands(): Promise<Brand[] | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}

export async function getSpecificBrand(id : string): Promise<Brand | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}
