// types/index.ts
export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface ProductVariant {
  size: Size;
  printify_variant_id: string; // map later
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // cents
  description: string;
  images: string[];
  badges: string[]; // e.g. "Limited Drop", "100% Heavyweight Cotton"
  variants: ProductVariant[];
  printify_product_id: string; // map later
  collection: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: Size;
  quantity: number;
}