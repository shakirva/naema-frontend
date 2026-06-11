"use client";

import { useState } from "react";
import { IoMdStar, IoMdCheckmarkCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FiSliders } from "react-icons/fi";

type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  itemType: string;
  image?: string;
  verified: boolean;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Priya M.",
    date: "12/2/2025",
    rating: 5,
    comment:
      "These are absolutely delicious! Perfectly packaged and my new favourite date variety. Will order again.",
    itemType: "500g",
    image: "/n1.webp",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul S.",
    date: "7/28/2025",
    rating: 5,
    comment:
      "Good sweetness and flavour. Sometimes warming them for 10 seconds helps soften them up a little.",
    itemType: "1kg",
    image: "/n2.webp",
    verified: true,
  },
  {
    id: 3,
    name: "Aisha K.",
    date: "3/15/2025",
    rating: 4,
    comment:
      "Really fresh and well packed. The gold packaging is beautiful — great as a gift too.",
    itemType: "250g",
    image: undefined,
    verified: true,
  },
  {
    id: 4,
    name: "Mohammed R.",
    date: "1/10/2025",
    rating: 3,
    comment:
      "Taste is good but a couple of dates were slightly dry. Overall still worth it for the price.",
    itemType: "500g",
    image: undefined,
    verified: false,
  },
  {
    id: 5,
    name: "Sneha T.",
    date: "11/5/2024",
    rating: 5,
    comment:
      "Naema never disappoints. Ordered for Eid and everyone loved them. Premium quality.",
    itemType: "2kg",
    image: "/n3.webp",
    verified: true,
  },
];

const ratingBreakdown = [
  { stars: 5, count: 41 },
  { stars: 4, count: 7 },
  { stars: 3, count: 8 },
  { stars: 2, count: 0 },
  { stars: 1, count: 1 },
];

const totalReviews = ratingBreakdown.reduce((sum, r) => sum + r.count, 0);

const avgRating = (
  ratingBreakdown.reduce((sum, r) => sum + r.stars * r.count, 0) / totalReviews
).toFixed(1);

/* ─── Stars ─── */
const Stars = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <IoMdStar
        key={i}
        size={size}
        color={i < rating ? "#ccba78" : "#e0ddd4"}
      />
    ))}
  </div>
);

