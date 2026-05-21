"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdHeart } from "react-icons/io";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { formatPrice } from "@/lib/types";
import { getProductById } from "@/lib/api";
import { useState } from "react";
import Footer from "@/app/sections/Footer";

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState<string | null>(null);

  const handleAddToCart = async (item: typeof items[0]) => {
    setAdding(item.id);
    try {
      // Fetch the full product to get variant ID
      const product = await getProductById(item.id);
      if (product?.variants?.[0]?.id) {
        await addToCart(product.variants[0].id, 1);
      }
    } finally {
      setAdding(null);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-cream px-16 py-16 max-lg:px-8 max-md:px-5">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-12">
            <IoMdHeart size={28} className="text-red-400" />
            <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-none">
              Wishlist
            </h1>
            {items.length > 0 && (
              <span className="text-sm text-black/40 mt-2">
                · {items.length} item{items.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-black/30">
              <IoMdHeart size={56} className="text-red-200" />
              <p className="font-serif text-2xl text-black/40">Your wishlist is empty</p>
              <p className="text-sm text-black/30">Save your favourite products here</p>
              <Link
                href="/shop"
                className="mt-4 px-8 py-3 rounded-full bg-navy text-white text-sm font-medium hover:opacity-90 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 group relative">
                  <Link href={`/shop/${item.categoryHandle || "all"}/${item.handle}`}>
                    <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-black/5">
                      <Image
                        src={item.thumbnail || "/n1.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromWishlist(item.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-red-50 transition z-10"
                      >
                        <FiTrash2 size={13} className="text-red-400" />
                      </button>
                    </div>
                  </Link>

                  <h3 className="text-[15px] font-medium leading-tight">{item.title}</h3>
                  <p className="font-semibold text-[15px]">{formatPrice(item.price)}</p>

                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={adding === item.id}
                    className="mt-auto py-3 rounded-full border-2 flex items-center justify-center gap-2 text-sm font-medium bg-navy text-white hover:border-gold hover:bg-gold/40 hover:text-black transition-all duration-200 disabled:opacity-50"
                  >
                    <FiShoppingCart size={14} />
                    {adding === item.id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WishlistPage;
