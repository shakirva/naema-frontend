"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  tags: string[];
  price: string;
  rating: number;
  reviewCount: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Amber Dates",
    tags: ["Soft", "Sweet"],
    price: "$34.99",
    rating: 5,
    reviewCount: 2672,
    image: "/x1.webp",
  },
  {
    id: 2,
    name: "Royal Dates",
    tags: ["Firm", "Rich"],
    price: "$29.99",
    rating: 4.5,
    reviewCount: 693,
    image: "/x2.webp",
  },
  {
    id: 3,
    name: "Desert Gold",
    tags: ["Light", "Mild"],
    price: "$39.99",
    rating: 4,
    reviewCount: 57,
    image: "/x3.webp",
  },
  {
    id: 4,
    name: "Honey Dates",
    tags: ["Juicy", "Smooth"],
    price: "$43.99",
    rating: 5,
    reviewCount: 11,
    image: "/x4.webp",
  },
  {
    id: 5,
    name: "Date Mix Box",
    tags: ["Value", "Mix"],
    price: "$49.99",
    rating: 5,
    reviewCount: 312,
    image: "/x5.webp",
  },
  {
    id: 6,
    name: "Organic Dates",
    tags: ["Organic", "Pure"],
    price: "$38.99",
    rating: 4.5,
    reviewCount: 148,
    image: "/x6.webp",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {filled ? (
              <path
                d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
                fill="#ccba78"
              />
            ) : half ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="#ccba78" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
                  fill={`url(#half-${star})`}
                />
              </>
            ) : (
              <path
                d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
                fill="#ccba78"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [added, setAdded] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleAddToCart = () => {
    setAdded(true);
    setAnnouncement(`${product.name} added to cart`);
    setTimeout(() => {
      setAdded(false);
      setAnnouncement("");
    }, 1500);
  };

  return (
    <div className="flex-none w-[296px] max-md:w-[240px] flex flex-col gap-3 group">
      {/* Image */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden border">
        <Image
          src={product.image}
          alt={`${product.name} - ${product.tags.join(", ")}`}
          fill
          className="object-cover group-hover:scale-[1.1] transition-all duration-300 ease-in-out"
          sizes="288px"
        />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <StarRating rating={product.rating} />
        <Link
          href={`#reviews-${product.id}`}
          className="text-sm font-semibold text-gold underline underline-offset-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded-sm"
          aria-label={`Read ${product.reviewCount.toLocaleString()} reviews for ${product.name}`}
        >
          ({product.reviewCount.toLocaleString()})
        </Link>
      </div>

      {/* Name */}
      <h3 className="font-medium text-[20px]  capitalize tracking-tight leading-tight text-black line-clamp-2">
        {product.name}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, i) => (
          <span
            key={tag}
            className={`px-2 py-0.5 leading-none text-xs font-medium text-center   border border-black/60 rounded-full text-black/80  ${i === 0 ? "bg-gold/60" : "bg-white"}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price */}
      <p className="font-bold text-lg text-black">
        <span className="sr-only">Price: </span>
        {product.price}
      </p>

      {/* Button */}
      <button
        onClick={handleAddToCart}
        aria-label={
          added
            ? `${product.name} added to cart`
            : `Add ${product.name} to cart, ${product.price}`
        }
        className={`w-full py-3.5 rounded-full border-2 border-gold  bg-gold/40 font-bold  tracking-tight text-sm  hover:border-navy hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
         `}
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>

      {/* Live region for screen reader announcement */}
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
};

const Latest = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const SCROLL_AMOUNT = 320;

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section
      className="mt-32 max-lg:mt-24 max-md:mt-12"
      aria-labelledby="latest-drops-heading"
    >
      {/* Header row */}
      <h2
        id="latest-drops-heading"
        className=" font-serif text-[clamp(2rem,3.33vw,3rem)]  leading-none"
      >
        Shop Our Latest drops
      </h2>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="mt-2  text-[16px] max-md:text-sm text-black/80 tracking-tight">
            From classic whole dates to gourmet stuffed varieties – find your
            perfect date match.
          </p>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2 shrink-0 ml-8 max-md:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll to previous products"
            className={`w-11 h-11 rounded-full border border-black/50 flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
              ${
                canScrollLeft
                  ? "bg-navy text-white   active:shadow-none "
                  : "bg-white text-zinc-300 border-gold border cursor-not-allowed"
              }`}
          >
            <ChevronLeft
              className="w-5 h-5"
              strokeWidth={2.5}
              color="#ccba78"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll to next products"
            className={`w-11 h-11 rounded-full border- border-black/50 flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
              ${
                canScrollRight
                  ? "bg-navy text-white  active:shadow-none "
                  : "bg-white text-zinc-300 border-gold border cursor-not-allowed"
              }`}
          >
            <ChevronRight
              className="w-5 h-5"
              strokeWidth={2.5}
              color="#ccba78"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="region"
        aria-label="Product carousel"
        tabIndex={0}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Latest;