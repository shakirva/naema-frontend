import re

with open("app/[locale]/(main)/shop/components/FrequentlyBought.tsx", "r") as f:
    content = f.read()

# Conflict 1
c1_repl = """  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ limit: 10 });
        setRelated(res.products.filter(p => p.id !== currentId));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [currentId]);"""
content = re.sub(r'<<<<<<< HEAD\n  useEffect.*?  \}, \[currentId\]\);\n=======\n  const related = products\.filter\(\(p\) => p\.id !== currentId\);\n>>>>>>> riizzn/main', c1_repl, content, flags=re.DOTALL)

# Conflict 2
c2_repl = """      {/* Scrollable row + mobile overlay arrows */}
      <div className="relative">
        {/* Mobile left arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`md:hidden absolute left-2 top-[128px] -translate-y-1/2 z-10 w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer
            ${canScrollLeft ? "bg-navy border-navy" : "bg-white/80 border-gold cursor-not-allowed"}`}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
        </button>

        {/* Mobile right arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`md:hidden absolute right-2 top-[128px] -translate-y-1/2 z-10 w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer
            ${canScrollRight ? "bg-navy border-navy" : "bg-white/80 border-gold cursor-not-allowed"}`}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory max-md:px-[7vw]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {related.map((product) => {
            const category = product.categories?.[0]?.handle || "all";
            return (
              <div
                key={product.id}
                className="flex-none w-[310px] max-md:w-[85vw] snap-center"
              >
                <ProductCard product={product} category={category} />
              </div>
            );
          })}
        </div>"""
content = re.sub(r'<<<<<<< HEAD\n      \{/\* Scrollable Cards \*/\}.*?>>>>>>> riizzn/main', c2_repl, content, flags=re.DOTALL)

with open("app/[locale]/(main)/shop/components/FrequentlyBought.tsx", "w") as f:
    f.write(content)
