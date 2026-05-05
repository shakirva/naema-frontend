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
  category: "dates" | "nuts" | "dry-fruits" | "chocolates";
  tags: string[];
  price: number;
  rating: number;
  reviews: number;
  image: string;
};

export const products: Product[] = [
  { id: 1,  name: "Amber Dates",    category: "dates",       tags: ["Soft", "Sweet"],      price: 1200, rating: 5, reviews: 120, image: "/n1.jpg" },
  { id: 2,  name: "Royal Dates",    category: "dates",       tags: ["Rich", "Premium"],    price: 1500, rating: 4, reviews: 80,  image: "/n2.jpg" },
  { id: 3,  name: "Desert Gold",    category: "dates",       tags: ["Mild", "Fresh"],      price: 1100, rating: 4, reviews: 40,  image: "/n3.jpg" },
  { id: 4,  name: "Honey Dates",    category: "dates",       tags: ["Juicy", "Smooth"],    price: 1700, rating: 5, reviews: 200, image: "/n4.jpg" },
  { id: 5,  name: "Date Mix Box",   category: "dates",       tags: ["Value", "Mix"],       price: 1950, rating: 5, reviews: 312, image: "/n5.jpg" },
  { id: 6,  name: "Organic Dates",  category: "dates",       tags: ["Organic", "Pure"],    price: 1350, rating: 4, reviews: 148, image: "/n6.jpg" },
  { id: 7,  name: "Almonds",        category: "nuts",        tags: ["Raw", "Crunchy"],     price: 850,  rating: 5, reviews: 95,  image: "/n1.jpg" },
  { id: 8,  name: "Cashews",        category: "nuts",        tags: ["Roasted", "Salted"],  price: 1100, rating: 4, reviews: 60,  image: "/n2.jpg" },
  { id: 9,  name: "Pistachios",     category: "nuts",        tags: ["Premium", "Rich"],    price: 1400, rating: 5, reviews: 78,  image: "/n3.jpg" },
  { id: 10, name: "Walnuts",        category: "nuts",        tags: ["Crunchy", "Natural"], price: 950,  rating: 4, reviews: 52,  image: "/n4.jpg" },
  { id: 11, name: "Dried Figs",     category: "dry-fruits",  tags: ["Sweet", "Chewy"],     price: 750,  rating: 4, reviews: 42,  image: "/n5.jpg" },
  { id: 12, name: "Raisins",        category: "dry-fruits",  tags: ["Juicy", "Natural"],   price: 450,  rating: 4, reviews: 88,  image: "/n6.jpg" },
  { id: 13, name: "Dried Apricots", category: "dry-fruits",  tags: ["Tangy", "Soft"],      price: 680,  rating: 5, reviews: 34,  image: "/n1.jpg" },
  { id: 14, name: "Dried Prunes",   category: "dry-fruits",  tags: ["Rich", "Chewy"],      price: 590,  rating: 4, reviews: 29,  image: "/n2.jpg" },
  { id: 15, name: "Dark Choc Bar",  category: "chocolates",  tags: ["Dark", "Rich"],       price: 650,  rating: 5, reviews: 54,  image: "/n3.jpg" },
  { id: 16, name: "Date Truffles",  category: "chocolates",  tags: ["Artisan", "Sweet"],   price: 900,  rating: 5, reviews: 120, image: "/n4.jpg" },
  { id: 17, name: "Milk Choc Box",  category: "chocolates",  tags: ["Creamy", "Smooth"],   price: 750,  rating: 4, reviews: 67,  image: "/n5.jpg" },
  { id: 18, name: "Choc Gift Set",  category: "chocolates",  tags: ["Gift", "Premium"],    price: 1800, rating: 5, reviews: 43,  image: "/n6.jpg" },
];