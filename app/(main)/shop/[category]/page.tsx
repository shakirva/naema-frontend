import { notFound } from "next/navigation";
import ProductListing from "../components/ProductListing";
import { getCategoryByHandle } from "@/lib/api";

const CategoryProductPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  // Try to get the category from Medusa
  const cat = await getCategoryByHandle(category);

  // Use Medusa category name or fall back to formatted handle
  const label = cat?.name || category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return <ProductListing category={category} label={label} />;
};

export default CategoryProductPage;