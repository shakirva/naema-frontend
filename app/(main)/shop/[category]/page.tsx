import { notFound } from "next/navigation";
import ProductListing from "../components/ProductListing";

const categoryMap: Record<string, string> = {
  dates: "Dates",
  nuts: "Nuts",
  "dry-fruits": "Dry Fruits",
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