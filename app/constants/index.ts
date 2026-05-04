export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT", href: "/about" },
  { label: "WHOLESALE", href: "/wholesale" },
  { label: "CONTACT US", href: "/contact" },
];

export type Product = {
  id: number;
  name: string;
  tags: string[];
  price: number;
  rating: number;
  reviews: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Amber Dates",
    tags: ["Soft", "Sweet"],
    price: 1200,
    rating: 5,
    reviews: 120,
    image: "/n1.jpg",
  },
  {
    id: 2,
    name: "Royal Dates",
    tags: ["Rich", "Premium"],
    price: 1500,
    rating: 4,
    reviews: 80,
    image: "/n2.jpg",
  },
  {
    id: 3,
    name: "Desert Gold",
    tags: ["Mild", "Fresh"],
    price: 1100,
    rating: 4,
    reviews: 40,
    image: "/n3.jpg",
  },
  {
    id: 4,
    name: "Honey Dates",
    tags: ["Juicy", "Smooth"],
    price: 1700,
    rating: 5,
    reviews: 200,
    image: "/n4.jpg",
  },
  {
    id: 5,
    name: "Date Mix Box",
    tags: ["Value", "Mix"],
    price: 1950,
    rating: 5,
    reviews: 312,
    image: "/n5.jpg",
  },
  {
    id: 6,
    name: "Organic Dates",
    tags: ["Organic", "Pure"],
    price: 1350,
    rating: 4,
    reviews: 148,
    image: "/n6.jpg",
  },
  {
    id: 7,
    name: "Medjool Dates",
    tags: ["Chewy", "Rich"],
    price: 1800,
    rating: 5,
    reviews: 430,
    image: "/n1.jpg",
  },
  {
    id: 8,
    name: "Stuffed Dates",
    tags: ["Filled", "Gourmet"],
    price: 2200,
    rating: 4,
    reviews: 95,
    image: "/n2.jpg",
  },
];