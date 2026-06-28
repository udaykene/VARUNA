import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Anchor, Ship, Zap, Shield, Navigation,
  Calendar, MapPin, Wrench, Users, Clock, Image as ImageIcon, PlayCircle,
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { NAVAL_ASSETS, CATEGORIES } from '../data/navalAssets.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { GridPattern, GlowSeparator } from '../components/ui/Effects.jsx';
import AssetCard from '../components/ui/AssetCard.jsx';

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

function SpecRow({ specKey, value }) {
  const Icon = SPEC_ICONS[specKey] || Shield;
  const label = SPEC_LABELS[specKey] || specKey;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex items-start gap-3 rounded-xl border border-sky-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-sky-300"
    >
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 transition-colors group-hover:bg-sky-100">
        <Icon className="h-4 w-4 text-sky-600" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400">{label}</div>
        <div className="mt-0.5 text-sm leading-relaxed text-slate-700">{value}</div>
      </div>
    </motion.div>
  );
}

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

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const asset = NAVAL_ASSETS.find(a => a.id === id);

  if (!asset) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50">
        <div className="space-y-4 text-center">
          <div className="text-6xl text-sky-300">-</div>
          <h2 className="text-2xl font-bold text-slate-950">Asset Not Found</h2>
          <Link to="/explore" className="text-sm text-sky-700 hover:underline">
            Return to Fleet
          </Link>
        </div>
      </div>
    );
  }

  const isHistoric = asset.status === 'decommissioned';
  const categoryLabel = CATEGORIES.find(c => c.id === asset.category)?.label || asset.category;
  const gallery = buildGallery(asset);
  const related = NAVAL_ASSETS
    .filter(a => a.id !== asset.id && (a.category === asset.category || a.class === asset.class))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="relative flex min-h-[58vh] items-end overflow-hidden bg-white">
        {asset.image ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${asset.image})` }} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-teal-50" />
        )}
        <GridPattern />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="group mb-8 flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-sky-700"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToFleet}
          </motion.button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="flex-1">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-3 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                  isHistoric
                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                }`}>
                  {isHistoric ? `DECOMMISSIONED ${asset.decommissioned || ''}` : 'ACTIVE'}
                </span>
                <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-sky-700">
                  {categoryLabel}
                </span>
                <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-teal-700">
                  {asset.project}
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
                {asset.name}
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5"><Anchor className="h-3.5 w-3.5 text-sky-600" /> {asset.class}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-sky-600" /> {asset.homePort}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-sky-600" /> {t.commissioned}: {asset.commissioned}</span>
                {asset.pennant && asset.pennant !== 'N/A' && <span className="font-mono text-sky-700">{asset.pennant}</span>}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-base leading-relaxed text-slate-700">{asset.description}</p>
            </motion.div>

            <GlowSeparator />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-950">
                <ImageIcon className="h-5 w-5 text-sky-600" />
                Image Gallery
              </h2>
              <div className="grid auto-rows-[150px] grid-cols-2 gap-3 md:grid-cols-4">
                {gallery.map((item, index) => (
                  <div key={`${item.src}-${index}`} className={`${index === 0 ? 'col-span-2 row-span-2' : ''} relative overflow-hidden rounded-xl border border-white bg-white shadow-sm`}>
                    <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-3">
                      <div className="text-xs font-semibold text-white">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <GlowSeparator />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-950">
                <Shield className="h-5 w-5 text-sky-600" />
                {t.technicalSpecs}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(asset.specs || {}).map(([key, val]) => (
                  <SpecRow key={key} specKey={key} value={val} />
                ))}
              </div>
            </motion.div>

            <GlowSeparator />

            {asset.operationalHistory?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-950">
                  <Clock className="h-5 w-5 text-sky-600" />
                  {t.operationalHistory}
                </h2>
                <div className="relative space-y-0">
                  <div className="absolute bottom-3 left-[17px] top-3 w-px bg-gradient-to-b from-sky-300 via-sky-200 to-transparent" />
                  {asset.operationalHistory.map((event, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }} className="group relative flex gap-5 pb-5 last:pb-0">
                      <div className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-sky-200 bg-white transition-colors group-hover:border-sky-400">
                        <div className="h-2 w-2 rounded-full bg-sky-500" />
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="mb-0.5 font-mono text-xs tracking-wider text-sky-700">{event.year}</div>
                        <div className="text-sm leading-relaxed text-slate-700">{event.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-4 rounded-xl border border-sky-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">Platform Type</h3>
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">{categoryLabel}</div>
                <div className="mt-1 text-lg font-black text-slate-950">{asset.class}</div>
                <div className="mt-1 text-xs text-slate-500">{asset.project}</div>
              </div>
              {[
                { icon: Anchor, label: t.class, value: asset.class },
                { icon: Shield, label: t.origin, value: asset.origin },
                { icon: Wrench, label: t.builder, value: asset.builder },
                { icon: Ship, label: t.fleet, value: asset.fleet },
                { icon: MapPin, label: t.homePort, value: asset.homePort },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600" />
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-400">{label}</div>
                    <div className="mt-0.5 text-sm text-slate-700">{value}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-sky-100 px-4 py-3">
                <PlayCircle className="h-4 w-4 text-red-600" />
                <span className="text-xs font-medium text-slate-600">{t.watchVideo}</span>
              </div>
              {asset.youtubeId ? (
                <div className="aspect-video bg-slate-100">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${asset.youtubeId}`}
                    width="100%"
                    height="100%"
                    controls
                    light={`https://img.youtube.com/vi/${asset.youtubeId}/hqdefault.jpg`}
                  />
                </div>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center bg-sky-50 p-6 text-center">
                  <PlayCircle className="mb-3 h-10 w-10 text-sky-300" />
                  <p className="text-xs text-slate-500">Add a related YouTube ID in navalAssets.js for this asset.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <GlowSeparator className="mb-10" />
            <h2 className="mb-6 text-xl font-bold text-slate-950">Related Assets</h2>
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
