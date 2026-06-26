import { Product } from '../types';

export const products: Product[] = [
  {
    id: "prod_1",
    name: "Firosa Signature Heavyweight Tee",
    slug: "firosa-signature-heavyweight-tee",
    price: 4500, // $45.00 in cents for Stripe
    description: "Vintage sportswear-inspired fit with clean, minimalist typography. Features subtle turquoise accents on the collar tag.",
    images: ["/placeholder-tee.jpg"],
    badges: ["100% Heavyweight Cotton", "Core"],
    printify_product_id: "map_later",
    collection: "Core Collection",
    variants: [
      { size: "S", printify_variant_id: "map_later", inStock: true },
      { size: "M", printify_variant_id: "map_later", inStock: true },
      { size: "L", printify_variant_id: "map_later", inStock: true },
      { size: "XL", printify_variant_id: "map_later", inStock: true }
    ]
  },
  {
    id: "prod_2",
    name: "The 250 Archive Hoodie",
    slug: "the-250-archive-hoodie",
    price: 8500, // $85.00 in cents
    description: "Premium fleece hoodie featuring subtle cultural nods and a classic aesthetic. Zero cliches, just clean design.",
    images: ["/placeholder-hoodie.jpg"],
    badges: ["Limited Drop"],
    printify_product_id: "map_later",
    collection: "Archive",
    variants: [
      { size: "S", printify_variant_id: "map_later", inStock: false },
      { size: "M", printify_variant_id: "map_later", inStock: true },
      { size: "L", printify_variant_id: "map_later", inStock: true },
      { size: "XL", printify_variant_id: "map_later", inStock: false }
    ]
  }
];