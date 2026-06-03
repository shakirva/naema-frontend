import { notFound } from "next/navigation";
import ProductListing from "../components/ProductListing";

const categoryMap: Record<string, string> = {
  dates: "Dates",
  nuts: "Nuts",
  "dry-fruits": "Dry Fruits",
  "dry-fruits-and-nuts": "Dry Fruits and Nuts",
  "other-products": "Other Products",
  chocolates: "Chocolates",
};

const CategoryProductPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params; // ✅ FIX

  const label = categoryMap[category];
  if (!label) return notFound();

  return <ProductListing category={category} label={label} />;
};

export default CategoryProductPage;