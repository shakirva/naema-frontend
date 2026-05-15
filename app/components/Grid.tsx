"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/chocolate.png";
const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9001";
const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

// 5-tile masonry: top row 3 + bottom row 1 + 2-wide.
const TILE_SPAN_CLASS = [
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
];

type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail: string | null;
  metadata?: { featured?: boolean; featured_badge?: string | null } | null;
  categories?: { id: string; handle: string; name: string }[] | null;
  tags?: { id: string; value: string }[] | null;
  featured_badge?: string | null;
};

type Tile = {
  id: string;
  title: string;
  image: string;
  badge: string;
  href: string;
  remote: boolean;
};

const productToTile = (p: FeaturedProduct): Tile => {
  const image = p.thumbnail || FALLBACK_IMAGE;
  const badge =
    p.featured_badge ||
    p.metadata?.featured_badge ||
    p.tags?.[0]?.value ||
    "Featured";
  const categoryHandle = p.categories?.[0]?.handle;
  const href = categoryHandle ? `/shop/${categoryHandle}` : "/shop";
  return {
    id: p.id,
    title: p.title,
    image,
    badge,
    href,
    remote: image.startsWith("http"),
  };
};

const Grid = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchTiles = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/store/featured-products?limit=5`, {
          headers: PUBLISHABLE_KEY
            ? { "x-publishable-api-key": PUBLISHABLE_KEY }
            : {},
          cache: "no-store",
        });
        const data = (await res.json()) as { products?: FeaturedProduct[] };
        if (!cancelled && data.products?.length) {
          setTiles(data.products.slice(0, 5).map(productToTile));
          return;
        }
      } catch {
        // fall through to fallback
      }

      // Fallback so the section never looks broken pre-curation.
      try {
        const res = await fetch(
          `${BACKEND_URL}/store/products?limit=5&fields=id,title,handle,thumbnail,categories.handle`,
          {
            headers: PUBLISHABLE_KEY
              ? { "x-publishable-api-key": PUBLISHABLE_KEY }
              : {},
            cache: "no-store",
          }
        );
        const data = (await res.json()) as { products?: FeaturedProduct[] };
        if (!cancelled) {
          setTiles((data.products ?? []).map(productToTile));
        }
      } catch {
        if (!cancelled) setTiles([]);
      }
    };

    fetchTiles();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full bg-[#0A223A] px-16 py-16 max-lg:pt-8 max-lg:px-8 max-md:px-5 lg:rounded-t-[200px] max-lg:rounded-t-[100px] max-md:rounded-t-[50px] min-h-screen mt-12 relative overflow-hidden">
      <div className="absolute inset-0 h-full w-full opacity-5">
        <Image
          src={"/bigdarkpalm.png"}
          alt="dates"
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-serif text-[clamp(2rem,4.44vw,4rem)] leading-none text-center text-cream">
          Handpicked Favorites
        </h2>
        <p className="mt-4 text-cream text-center text-base tracking-tight">
          Our top picks, loved by thousands of date lovers worldwide.
        </p>

        <div className="w-full mt-24 max-lg:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[380px]">
            {tiles.map((tile, idx) => (
              <Link
                href={tile.href}
                key={tile.id}
                className={`relative bg-cream rounded-xl overflow-hidden border-2 border-gold ${
                  TILE_SPAN_CLASS[idx] ?? "lg:col-span-1"
                }`}
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 w-full h-full px-4 py-4 flex flex-col justify-between hover:bg-black/60 z-10 transition-colors duration-300 ease-in-out">
                  <span className="bg-cream text-black px-6 py-4 text-lg capitalize rounded-full w-fit text-center font-semibold tracking-tight border-gold border-2">
                    {tile.badge}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;
