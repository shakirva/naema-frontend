import Image from "next/image";
import { Link } from "@/i18n/routing";
import React from "react";
import ComboBundle from "../sections/ComboBundle";
import { getCollections, getProducts, getCategories } from "@/lib/api";
import { getTranslations } from "next-intl/server";

const Grid = async () => {
  const t = await getTranslations("Grid");
  const collections = await getCollections();
  const categories = await getCategories();
  const rootCategories = categories.filter((c) => !c.parent_category_id);

  const fallbackItems = [
    { title: "Best Seller", image: "/chocolate.png", height: "lg:row-span-2", href: "/shop/best-seller" },
    { title: "Dates", image: "/dn.png", height: "", href: "/shop/dates" },
    { title: "Chocolates", image: "/datedark.png", height: "", href: "/shop/chocolates" },
    { title: "Nuts", image: "/misc.png", height: "lg:row-span-2", href: "/shop/nuts" },
  ];

  // Build the list of dynamic candidates
  const candidates: { title: string; image?: string; href: string; type: "collection" | "category"; id: string }[] = [];

  // 1. Add collections
  for (const col of collections) {
    candidates.push({
      title: col.title,
      image: col.metadata?.image as string | undefined,
      href: `/shop/${col.handle}`,
      type: "collection",
      id: col.id,
    });
  }

  // 2. Add top root categories if we have fewer than 4 candidates
  const foodCategoryHandles = ["dates", "chocolates", "nuts", "dry-fruits", "gift-boxes"];
  const sortedRootCategories = [...rootCategories].sort((a, b) => {
    const idxA = foodCategoryHandles.indexOf(a.handle || "");
    const idxB = foodCategoryHandles.indexOf(b.handle || "");
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });

  for (const cat of sortedRootCategories) {
    if (candidates.length >= 4) break;
    // Don't add duplicate titles
    if (candidates.some((c) => c.title.toLowerCase() === cat.name.toLowerCase())) continue;
    candidates.push({
      title: cat.name,
      image: (cat.metadata as any)?.image_url || (cat.metadata as any)?.image,
      href: `/shop/${cat.handle}`,
      type: "category",
      id: cat.id,
    });
  }

  // 3. Resolve images for the top 4 candidates asynchronously
  const items = await Promise.all(
    Array.from({ length: 4 }).map(async (_, i) => {
      const candidate = candidates[i];
      const fallback = fallbackItems[i];
      const height = fallback.height;

      if (!candidate) {
        return {
          title: fallback.title,
          image: fallback.image,
          height,
          href: fallback.href,
        };
      }

      let image = candidate.image;
      if (!image) {
        // Fetch first product in this collection or category to use as cover image
        if (candidate.type === "collection") {
          const { products } = await getProducts({ collection_id: [candidate.id], limit: 5 });
          const prodWithImg = products.find((p) => p.thumbnail);
          if (prodWithImg) image = prodWithImg.thumbnail || undefined;
        } else {
          const { products } = await getProducts({ category_id: [candidate.id], limit: 5 });
          const prodWithImg = products.find((p) => p.thumbnail);
          if (prodWithImg) image = prodWithImg.thumbnail || undefined;
        }
      }

      return {
        title: candidate.title,
        image: image || fallback.image,
        height,
        href: candidate.href,
      };
    })
  );

  const translateTitle = (title: string) => {
    switch (title) {
      case "Dates": return t("categories.Dates");
      case "Nuts": return t("categories.Nuts");
      case "Chocolates": return t("categories.Chocolates");
      case "Best Seller": return t("categories.BestSeller");
      case "Dry Fruits": return t("categories.DryFruits");
      default: return title;
    }
  };

  return (
    <section className="w-full bg-[#0A223A] px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:rounded-t-[200px] md:rounded-t-[120px] rounded-t-[60px] border-t-10 border-darkgold relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/bigdarkpalm.png"
          alt="Palm"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="font-serif text-[22px] text-cream leading-none w-fit bg-gold/10 border border-gold/30 rounded-lg px-4 py-2">
            {t("featuredCollections")}
          </span>

          <h2 className="font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] text-cream mt-8 max-w-[900px]">
            {t.rich("handpickedFavorites", {
              gold: (chunks) => <span className="italic text-gold">{chunks}</span>
            })}
          </h2>

          <p className="mt-6 text-cream/70 text-[clamp(1rem,1.5vw,1.15rem)] tracking-tight leading-[1.3] max-w-[620px]">
            {t("curatedSelections")}
          </p>
        </div>

        {/* ── MOBILE & DESKTOP grid (hidden on tablet) ── */}
        <div className="mt-16 mb-5 block md:hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr_1fr] gap-5 lg:auto-rows-[280px]">
            {/* Left Tall Card */}
            <Link
              href={items[0].href}
              className={`
                group relative overflow-hidden rounded-[28px]
                border-2 border-gold
                h-[420px] lg:h-auto
                ${items[0].height}
              `}
            >
              <Image
                src={items[0].image}
                alt={items[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <h3 className="font-serif text-[clamp(2.2rem,3vw,4rem)] leading-[0.95] text-cream max-w-[280px]">
                  {translateTitle(items[0].title)}
                </h3>
                <span className="inline-block mt-4 text-sm text-gold border-b border-gold/40 pb-1">
                  {t("viewCollection")}
                </span>
              </div>
            </Link>

            {/* Middle Column */}
            <div className="flex flex-col gap-5 lg:h-[calc(280px*2+20px)]">
              {items.slice(1, 3).map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="
                    group relative overflow-hidden
                    rounded-[28px]
                    border-2 border-gold
                    flex-1
                    min-h-[240px]
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                    <h3 className="font-serif text-[clamp(1.8rem,2vw,2.8rem)] leading-[1] text-cream max-w-[300px]">
                      {translateTitle(item.title)}
                    </h3>
                    <span className="inline-block mt-3 text-sm text-gold border-b border-gold/40 pb-1">
                      {t("viewCollection")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Tall Card */}
            <Link
              href={items[3].href}
              className={`
                group relative overflow-hidden rounded-[28px]
                border-2 border-gold
                h-[420px] lg:h-auto
                ${items[3].height}
              `}
            >
              <Image
                src={items[3].image}
                alt={items[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <h3 className="font-serif text-[clamp(2.2rem,3vw,4rem)] leading-[0.95] text-cream max-w-[320px]">
                  {translateTitle(items[3].title)}
                </h3>
                <span className="inline-block mt-4 text-sm text-gold border-b border-gold/40 pb-1">
                  {t("viewCollection")}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* ── TABLET grid (hidden on mobile and desktop) ── */}
        <div className="mt-16 mb-5 hidden md:block lg:hidden">
          <div className="grid grid-cols-1 gap-5">
            {/* Card 1 — full width */}
            <Link
              href={items[0].href}
              className="group relative overflow-hidden rounded-[28px] border-2 border-gold h-[350px]"
            >
              <Image
                src={items[0].image}
                alt={items[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="font-serif text-[clamp(2.2rem,3vw,4rem)] leading-[0.95] text-cream max-w-[280px]">
                  {translateTitle(items[0].title)}
                </h3>
                <span className="inline-block mt-4 text-sm text-gold border-b border-gold/40 pb-1">
                  {t("viewCollection")}
                </span>
              </div>
            </Link>

            {/* Cards 2 & 3 — equal width side by side */}
            <div className="grid grid-cols-2 gap-5">
              {items.slice(1, 3).map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative overflow-hidden rounded-[28px] border-2 border-gold h-[320px]"
                >
                  <Image
                     src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="font-serif text-[clamp(1.8rem,2vw,2.8rem)] leading-[1] text-cream max-w-[300px]">
                      {translateTitle(item.title)}
                    </h3>
                    <span className="inline-block mt-3 text-sm text-gold border-b border-gold/40 pb-1">
                      {t("viewCollection")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Card 4 — full width */}
            <Link
              href={items[3].href}
              className="group relative overflow-hidden rounded-[28px] border-2 border-gold h-[350px]"
            >
              <Image
                src={items[3].image}
                alt={items[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="font-serif text-[clamp(2.2rem,3vw,4rem)] leading-[0.95] text-cream max-w-[320px]">
                  {translateTitle(items[3].title)}
                </h3>
                <span className="inline-block mt-4 text-sm text-gold border-b border-gold/40 pb-1">
                  {t("viewCollection")}
                </span>
              </div>
            </Link>
          </div>
        </div>

        <ComboBundle />
      </div>
    </section>
  );
};

export default Grid;