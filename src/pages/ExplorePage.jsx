import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Search,
  ChevronDown,
  X,
  SlidersHorizontal,
  ArrowLeft, // Import ArrowLeft icon
} from "lucide-react";
import AssetCard from "../components/ui/AssetCard.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { NAVAL_ASSETS, CATEGORIES } from "../data/navalAssets.js";
// header image served from /public (referenced by absolute path)

// ── Category Dropdown ────────────────────────────────────────
function CategoryDropdown({ activeCategory, onCategoryChange }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const activeLabel =
    t.categoryLabels[activeCategory] ||
    CATEGORIES.find((c) => c.id === activeCategory)?.label ||
    t.categoryLabels.all;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
      >
        <SlidersHorizontal className="h-4 w-4 text-sky-500" />
        <span>{activeLabel}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
          >
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? NAVAL_ASSETS.length
                  : cat.id === "historic"
                    ? NAVAL_ASSETS.filter((a) => a.status === "decommissioned").length
                    : NAVAL_ASSETS.filter((a) => a.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onCategoryChange(cat.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sky-50 ${
                    activeCategory === cat.id
                      ? "bg-sky-50 font-semibold text-sky-700"
                      : "text-slate-700"
                  }`}
                >
                  <span>{t.categoryLabels[cat.id] || cat.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      activeCategory === cat.id
                        ? "bg-sky-100 text-sky-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Explore Page ─────────────────────────────────────────────
export default function ExplorePage() {
  const { t } = useLanguage();
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("cat") || "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setActiveCategory(cat);
    else setActiveCategory("all");
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === "all") setSearchParams({});
    else setSearchParams({ cat });
  };

  const filteredAssets = useMemo(() => {
    return NAVAL_ASSETS.filter((asset) => {
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "historic" && asset.status === "decommissioned") ||
        (activeCategory !== "historic" && asset.category === activeCategory);
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        [
          asset.name,
          asset.class,
          asset.project,
          asset.fleet,
          asset.builder,
          asset.pennant,
          asset.homePort,
        ].some((v) => v?.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page Header ── */}
      <div className="relative border-b border-slate-200 pt-20">
        <img
          src="/Explore.png"
          alt="Explore Image"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
        <div className="absolute inset-0 z-10 bg-black/25" />
        <div className="relative z-20 mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {/* Back to Fleet Button */}
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToFleet}
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-3">
            <Shield className="h-3.5 w-3.5" />
            {t.orderOfBattle}
          </div>
          <h1 className="text-4xl font-black text-slate-950 sm:text-5xl">
            {t.exploreTitle}
          </h1>

          <p className="mt-2 max-w-xl text-sm text-slate-500">
            {t.exploreSubtitle}
          </p>
        </div>
      </div>

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: dropdown filter */}
            <CategoryDropdown
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Right: search */}
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Count + search label */}
        {/* <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            <span className="font-bold text-sky-700">
              {filteredAssets.length}
            </span>{" "}
            {filteredAssets.length === 1
              ? t.assetCountSingular
              : t.assetCountPlural}
            {activeCategory !== "all" && (
              <>
                {" "}
                —{" "}
                <span className="font-medium text-slate-700">
                  {t.categoryLabels[activeCategory] ||
                    CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </span>
              </>
            )}
          </span>
          {searchQuery && (
            <span className="text-xs text-slate-400">
              {t.resultsFor}:{" "}
              <span className="font-medium text-slate-700">
                "{searchQuery}"
              </span>
            </span>
          )}
        </div> */}

        <AnimatePresence mode="wait">
          {filteredAssets.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredAssets.map((asset, i) => (
                <AssetCard key={asset.id} asset={asset} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <Search className="mb-4 h-10 w-10 text-slate-300" />
              <p className="text-base font-semibold text-slate-500">
                {t.noResults}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {t.tryDifferentFilter}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("all");
                }}
                className="mt-4 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100"
              >
                {t.clearFilters}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
