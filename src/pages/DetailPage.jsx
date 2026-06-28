import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Anchor, Ship, Zap, Shield, Navigation,
  Calendar, MapPin, Wrench, Users, Clock, Image as ImageIcon,
} from 'lucide-react';
import { NAVAL_ASSETS, CATEGORIES } from '../data/navalAssets.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import AssetCard from '../components/ui/AssetCard.jsx';

// ── Spec Icon + Label maps ──
const SPEC_ICONS = {
  displacement: Anchor,
  length: Ship,
  beam: Ship,
  draft: Navigation,
  speed: Zap,
  range: Navigation,
  crew: Users,
  propulsion: Wrench,
  armament: Shield,
  aircraft: Navigation,
  sensors: Shield,
};

const SPEC_LABELS = {
  displacement: 'Displacement',
  length: 'Length',
  beam: 'Beam',
  draft: 'Draft',
  speed: 'Top Speed',
  range: 'Range',
  crew: 'Crew',
  propulsion: 'Propulsion',
  armament: 'Armament',
  aircraft: 'Aircraft',
  sensors: 'Sensors',
};

// ── Spec Row ────────────────────────────────────────────────
function SpecRow({ specKey, value }) {
  const { t } = useLanguage();
  const Icon = SPEC_ICONS[specKey] || Shield;
  const label = t[specKey] || specKey;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50">
        <Icon className="h-4 w-4 text-sky-600" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">{label}</div>
        <div className="mt-0.5 text-sm leading-relaxed text-slate-800">{value}</div>
      </div>
    </div>
  );
}

// ── Gallery builder ─────────────────────────────────────────
function buildGallery(asset) {
  const relatedImages = NAVAL_ASSETS
    .filter(a => a.id !== asset.id && a.category === asset.category && a.image)
    .slice(0, 5)
    .map(a => ({ src: a.image, label: a.name }));

  return [
    ...(asset.image ? [{ src: asset.image, label: asset.name }] : []),
    ...relatedImages,
  ].slice(0, 6);
}

// ── Info Row (sidebar) ──────────────────────────────────────
function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-500" />
      <div>
        <div className="text-[9px] uppercase tracking-widest text-slate-400">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-slate-800">{value}</div>
      </div>
    </div>
  );
}

