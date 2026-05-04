"use client";

import { useState } from "react";
import { IoMdStar, IoMdStarOutline, IoMdCheckmarkCircle } from "react-icons/io";
import { FiSliders } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

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
    comment: "These are absolutely delicious! Perfectly packaged and my new favourite date variety. Will order again.",
    itemType: "500g",
    image: "/n1.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul S.",
    date: "7/28/2025",
    rating: 5,
    comment: "Good sweetness and flavour. Sometimes warming them for 10 seconds helps soften them up a little.",
    itemType: "1kg",
    image: "/n2.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Aisha K.",
    date: "3/15/2025",
    rating: 4,
    comment: "Really fresh and well packed. The gold packaging is beautiful — great as a gift too.",
    itemType: "250g",
    image: undefined,
    verified: true,
  },
  {
    id: 4,
    name: "Mohammed R.",
    date: "1/10/2025",
    rating: 3,
    comment: "Taste is good but a couple of dates were slightly dry. Overall still worth it for the price.",
    itemType: "500g",
    image: undefined,
    verified: false,
  },
  {
    id: 5,
    name: "Sneha T.",
    date: "11/5/2024",
    rating: 5,
    comment: "Naema never disappoints. Ordered for Eid and everyone loved them. Premium quality.",
    itemType: "2kg",
    image: "/n3.jpg",
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

/* ------------------ STAR ROW ------------------ */

const Stars = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <IoMdStar
        key={i}
        size={size}
        color={i < rating ? "#ccba78" : "#e5e5e5"}
      />
    ))}
  </div>
);

/* ------------------ REVIEW CARD ------------------ */

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="border border-black/10 rounded-2xl p-6 flex gap-6 items-start">
    <div className="flex-1 flex flex-col gap-2">
      {/* Name + verified */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">{review.name}</span>
        {review.verified && (
          <IoMdCheckmarkCircle size={16} className="text-gold" />
        )}
      </div>

      {/* Date */}
      <span className="text-xs text-black/40">{review.date}</span>

      {/* Stars */}
      <Stars rating={review.rating} size={14} />

      {/* Comment */}
      <p className="text-sm text-black/70 leading-relaxed mt-1">
        {review.comment}
      </p>

      {/* Item type */}
      <div className="mt-2">
        <span className="text-xs text-black/40">Item type: </span>
        <span className="text-xs text-black/60 font-medium">{review.itemType}</span>
      </div>
    </div>

    {/* Photo */}
    {review.image && (
      <div
        className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-black/10 bg-black/5"
        style={{
          backgroundImage: `url(${review.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    )}
  </div>
);

/* ------------------ WRITE REVIEW FORM ------------------ */

const WriteReview = ({ onClose }: { onClose: () => void }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="border-2 border-gold/40 w-[60%] mx-auto rounded-2xl p-6 flex flex-col  gap-5 bg-gold/5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl">Write a Review</h3>
        <button
          onClick={onClose}
          className="text-black/40 hover:text-black transition"
        >
          <FaPlus size={14} className="rotate-45" />
        </button>
      </div>

      {/* Star picker */}
      <div className="flex flex-col gap-1 ">
        <span className="text-xs text-black/50 font-medium">Your Rating</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(i + 1)}
            >
              <IoMdStar
                size={28}
                color={i < (hovered || selected) ? "#ccba78" : "#e5e5e5"}
                className="transition-colors cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-black/50 font-medium">Your Review</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience with this product..."
          className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-gold transition bg-white placeholder:text-black/30"
        />
      </div>

      {/* Submit */}
      <button
        disabled={!selected || !comment.trim()}
        className="py-3 rounded-full border-2 border-gold bg-gold/40 text-sm font-medium hover:bg-navy hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Submit Review
      </button>
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */

const CustomerReviews = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<number | null>(null);

  const filtered = filter
    ? reviews.filter((r) => r.rating === filter)
    : reviews;

  return (
    <div className="max-w-[1440px] mx-auto mt-20 px-16 max-lg:px-8 max-md:px-5 border border-gold py-10 rounded-xl">

      {/* Section Header */}
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-serif text-[clamp(2rem,3.33vw,3rem)] leading-none">
          Customer Reviews
        </h2>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-6 py-2.5 rounded-full border-2 border-gold bg-gold/20 text-sm font-medium hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer hidden md:block"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Summary + Breakdown */}
      <div className="flex gap-16 lg:justify-center items-start max-md:flex-col max-md:gap-8 mb-10">

        {/* Left — big number */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <IoMdStar size={48} color="#ccba78" />
          <span className="text-5xl font-semibold tracking-tight">{avgRating}</span>
          <span className="text-sm text-black/50">{totalReviews} Reviews</span>
        </div>

        {/* Right — bars */}
        <div className="flex flex-col gap-2.5 w-[500px]">
          {ratingBreakdown.map((row) => {
            const pct = Math.round((row.count / totalReviews) * 100);
            return (
              <button
                key={row.stars}
                onClick={() => setFilter(filter === row.stars ? null : row.stars)}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Stars rating={row.stars} size={13} />
                <div className="flex-1 h-2 rounded-full bg-black/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-black/40 w-8 text-right">
                  ({row.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter + Write on mobile */}
        <div className="flex items-center gap-3 md:hidden w-full">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="flex-1 py-2.5 rounded-full border-2 border-gold bg-gold/20 text-sm font-medium"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
          <button className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center">
            <FiSliders size={16} />
          </button>
        </div>
      </div>

      {/* Active filter badge */}
      {filter && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-black/50">Showing {filter}-star reviews</span>
          <button
            onClick={() => setFilter(null)}
            className="text-xs px-3 py-1 rounded-full bg-black/10 hover:bg-black/20 transition"
          >
            Clear
          </button>
        </div>
      )}

      {/* Write Review Form */}
      {showForm && (
        <div className="mb-8">
          <WriteReview onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Review Cards */}
      <div className="flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((r) => <ReviewCard key={r.id} review={r} />)
        ) : (
          <p className="text-sm text-black/40 py-10 text-center">
            No reviews for this rating yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;