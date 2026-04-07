"use client";

import { Products } from "@/types/Products";
import { searchProducts } from "../../services/products.service";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import Cards from "../_components/Shared/Cards";
import {
  FiGrid,
  FiList,
  FiFilter,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiHome,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type SortOption = "-price" | "price" | "-ratingsAverage" | "-sold" | "";

const CATEGORIES = [
  { id: "6439d61c0049ad0b52b90051", name: "Music" },
  { id: "6439d5b90049ad0b52b90048", name: "Men's Fashion" },
  { id: "6439d58a0049ad0b52b9003f", name: "Women's Fashion" },
  { id: "6439d41c67d9aa4ca97064d5", name: "SuperMarket" },
  { id: "6439d40367d9aa4ca97064cc", name: "Baby & Toys" },
  { id: "6439d3e067d9aa4ca97064c3", name: "Home" },
  { id: "6439d3c867d9aa4ca97064ba", name: "Books" },
  { id: "6439d30b67d9aa4ca97064b1", name: "Beauty & Health" },
  { id: "6439d2d167d9aa4ca970649f", name: "Electronics" },
  { id: "6439d2f467d9aa4ca97064a8", name: "Mobiles" },
];

const BRANDS = [
  { id: "64089fe824b25627a25315d1", name: "Canon" },
  { id: "64089faf24b25627a25315cd", name: "Dell" },
  { id: "64089f8b24b25627a25315ca", name: "Lenovo" },
  { id: "64089f5824b25627a25315c7", name: "Sony" },
  { id: "64089f1c24b25627a25315c3", name: "Infinix" },
  { id: "64089ef124b25627a25315c0", name: "Realme" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Relevance", value: "" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Price: Low to High", value: "price" },
  { label: "Top Rated", value: "-ratingsAverage" },
  { label: "Best Selling", value: "-sold" },
];

function SkeletonCard() {
  return (
    <div className="rounded-[8px] border border-[#E5E7EB] overflow-hidden animate-pulse bg-white">
      <div className="w-full h-60 bg-gray-100" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-6 bg-gray-100 rounded w-1/3 mt-1" />
      </div>
    </div>
  );
}

function EmptyState({ keyword }: { keyword: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-4 text-center col-span-full"
    >
      <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
        <FiSearch className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-600">No Products Found</h3>
      <p className="text-gray-400 text-sm max-w-xs">
        {keyword
          ? `No results for "${keyword}". Try different keywords or filters.`
          : "Start typing to search for products."}
      </p>
    </motion.div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-1">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full py-3"
      >
        <span className="font-semibold text-sm text-gray-700">{title}</span>
        {open ? (
          <FiChevronUp className="text-gray-400" size={15} />
        ) : (
          <FiChevronDown className="text-gray-400" size={15} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  const [inputValue, setInputValue] = useState(keyword);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortOption>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      router.push(`?keyword=${encodeURIComponent(val)}`);
    }, 400);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params: Record<string, string | string[]> = {};
    if (sort) params["sort"] = sort;
    if (selectedCategories.length) params["category[in]"] = selectedCategories;
    if (selectedBrands.length) params["brand"] = selectedBrands;
    if (priceMin) params["price[gte]"] = priceMin;
    if (priceMax) params["price[lte]"] = priceMax;

    try {
      const data = await searchProducts(keyword, params);
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [keyword, sort, selectedCategories, selectedBrands, priceMin, priceMax]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  const toggleBrand = (id: string) =>
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceMin("");
    setPriceMax("");
    setSort("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    !!priceMin ||
    !!priceMax ||
    selectedBrands.length > 0;

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const SidebarContent = (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-sm text-gray-800 flex items-center gap-2">
          <FiFilter className="text-[#28A745]" size={14} /> Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
          >
            <FiX size={11} /> Clear all
          </button>
        )}
      </div>

      <FilterSection title="Categories">
        <div className="flex flex-col gap-2.5 pr-1 pb-1">
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="accent-[#28A745] w-4 h-4 rounded shrink-0"
              />
              <span className="text-sm text-gray-500 group-hover:text-[#28A745] transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brands">
        <div className="flex flex-col gap-2.5 pr-1 pb-1">
          {BRANDS.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.id)}
                onChange={() => toggleBrand(brand.id)}
                className="accent-[#28A745] w-4 h-4 rounded shrink-0"
              />
              <span className="text-sm text-gray-500 group-hover:text-[#28A745] transition-colors">
                {brand.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex gap-2 items-center mb-3">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#28A745] transition-colors"
          />
          <span className="text-gray-300 text-lg">—</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#28A745] transition-colors"
          />
        </div>
        <button
          onClick={fetchProducts}
          className="w-full bg-[#28A745] hover:bg-[#218838] active:scale-95 text-white text-sm py-2 rounded-lg transition-all duration-150 font-medium"
        >
          Apply
        </button>
      </FilterSection>
    </aside>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-10 py-2 flex items-center gap-2 text-xs text-gray-400">
        <Link
          href="/"
          className="hover:text-[#28A745] transition-colors flex items-center gap-1"
        >
          <FiHome size={12} />
          Home
        </Link>
        <FiChevronRight size={12} />
        <span className="text-gray-600 font-medium">
          {keyword ? `Search: "${keyword}"` : "Search"}
        </span>
      </div>
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-3 flex items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus-within:border-[#28A745] focus-within:bg-white transition-all duration-200">
            <FiSearch className="text-gray-400 shrink-0" size={16} />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            {inputValue && (
              <button onClick={() => handleInputChange("")}>
                <FiX className="text-gray-400 hover:text-gray-600" size={14} />
              </button>
            )}
          </div>

          {/* Sort - desktop only */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-400">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#28A745] bg-white text-gray-700 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden shrink-0">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 transition-colors ${view === "grid" ? "bg-[#28A745] text-white" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <FiGrid size={15} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 transition-colors ${view === "list" ? "bg-[#28A745] text-white" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <FiList size={15} />
            </button>
          </div>

          {/* Mobile filter btn */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:border-[#28A745] hover:text-[#28A745] transition-colors shrink-0"
          >
            <FiFilter size={14} />
            {hasActiveFilters && (
              <span className="bg-[#28A745] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {selectedCategories.length + (priceMin || priceMax ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-10 pb-2.5 flex items-center gap-2 flex-wrap">
          {keyword && (
            <span className="text-xs text-gray-400">
              {loading
                ? "Searching..."
                : `${products.length} result${products.length !== 1 ? "s" : ""} for`}
              {!loading && (
                <span className="text-gray-600 font-medium ml-1">
                  &quot;{keyword}&quot;
                </span>
              )}
            </span>
          )}

          {selectedCategories.map((id) => {
            const cat = CATEGORIES.find((c) => c.id === id);
            return (
              <span
                key={id}
                className="flex items-center gap-1 bg-green-50 text-[#28A745] text-xs px-2.5 py-1 rounded-full border border-green-200"
              >
                {cat?.name}
                <button
                  onClick={() => toggleCategory(id)}
                  className="hover:text-green-800"
                >
                  <FiX size={10} />
                </button>
              </span>
            );
          })}

          {selectedBrands.map((id) => {
            const brand = BRANDS.find((b) => b.id === id);
            return (
              <span
                key={id}
                className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full border border-blue-200"
              >
                {brand?.name}
                <button
                  onClick={() => toggleBrand(id)}
                  className="hover:text-blue-800"
                >
                  <FiX size={10} />
                </button>
              </span>
            );
          })}

          {(priceMin || priceMax) && (
            <span className="flex items-center gap-1 bg-green-50 text-[#28A745] text-xs px-2.5 py-1 rounded-full border border-green-200">
              {priceMin || "0"} – {priceMax || "∞"} EGP
              <button
                onClick={() => {
                  setPriceMin("");
                  setPriceMax("");
                }}
                className="hover:text-green-800"
              >
                <FiX size={10} />
              </button>
            </span>
          )}

          {/* Mobile sort */}
          <div className="sm:hidden ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#28A745] bg-white text-gray-700 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="w-full flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 shrink-0 border-r border-gray-100 bg-white px-5 py-6 sticky top-[81px] h-[calc(100vh-81px)] overflow-y-auto">
          {SidebarContent}
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40 lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed top-0 left-0 h-full w-72 bg-white z-50 px-5 py-6 overflow-y-auto shadow-2xl lg:hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bold text-gray-800">Filters</span>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <FiX
                      size={20}
                      className="text-gray-400 hover:text-gray-700"
                    />
                  </button>
                </div>
                {SidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          {loading ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : products.length === 0 ? (
            <EmptyState keyword={keyword} />
          ) : (
            <motion.div
              layout
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              <Cards products={products} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
