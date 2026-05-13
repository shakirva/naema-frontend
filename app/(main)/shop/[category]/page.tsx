import { notFound } from "next/navigation";
import ProductListing from "../components/ProductListing";

// Maps URL slug → display label
// Includes both the original design slugs AND our actual Medusa category handles
const categoryMap: Record<string, string> = {
  // Original design categories
  dates: "Dates",
  nuts: "Nuts",
  "dry-fruits": "Dry Fruits",
  chocolates: "Chocolates",
  // Our actual Medusa dry-fruit category handles
  pista: "Pista",
  walnut: "Walnut",
  almond: "Almond",
  cashew: "Cashew",
  "pumpkin-seed": "Pumpkin Seed",
  fig: "Fig",
  kismiss: "Kismiss",
};

const CategoryProductPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const label = categoryMap[category];
  if (!label) return notFound();
  return <ProductListing category={category} label={label} />;
};

export default CategoryProductPage;