// ── Detail Page ─────────────────────────────────────────────
export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const asset = NAVAL_ASSETS.find(a => a.id === id);

  if (!asset) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900">{t.assetNotFound}</h2>
          <Link to="/explore" className="text-sm font-medium text-sky-600 hover:underline">
            ← {t.returnToFleet}
          </Link>
        </div>
      </div>
    );
  }

  const isHistoric = asset.status === 'decommissioned';
  const categoryLabel = t.categoryLabels[asset.category] || CATEGORIES.find(c => c.id === asset.category)?.label || asset.category;
  const gallery = buildGallery(asset);
  const related = NAVAL_ASSETS
    .filter(a => a.id !== asset.id && (a.category === asset.category || a.class === asset.class))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-900 pt-16">
        {/* Background image */}
        {asset.image && (
          <div className="absolute inset-0">
            <img src={asset.image} alt={asset.name} className="h-full w-full object-cover object-center opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900" />
          </div>
        )}
        {!asset.image && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900" />
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToFleet}
          </button>

          {/* Badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
              isHistoric
                ? 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            }`}>
              {isHistoric ? `${t.decommissionedStatus} ${asset.decommissioned || ''}` : `● ${t.active}`}
            </span>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-sky-300">
              {categoryLabel}
            </span>
            {asset.project && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300">
                {asset.project}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
            {asset.name}
          </h1>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <Anchor className="h-3.5 w-3.5 text-sky-400" /> {asset.class}
            </span>
            {asset.homePort && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sky-400" /> {asset.homePort}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-sky-400" /> {t.commissioned}: {asset.commissioned}
            </span>
            {asset.pennant && asset.pennant !== 'N/A' && (
              <span className="font-mono font-bold text-sky-300">{asset.pennant}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* ── Left / Main column ── */}
          <div className="space-y-10 lg:col-span-2">

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-base leading-relaxed text-slate-700">{asset.description}</p>
            </motion.div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* Gallery */}
            {gallery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <ImageIcon className="h-5 w-5 text-sky-500" />
                  {t.imageGallery}
                </h2>
                <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:grid-cols-4">
                  {gallery.map((item, index) => (
                    <div
                      key={`${item.src}-${index}`}
                      className={`${index === 0 ? 'col-span-2 row-span-2' : ''} relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm`}
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 to-transparent p-3">
                        <div className="text-xs font-semibold text-white">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <hr className="border-slate-200" />

            {/* ── YouTube Video — full width, only if youtubeId exists ── */}
            {asset.youtubeId && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900">
                  {/* Red YouTube play icon */}
                  <svg className="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  {t.officialVideo}
                </h2>

                {/* Full-width 16:9 iframe embed */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${asset.youtubeId}?rel=0&modestbranding=1`}
                      title={`${asset.name} — ${t.officialVideo}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {asset.youtubeId && <hr className="border-slate-200" />}

            {/* Technical Specs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Shield className="h-5 w-5 text-sky-500" />
                {t.technicalSpecs}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(asset.specs || {}).map(([key, val]) => (
                  <SpecRow key={key} specKey={key} value={val} />
                ))}
              </div>
            </motion.div>

            <hr className="border-slate-200" />

            {/* Operational History */}
            {asset.operationalHistory?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <Clock className="h-5 w-5 text-sky-500" />
                  {t.operationalHistory}
                </h2>
                <div className="relative space-y-0">
                  {/* Timeline line */}
                  <div className="absolute bottom-3 left-[17px] top-3 w-px bg-gradient-to-b from-sky-300 via-sky-200 to-transparent" />
                  {asset.operationalHistory.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="group relative flex gap-5 pb-5 last:pb-0"
                    >
                      <div className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-sky-200 bg-white shadow-sm transition-colors group-hover:border-sky-400">
                        <div className="h-2 w-2 rounded-full bg-sky-500" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="mb-0.5 font-mono text-xs font-bold tracking-wider text-sky-600">{event.year}</div>
                        <div className="text-sm leading-relaxed text-slate-700">{event.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right / Sidebar ── */}
          <div className="space-y-5">

            {/* Platform info card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Coloured top band */}
              <div className="border-b border-slate-100 bg-sky-50 px-5 py-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">{categoryLabel}</div>
                <div className="mt-1 text-xl font-black text-slate-900">{asset.class}</div>
                <div className="mt-0.5 text-xs text-slate-500">{asset.project}</div>
              </div>

              <div className="px-5 py-4">
                <InfoRow icon={Anchor} label={t.class} value={asset.class} />
                <InfoRow icon={Shield} label={t.origin} value={asset.origin} />
                <InfoRow icon={Wrench} label={t.builder} value={asset.builder} />
                <InfoRow icon={Ship} label={t.fleet} value={asset.fleet} />
                <InfoRow icon={MapPin} label={t.homePort} value={asset.homePort} />
              </div>
            </motion.div>

            {/* Image placeholder — for user to add their own photo */}
            {!asset.image && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center"
              >
                <ImageIcon className="mb-2 h-8 w-8 text-slate-300" />
                <p className="text-xs font-semibold text-slate-400">Image placeholder</p>
                <p className="mt-1 text-[11px] text-slate-400">Add <code className="text-xs">image: '/path.jpg'</code> in navalAssets.js</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Related Assets ── */}
        {related.length > 0 && (
          <div className="mt-20">
            <hr className="mb-10 border-slate-200" />
            <h2 className="mb-6 text-xl font-bold text-slate-900">{t.relatedAssets}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((a, i) => (
                <AssetCard key={a.id} asset={a} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
