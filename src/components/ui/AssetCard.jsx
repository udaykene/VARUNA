import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { Clock, ExternalLink, PlayCircle } from 'lucide-react';
import { CATEGORIES } from '../../data/navalAssets.js';

const STATUS_STYLES = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  decommissioned: 'bg-rose-50 text-rose-700 border-rose-200',
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
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(14,165,233,0.16)]"
    >
      <div className="relative h-44 overflow-hidden bg-sky-50">
        {asset.image ? (
          <img
            src={asset.image}
            alt={asset.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div
          className={`absolute inset-0 items-center justify-center ${asset.image ? 'hidden' : 'flex'}`}
          style={{ background: 'linear-gradient(135deg, #e0f7ff 0%, #ffffff 50%, #dff9f4 100%)' }}
        >
          <div className="space-y-2 text-center">
            <div className="text-5xl font-black tracking-wider text-sky-300">
              {asset.pennant || '-'}
            </div>
            <div className="px-6 text-xs uppercase tracking-widest text-slate-500">
              {asset.class}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/70 to-transparent" />

        <div className="absolute left-3 top-3">
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm ${STATUS_STYLES[asset.status] || STATUS_STYLES.active}`}>
            {asset.status === 'active' ? t.active : t.decommissionedStatus}
          </span>
        </div>

        {asset.youtubeId && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-red-600 shadow-sm" title="Video available">
            <PlayCircle className="h-4 w-4" />
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-white/85 px-2.5 py-1 font-mono text-[10px] tracking-widest text-slate-600 shadow-sm">{asset.pennant}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-4">
        <div>
          <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">
            {t.categoryLabels[asset.category] || fallbackCategoryLabels[asset.category] || asset.category}
          </div>
          <h3 className="text-base font-bold leading-tight text-slate-950 transition-colors duration-300 group-hover:text-sky-700">
            {asset.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium tracking-wide text-slate-500">{asset.class}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          <div>
            <span className="block text-[9px] uppercase tracking-widest text-slate-400">{t.project}</span>
            <span className="text-xs font-medium text-slate-700">{asset.project}</span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-widest text-slate-400">
              {isHistoric ? t.decommissioned : t.commissioned}
            </span>
            <span className={`flex items-center gap-1 text-xs font-medium ${isHistoric ? 'text-rose-700' : 'text-emerald-700'}`}>
              {isHistoric && <Clock className="h-2.5 w-2.5" />}
              {isHistoric ? asset.decommissioned || asset.commissioned : asset.commissioned}
            </span>
          </div>
          <div className="col-span-2">
            <span className="block text-[9px] uppercase tracking-widest text-slate-400">{t.fleet}</span>
            <span className="text-xs text-slate-600">{asset.fleet}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          {asset.specs?.speed && (
            <div className="flex-1 rounded-lg border border-sky-100 bg-sky-50 px-2 py-1.5 text-center">
              <div className="text-[9px] uppercase tracking-wider text-slate-400">{t.speedLabel}</div>
              <div className="truncate text-[11px] font-semibold text-sky-700">{asset.specs.speed.split(' ').slice(0, 2).join(' ')}</div>
            </div>
          )}
          {asset.specs?.crew && (
            <div className="flex-1 rounded-lg border border-teal-100 bg-teal-50 px-2 py-1.5 text-center">
              <div className="text-[9px] uppercase tracking-wider text-slate-400">{t.crewLabel}</div>
              <div className="truncate text-[11px] font-semibold text-teal-700">{asset.specs.crew.toString().split(' ')[0]}</div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-2">
          <Link
            to={`/asset/${asset.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-sky-200 bg-sky-500 px-4 py-2.5 text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-[0_10px_24px_rgba(14,165,233,0.24)] group/btn"
          >
            {t.viewDetails}
            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