/* ─── Review Card ─── */
const ReviewCard = ({ review }: { review: Review }) => (
  <div
    className="
      group rounded-2xl px-6 py-5 border transition-all duration-200
      bg-[#faf7ed] border-gold/40 hover:border-gold
    "
  >
    <div className="flex flex-col gap-4">
      {/* Top section */}
      <div className="flex justify-between items-start gap-4">
        {/* Left */}
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-sm tracking-tight">
            {review.name}
          </span>

          {review.verified && (
            <span className="flex items-center gap-1 text-[10px] text-black/40 mt-0.5">
              <IoMdCheckmarkCircle size={11} className="text-gold" />
              Verified Buyer
            </span>
          )}
        </div>

        {/* Date */}
        <span className="text-[11px] text-black/30 shrink-0">
          {review.date}
        </span>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex gap-5 items-start">
        {/* Content */}
        <div className="flex-1 flex flex-col gap-3">
          <Stars rating={review.rating} size={13} />

          <p className="text-sm text-black/65 leading-relaxed">
            {review.comment}
          </p>

          <div className="mt-1">
            <span className="text-[11px] uppercase tracking-widest text-black/30 font-medium">
              Item type:{" "}
            </span>
            <span className="text-[11px] text-black/50 font-semibold">
              {review.itemType}
            </span>
          </div>
        </div>

        {/* Image */}
        {review.image && (
          <div
            className="w-20 h-20 rounded-xl shrink-0 border border-black/8 bg-black/5"
            style={{
              backgroundImage: `url(${review.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </div>

      {/* Mobile + Tablet */}
      <div className="flex md:hidden flex-col gap-4">
        <Stars rating={review.rating} size={13} />

        <p className="text-sm text-black/65 leading-relaxed">
          {review.comment}
        </p>

        <div>
          <span className="text-[11px] uppercase tracking-widest text-black/30 font-medium">
            Item type:{" "}
          </span>
          <span className="text-[11px] text-black/50 font-semibold">
            {review.itemType}
          </span>
        </div>

        {/* Image bottom */}
        {review.image && (
          <div
            className="w-[50%] max-sm:w-full h-48 rounded-xl border border-black/8 bg-black/5"
            style={{
              backgroundImage: `url(${review.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </div>
    </div>
  </div>
);

/* ─── Write Review Form ─── */
const WriteReview = ({ onClose }: { onClose: () => void }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="border-2 border-gold/40 rounded-2xl p-6 flex flex-col gap-5 bg-[#faf7ed] lg:w-[60%] mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="font-serif tracking-tight text-xl">Write a Review</h3>

        <button
          onClick={onClose}
          className="text-black/30 hover:text-black transition"
        >
          <FaPlus size={13} className="rotate-45" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-widest text-black/40 font-medium">
          Your Rating
        </span>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(i + 1)}
            >
              <IoMdStar
                size={30}
                color={i < (hovered || selected) ? "#ccba78" : "#e0ddd4"}
                className="transition-colors cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-widest text-black/40 font-medium">
          Your Review
        </span>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience with this product..."
          className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-gold/70 transition bg-white placeholder:text-black/25"
        />
      </div>

      <button
        disabled={!selected || !comment.trim()}
        className="py-3 rounded-full border-2 border-gold bg-gold/30 text-sm font-semibold tracking-wide hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
      >
        Submit Review
      </button>
    </div>
  );
};

/* ─── Main ─── */
const CustomerReviews = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<number | null>(null);

  const filtered = filter
    ? reviews.filter((r) => r.rating === filter)
    : reviews;

  return (
    <div className="max-w-[1440px] mx-auto mt-20 px-16 max-lg:px-8 max-md:px-5 border border-navy/20 py-12 rounded-2xl bg-white">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-serif text-[clamp(2rem,3.33vw,3rem)] leading-none">
          Customer Reviews
        </h2>

        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-6 py-2.5 rounded-full border-2 border-gold text-sm font-semibold tracking-wide hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-pointer hidden md:block"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Summary */}
      <div className="flex gap-14 lg:justify-center items-center max-md:flex-col max-md:gap-8 mb-10 bg-[#faf7ed] border border-gold/30 rounded-2xl px-8 py-7">
        {/* Score */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <IoMdStar size={44} color="#ccba78" />

          <span className="text-6xl font-bold tracking-tight leading-none">
            {avgRating}
          </span>

          <Stars rating={Math.round(parseFloat(avgRating))} size={16} />

          <span className="text-xs text-black/40 mt-1">
            {totalReviews} Reviews
          </span>
        </div>

        {/* Bars */}
        <div className="flex flex-col gap-2.5 w-full lg:w-[480px]">
          {ratingBreakdown.map((row) => {
            const pct = Math.round((row.count / totalReviews) * 100);
            const isActive = filter === row.stars;

            return (
              <button
                key={row.stars}
                onClick={() =>
                  setFilter(filter === row.stars ? null : row.stars)
                }
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Stars rating={row.stars} size={12} />

                <div className="flex-1 h-1.5 rounded-full bg-black/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isActive ? "bg-navy" : "bg-gold"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <span className="text-xs text-black/35 w-8 text-right">
                  ({row.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-3 md:hidden w-full">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="flex-1 py-2.5 rounded-full border-2 border-gold text-sm font-semibold"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>

          <button
            aria-label="Filter reviews"
            className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center"
          >
            <FiSliders size={15} />
          </button>
        </div>
      </div>

      {/* Active filter */}
      {filter && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-black/45">
            Showing {filter}-star reviews
          </span>

          <button
            onClick={() => setFilter(null)}
            className="text-xs px-3 py-1 rounded-full bg-black/8 hover:bg-black/15 transition"
          >
            Clear
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-8">
          <WriteReview onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filtered.length > 0 ? (
          filtered.map((r) => <ReviewCard key={r.id} review={r} />)
        ) : (
          <p className="text-sm text-black/35 py-12 text-center">
            No reviews for this rating yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;
