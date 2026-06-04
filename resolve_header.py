import re

with open("app/[locale]/sections/Header.tsx", "r") as f:
    content = f.read()

# Conflict 1
content = re.sub(r'<<<<<<< HEAD\nimport { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";\n=======\nimport { FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";\n>>>>>>> riizzn/main\n', 'import { FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";\n', content)

# Conflict 2
c2_repl = """/* ------------------ MEGA MENU (desktop) ------------------ */

const MegaMenu = ({ categories }: { categories: any[] }) => (
  <div className="bg-cream border-t border-gold/30 shadow-xl w-full flex">
    <div className="flex flex-col pl-16 py-10 gap-8 flex-1">
      <div className="flex gap-16">
        {categories.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3 min-w-[120px]">
            <span className="text-[10px] font-bold text-black/40 uppercase">{col.heading}</span>
            <div className="flex flex-col gap-2.5">
              {col.links.map((item: any) => ("""
content = re.sub(r'<<<<<<< HEAD\nconst MegaMenu.*?\{col.links.map\(\(item: any\) => \(\n=======\n.*?\{col.links.map\(\(item\) => \(\n>>>>>>> riizzn/main\n', c2_repl, content, flags=re.DOTALL)

# Conflict 3
c3_repl = """    <div className="flex gap-3 pr-16 pl-8 py-10 shrink-0 border-l border-gold/20">
      {megaMenu.featured.map((f) => (
        <Link key={f.label} href={f.href} className="relative w-[160px] h-[200px] rounded-2xl overflow-hidden group">
          <Image src={f.image} alt={f.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-navy/40" />
          <span className="absolute bottom-4 left-4 right-4 font-serif text-[18px] font-medium text-white leading-tight">"""
content = re.sub(r'<<<<<<< HEAD\n\n    <div className="flex gap-3 px-8 py-8.*?<span className="absolute bottom-3.*?">\n=======\n.*?<span className="absolute bottom-4.*?">\n>>>>>>> riizzn/main\n', c3_repl, content, flags=re.DOTALL)

# Conflict 4
c4_repl = """  const { push } = useRouter();

  const triggerSearch = () => {
    if (query.trim()) {
      push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };
"""
content = re.sub(r'<<<<<<< HEAD\n  const \{ push \}.*?  \};\n\n=======\n>>>>>>> riizzn/main\n', c4_repl, content, flags=re.DOTALL)

# Conflict 5
c5_repl = """          <button
            onClick={triggerSearch}
            className="text-gold hover:text-darkgold transition-colors p-1"
            title="Search"
          >
            <FiSearch size={22} className="shrink-0" />
          </button>
"""
content = re.sub(r'<<<<<<< HEAD\n          <button\n            onClick=\{triggerSearch\}.*?          </button>\n\n=======\n          <FiSearch size=\{22\} className="text-gold shrink-0" />\n>>>>>>> riizzn/main\n', c5_repl, content, flags=re.DOTALL)

# Conflict 6
c6_repl = """            onKeyDown={handleSearch}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-navy placeholder-navy/40 text-[18px] tracking-tight outline-none"
          />

          <button
            onClick={triggerSearch}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-gold text-navy hover:bg-darkgold hover:text-cream transition-all duration-300"
          >
            Search
          </button>

          <button onClick={onClose} className="text-navy/60 hover:text-navy transition-colors p-1 ml-2">
            <FiX size={20} />"""
content = re.sub(r'<<<<<<< HEAD\n            onKeyDown=\{handleSearch\}.*?✕\n=======\n            placeholder="Search products\.\.\.".*?<FiX size=\{20\} />\n>>>>>>> riizzn/main\n', c6_repl, content, flags=re.DOTALL)

# Conflict 7
c7_repl = """  const [categories, setCategories] = useState<{ heading: string; links: { label: string; href: string }[] }[]>(megaMenu.columns);"""
content = re.sub(r'<<<<<<< HEAD\n  const \[categories, setCategories\].*?\n=======\n>>>>>>> riizzn/main\n', c7_repl, content, flags=re.DOTALL)

# Conflict 8
c8_repl = """            {/* Desktop only: language */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href={pathname} locale="en" className={`text-[12px] tracking-tight transition-colors duration-300 ${locale === "en" ? "text-gold" : "text-cream/50 hover:text-cream"}`}>EN</Link>
              <span className="text-cream/20">/</span>
              <Link href={pathname} locale="ar" className={`text-[12px] tracking-tight transition-colors duration-300 ${locale === "ar" ? "text-gold" : "text-cream/50 hover:text-cream"}`}>AR</Link>
            </div>

            {/* Desktop only: login */}
            <Link href="/account" className="hidden lg:block">
              <FiUser size={20} className="text-cream/70 hover:text-gold transition-colors" />"""
content = re.sub(r'<<<<<<< HEAD\n            <Link href="/account">\n              <FiUser\n                size=\{22\}\n                className="text-cream hover:text-gold transition-colors"\n              />\n=======\n            \{/\* Desktop only: language \*/\}.*?<Link href="/login" className="hidden lg:block">\n              <FiUser size=\{20\} className="text-cream/70 hover:text-gold transition-colors" />\n>>>>>>> riizzn/main\n', c8_repl, content, flags=re.DOTALL)

# Conflict 9
c9_repl = """          {categories.map((col) => (
            <Link
              key={col.heading}
              href={`/shop/${col.heading.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-navy hover:text-gold transition-colors"
            >
              {col.heading}
            </Link>
          ))}"""
content = re.sub(r'<<<<<<< HEAD\n          \{categories\.map.*?\n=======\n          \{/\* Main nav links — staggered animation \*/\}.*?>>>>>>> riizzn/main\n', """          {/* Main nav links — staggered animation */}
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${index * 55 + 80}ms` : "0ms",
                }}
                className={`group flex items-center justify-between py-4 text-navy text-[20px] sm:text-[22px] font-medium tracking-tight
                  transition-all duration-400
                  ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  hover:text-gold`}
              >
                <span>{link.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gold text-[13px]">→</span>
              </Link>
            ))}
          </nav>

          {/* Shop categories */}
          <div
            style={{ transitionDelay: menuOpen ? `${navLinks.length * 55 + 100}ms` : "0ms" }}
            className={`mt-6 transition-all duration-400 ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/35 font-bold block mb-4">
              Shop by Category
            </span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((col) => (
                <Link
                  key={col.heading}
                  href={`/shop/${col.heading.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-navy/5 hover:bg-navy/10 text-[13px] font-medium text-navy hover:text-gold transition-all duration-200"
                >
                  {col.heading}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer footer — language + socials */}
        <div
          style={{ transitionDelay: menuOpen ? "380ms" : "0ms" }}
          className={`px-7 py-6 transition-all duration-400 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-black/30 uppercase tracking-widest">Language</span>
            <div className="flex items-center gap-2 ml-1">
              <Link
                href={pathname}
                locale="en"
                onClick={() => setMenuOpen(false)}
                className={`text-[13px] font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${locale === "en" ? "bg-gold text-navy" : "text-navy/50 hover:text-navy"}`}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="ar"
                onClick={() => setMenuOpen(false)}
                className={`text-[13px] font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${locale === "ar" ? "bg-gold text-navy" : "text-navy/50 hover:text-navy"}`}
              >
                عربي
              </Link>
            </div>
          </div>""", content, flags=re.DOTALL)


with open("app/[locale]/sections/Header.tsx", "w") as f:
    f.write(content)
