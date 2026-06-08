import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FiArrowRight } from "react-icons/fi";
import ProductListing from "./components/ProductListing";
import { getCategories } from "@/lib/api";
import Footer from "../../sections/Footer";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

export default async function CategoryPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search as string | undefined;

  if (search) {
    return <ProductListing label={`Search Results for "${search}"`} searchQuery={search} />;
  }

  const categories = await getCategories();
  const parentCats = categories.filter((c) => !c.parent_category_id);

  // Fallback images in case metadata.image is not set on the Medusa backend
  const fallbackImages: Record<string, string> = {
    dates: "/n1.jpg",
    nuts: "/n2.jpg",
    "dry-fruits": "/n3.jpg",
    chocolates: "/n4.jpg",
  };

  return (
    <>
    <section className="min-h-screen bg-cream px-16 py-16 max-lg:px-8 max-md:px-5">
      <div className="max-w-[1440px] mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-black/40 mb-12 tracking-[0.18em] uppercase">
          <Link
            href="/"
            className="hover:text-black transition-colors duration-200"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Shop</span>
        </div>

        {/* Heading */}
        <div className="mb-14 max-md:mb-10">
          <h1 className="font-serif text-[clamp(3rem,6vw,6rem)] leading-none tracking-tight">
            Our Collection
          </h1>
          <p className="mt-5 text-[15px] text-black/55 max-w-[520px] leading-relaxed tracking-tight">
            From premium dates to artisan chocolates — discover curated
            collections crafted for gifting, wellness, and everyday indulgence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          {parentCats.map((cat) => {
            const image = (cat.metadata?.image as string) || fallbackImages[cat.handle] || "/misc.png";
            
            return (
              <Link
                key={cat.id}
                href={`/shop/${cat.handle}`}
                className="
                  group relative overflow-hidden
                  rounded-[34px]
                  h-[420px] max-md:h-[360px]
                  border-2 border-gold/70
                  bg-[#efe7d5]
                  transition-all duration-500
                  hover:border-gold
                "
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent" />
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-7 max-md:p-5">
                  <div className="flex items-end justify-between gap-5">
                    {/* Left */}
                    <div className="flex flex-col">
                      <h2 className="font-serif text-[clamp(2rem,3vw,3.5rem)] text-white leading-none">
                        {cat.name}
                      </h2>
                      <p className="mt-3 text-white/70 text-[14px] leading-relaxed tracking-tight max-w-[360px]">
                        {cat.description || `Discover our selection of ${cat.name}.`}
                      </p>
                    </div>

                    {/* Animated Button */}
                    <div
                      className="
                        relative overflow-hidden
                        w-14 h-14
                        rounded-full
                        border-2 border-gold
                        bg-[#E7DCB7]
                        shrink-0
                      "
                    >
                      <span className="absolute inset-0 flex items-center justify-center group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                        <FiArrowRight size={20} className="text-navy" />
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center bg-navy text-white rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                        <FiArrowRight size={20} className="text-gold" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gold glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}