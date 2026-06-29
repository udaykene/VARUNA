import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { Clock, ExternalLink, PlayCircle, Gauge, Users, Anchor } from 'lucide-react';
import { CATEGORIES } from '../../data/navalAssets.js';

const STATUS_STYLES = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60 ring-1 ring-emerald-600/10',
  decommissioned: 'bg-rose-500/10 text-rose-600 border-rose-200/60 ring-1 ring-rose-600/10',
};

const fallbackCategoryLabels = Object.fromEntries(CATEGORIES.map(c => [c.id, c.label]));

export default function AssetCard({ asset, index = 0 }) {
  const { t } = useLanguage();

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 },
    },
  };

  const isHistoric = asset.status === 'decommissioned';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-sky-200 hover:shadow-[0_16px_40px_rgba(14,165,233,0.10),0_4px_12px_rgba(14,165,233,0.06)]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        {asset.image ? (
          <img
            src={asset.image}
            alt={asset.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
            onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div
          className={`absolute inset-0 items-center justify-center ${asset.image ? 'hidden' : 'flex'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(56,189,248,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(56,189,248,0.2) 0%, transparent 50%)' }} />
          <div className="relative space-y-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Anchor className="h-7 w-7 text-white/30" />
            </div>
            <div className="font-mono text-5xl font-black tracking-wider text-white/15">
              {asset.pennant || '-'}
            </div>
            <div className="px-6 text-[11px] uppercase tracking-[0.25em] text-white/35">
              {asset.class}
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent" />

        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm backdrop-blur-md ${STATUS_STYLES[asset.status] || STATUS_STYLES.active}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${asset.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {asset.status === 'active' ? t.active : t.decommissionedStatus}
          </span>
        </div>

        {/* Video badge */}
        {/* {asset.youtubeId && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
            <PlayCircle className="h-3.5 w-3.5 fill-white/20 text-red-400" />
            <span>Video</span>
          </div>
        )} */}

        {/* Pennant badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.15em] text-slate-800 shadow-sm backdrop-blur-sm ring-1 ring-white/50">
            {asset.pennant}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category + Title */}
        <div className="mb-3">
          <div className="mb-2 inline-flex items-center rounded-md bg-sky-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-sky-600 ring-1 ring-sky-200/50">
            {t.categoryLabels[asset.category] || fallbackCategoryLabels[asset.category] || asset.category}
          </div>
          <h3 className="text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
            {asset.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-slate-400">{asset.class}</p>
        </div>

        {/* Info grid */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">{t.project}</span>
            <span className="text-xs font-semibold text-slate-700">{asset.project}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">
              {isHistoric ? t.decommissioned : t.commissioned}
            </span>
            <span className={`flex items-center gap-1 text-xs font-semibold ${isHistoric ? 'text-rose-600' : 'text-emerald-600'}`}>
              {isHistoric && <Clock className="h-3 w-3" />}
              {isHistoric ? asset.decommissioned || asset.commissioned : asset.commissioned}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">{t.fleet}</span>
            <span className="text-xs font-medium text-slate-600">{asset.fleet}</span>
          </div>
        </div>

        {/* Specs badges */}
        <div className="mb-4 flex gap-2">
          {asset.specs?.speed && (
            <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 px-3 py-2 ring-1 ring-sky-200/50">
              <Gauge className="h-3.5 w-3.5 text-sky-500" />
              <div className="text-[11px] font-semibold text-sky-700">{asset.specs.speed.split(' ').slice(0, 2).join(' ')}</div>
            </div>
          )}
          {asset.specs?.crew && (
            <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 px-3 py-2 ring-1 ring-teal-200/50">
              <Users className="h-3.5 w-3.5 text-teal-500" />
              <div className="text-[11px] font-semibold text-teal-700">{asset.specs.crew.toString().split(' ')[0]}</div>
            </div>
          )}
          {asset.specs?.displacement && !asset.specs?.speed && !asset.specs?.crew && (
            <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 px-3 py-2 ring-1 ring-violet-200/50">
              <Anchor className="h-3.5 w-3.5 text-violet-500" />
              <div className="text-[11px] font-semibold text-violet-700">{asset.specs.displacement.split(' ').slice(0, 2).join(' ')}</div>
            </div>
          )}
        </div>

        {/* View details button */}
        <div className="mt-auto pt-1">
          <Link
            to={`/asset/${asset.id}`}
            className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-sky-700 hover:shadow-md"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
            <span className="relative">{t.viewDetails}</span>
            <ExternalLink className="relative h-3.5 w-3.5 transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
