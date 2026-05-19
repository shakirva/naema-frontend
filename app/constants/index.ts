export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT", href: "/about" },
  { label: "WHOLESALE", href: "/wholesale" },
  { label: "CONTACT", href: "/contact" },
];


export type Product = {
  id: number;
  name: string;

  category:
    | "dates"
    | "nuts"
    | "dry-fruits"
    | "chocolates";

  tags: string[];

  price: number;

  originalPrice?: number;

  rating: number;

  reviews: number;

  image: string;

  description: string;

  badge?: "New" | "Sale" | "Best Seller" | "Limited";

  featured?: boolean;
};
export const products: Product[] = [
  {
    id: 1,
    name: "Amber Dates",
    category: "dates",
    tags: ["Soft", "Sweet"],
    price: 1200,
    originalPrice: 1500,
    rating: 5,
    reviews: 120,
    image: "/n1.jpg",
    description:
      "Soft, naturally sweet dates with a rich caramel flavor.",
    badge: "Best Seller",
    featured: true,
  },

  {
    id: 7,
    name: "Almonds",
    category: "nuts",
    tags: ["Raw", "Crunchy"],
    price: 850,
    rating: 5,
    reviews: 95,
    image: "/n2.jpg",
    description:
      "Fresh, crunchy almonds packed with nutrients and flavor.",
    badge: "New",
    featured: true,
  },

  {
    id: 11,
    name: "Dried Figs",
    category: "dry-fruits",
    tags: ["Sweet", "Chewy"],
    price: 750,
    originalPrice: 950,
    rating: 4,
    reviews: 42,
    image: "/n5.jpg",
    description:
      "Naturally dried figs with a chewy texture and rich taste.",
    featured: false,
  },

  {
    id: 15,
    name: "Dark Choc Bar",
    category: "chocolates",
    tags: ["Dark", "Rich"],
    price: 650,
    rating: 5,
    reviews: 54,
    image: "/n3.jpg",
    description:
      "Rich dark chocolate with deep cocoa flavor and smooth finish.",
    badge: "Limited",
    featured: true,
  },
];