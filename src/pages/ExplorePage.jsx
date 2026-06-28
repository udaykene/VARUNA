import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, SlidersHorizontal, Images, PlayCircle } from 'lucide-react';
import AssetCard from '../components/ui/AssetCard.jsx';
import CategoryFilter from '../components/ui/CategoryFilter.jsx';
import { GridPattern } from '../components/ui/Effects.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { NAVAL_ASSETS, CATEGORIES } from '../data/navalAssets.js';

export default function ExplorePage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') setSearchParams({});
    else setSearchParams({ cat });
  };

  const filteredAssets = useMemo(() => {
    return NAVAL_ASSETS.filter(asset => {
      const matchesCategory = activeCategory === 'all' || asset.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || [
        asset.name, asset.class, asset.project, asset.fleet,
        asset.builder, asset.pennant, asset.homePort,
      ].some(v => v?.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryLabel = CATEGORIES.find(c => c.id === activeCategory)?.label || 'All Assets';
  const categoryCounts = CATEGORIES.filter(c => c.id !== 'all').map(category => ({
    ...category,
    count: NAVAL_ASSETS.filter(asset => asset.category === category.id).length,
    image: NAVAL_ASSETS.find(asset => asset.category === category.id && asset.image)?.image,
  }));

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-sky-50 pb-12 pt-24">
        <GridPattern />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(125,211,252,0.28),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              <Shield className="h-3.5 w-3.5" />
              Indian Naval Order of Battle
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
              <div>
                <h1 className="mb-2 text-4xl font-black text-slate-950 sm:text-5xl">{t.exploreTitle}</h1>
                <p className="max-w-xl text-sm text-slate-600">{t.exploreSubtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
                  <Images className="mb-3 h-4 w-4 text-sky-600" />
                  <div className="text-2xl font-black text-slate-950">{NAVAL_ASSETS.filter(a => a.image).length}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">image references</div>
                </div>
                <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
                  <PlayCircle className="mb-3 h-4 w-4 text-red-600" />
                  <div className="text-2xl font-black text-slate-950">{NAVAL_ASSETS.filter(a => a.youtubeId).length}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">video cards</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categoryCounts.slice(0, 10).map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`relative h-24 overflow-hidden rounded-xl border text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  activeCategory === category.id ? 'border-sky-400 ring-4 ring-sky-100' : 'border-white'
                }`}
              >
                {category.image && <img src={category.image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="text-xs font-bold text-white">{category.label}</div>
                  <div className="text-[10px] uppercase tracking-wider text-sky-100">{category.count} assets</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-sky-100 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <motion.div layout className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 text-sky-600" />
            <span className="text-sm text-slate-500">
              <span className="font-bold text-sky-700">{filteredAssets.length}</span>
              {' '}assets - {categoryLabel}
            </span>
          </div>
          {searchQuery && (
            <span className="text-xs text-slate-400">
              Searching for: <span className="text-slate-700">"{searchQuery}"</span>
            </span>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredAssets.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredAssets.map((asset, i) => (
                <AssetCard key={asset.id} asset={asset} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
              <div className="mb-4 text-5xl text-sky-300">-</div>
              <p className="text-base text-slate-500">{t.noResults}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
