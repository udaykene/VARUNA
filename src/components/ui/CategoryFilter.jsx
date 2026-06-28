import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { CATEGORIES } from '../../data/navalAssets.js';
import { Search, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function CategoryFilter({ activeCategory, onCategoryChange, searchQuery, onSearchChange }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-xl border border-sky-100 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 transition-all duration-300 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = LucideIcons[cat.icon] || LucideIcons.Anchor;
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
                isActive
                  ? 'border-sky-300 bg-sky-500 text-white shadow-[0_10px_24px_rgba(14,165,233,0.22)]'
                  : 'border-sky-100 bg-white text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-700'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-xl bg-sky-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
