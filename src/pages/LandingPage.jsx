import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Shield, Images, Ship, Globe } from 'lucide-react';


import { BackgroundBeams, Spotlight, GridPattern, GlowSeparator } from '../components/ui/Effects.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

import AssetCard from '../components/ui/AssetCard.jsx';




function AatmanirbharSection() {
  const { t } = useLanguage();
  const commissioned2026 = [
    { name: 'INS Dunagiri', type: 'Stealth Frigate', project: 'Project 17A' },
    { name: 'INS Agray', type: 'ASW Corvette', project: 'ASW SWC' },
    { name: 'INS Sanshodhak', type: 'Survey Vessel', project: 'Sandhayak-class' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-teal-50 py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              <Shield className="h-3.5 w-3.5" />
              {t.aatmanirbharSubtitle}
            </div>

            <h2 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {t.aatmanirbharTitle}{' '}
              <span className="block bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent sm:inline">
                {t.aatmanirbharTitleHighlight}
              </span>
            </h2>

            <GlowSeparator />
            <p className="text-base leading-relaxed text-slate-600">{t.aatmanirbharDesc}</p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { val: '67%', label: 'Indigenous Fleet' },
                { val: '56', label: 'Projects Underway' },
                { val: '8', label: 'Active Shipyards' },
              ].map((m, i) => (
                <div key={i} className="rounded-xl border border-sky-100 bg-white p-3 text-center shadow-sm">
                  <div className="text-2xl font-black text-sky-700">{m.val}</div>
                  <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            <Link to="/explore" className="group inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition-all duration-300 hover:gap-3">
              Explore Full Fleet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="space-y-4">
            <div className="rounded-xl border border-sky-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50">
                  <Globe className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950">{t.tripleCommission}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{t.tripleCommissionDesc}</p>
                </div>
              </div>

              <div className="space-y-3">
                {commissioned2026.map((ship, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-3 transition-colors hover:border-sky-300">
                    <Ship className="h-5 w-5 text-sky-600" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-950">{ship.name}</div>
                      <div className="text-xs text-slate-500">{ship.type} - {ship.project}</div>
                    </div>
                    <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-emerald-700">
                      COMMISSIONED
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-sky-100 bg-white p-4 text-center shadow-sm">
                <div className="text-3xl font-black text-sky-700">18</div>
                <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">Months, Record Commissionings</div>
              </div>
              <div className="rounded-xl border border-sky-100 bg-white p-4 text-center shadow-sm">
                <div className="text-3xl font-black text-sky-700">2L Cr</div>
                <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">Defence Shipbuilding Outlay</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { NAVAL_ASSETS } from '../data/navalAssets.js';

function HistoricTeaser() {

  const { t } = useLanguage();
  const historicAssets = NAVAL_ASSETS.filter(a => a.category === 'historic').slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              <Images className="h-3.5 w-3.5" />
              Legacy and Heritage
            </div>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">{t.historicTitle}</h2>
            <p className="mt-2 text-sm text-slate-500">{t.historicSubtitle}</p>
          </div>
          <Link to="/explore?cat=historic" className="hidden items-center gap-2 text-sm text-slate-500 transition-colors hover:text-sky-700 sm:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {historicAssets.map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NavyHeroVisual() {

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white/60 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-teal-50" />
      <div className="relative">
        <div className="p-5 sm:p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            Navy Background Placeholder
          </div>
          <div className="mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-sky-100 bg-slate-100">
            <div className="flex h-full w-full items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <div className="text-sm font-bold text-slate-700">Add naval image here later</div>
                <div className="text-[11px] text-slate-500">Recommended: INS ship / sea texture / navy skyline</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent" />
      </div>
    </div>
  );
}

function PinterestGrid() {
  const cards = new Array(10).fill(0).map((_, i) => ({ id: i }));

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Image wall
        </div>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Curated <span className="text-gold-gradient">Fleet Boards</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
          Pinterest-like masonry grid. Placeholder cards—swap in your naval images later.
        </p>
      </div>

      <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
        {cards.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
            className="break-inside-avoid mb-4"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
              <div className="relative aspect-[4/5] bg-slate-100">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="text-xs font-bold tracking-wider text-slate-700">
                      Image #{idx + 1}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500">placeholder</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">{idx % 2 === 0 ? 'Vessel' : 'Mission'}</div>
                  <div className="rounded-full border border-sky-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                    SAVE
                  </div>
                </div>
                <div className="mt-1 text-[12px] text-slate-500">Replace with naval asset</div>
              </div>
              <div className="absolute inset-0 pointer-events-none border-shimmer rounded-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function YouTubePlaceholder() {
  return (
    <section className="relative mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Video
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Watch the <span className="text-gold-gradient">Fleet Story</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Video placeholder—your YouTube URL/videoId will be inserted by you.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="glass rounded-xl px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Next</div>
                <div className="mt-1 text-sm font-bold text-slate-950">Replace with your chosen video</div>
              </div>
              <div className="glass rounded-xl px-4 py-3 glow-gold">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Tip</div>
                <div className="mt-1 text-sm font-bold text-slate-950">Use 16:9 naval footage</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-slate-50 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-teal-50" />
            <div className="relative p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-sky-100 pb-3">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">YouTube Placeholder</div>
                <div className="pulse-ring relative h-2.5 w-2.5 rounded-full bg-sky-500" />
              </div>

              <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-sky-100 bg-slate-100">
                <div className="flex h-full w-full items-center justify-center p-6">
                  <div className="space-y-2 text-center">
                    <div className="text-sm font-bold text-slate-700">Video will go here</div>
                    <div className="text-[11px] text-slate-500">Add your YouTube component later</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[12px] text-slate-500">
                Current: <span className="font-mono">https://www.youtube.com/watch?v=YOUR_ID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UniqueAnimatedHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <GridPattern />
      <BackgroundBeams />
      <Spotlight />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgba(125,211,252,0.24),transparent)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Animated naval landing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl"
          >
            {t.heroTitle}{' '}
            <span className="text-gold-gradient">{t.heroTitleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {t.heroSubtitle}
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/explore"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-7 py-4 text-base font-bold text-white shadow-[0_14px_32px_rgba(14,165,233,0.25)] transition-all duration-300 hover:bg-sky-600"
            >
              <span className="tactical-scan inline-flex h-2 w-2 rounded-full bg-white/90" />
              <span>Explore Fleet</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/explore?cat=historic"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-sky-300 hover:text-sky-900"
            >
              Historic Boards
              <ChevronDown className="h-4 w-4 rotate-180 opacity-70" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="glass rounded-xl border-shimmer px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">Now</div>
              <div className="mt-1 text-sm font-bold text-slate-950">Add your navy hero image</div>
            </div>
            <div className="glass rounded-xl px-4 py-3 glow-gold-hover">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">Next</div>
              <div className="mt-1 text-sm font-bold text-slate-950">Insert Pinterest cards</div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <NavyHeroVisual />
          <div className="rounded-2xl border border-sky-100 bg-white/70 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Animated text</div>
                <div className="mt-2 text-lg font-black text-slate-950">
                  <span className="text-gold-gradient">Daring</span> meets <span className="text-gold-gradient">design</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-sky-500/20 to-teal-500/20 blur" />
                <div className="relative h-12 w-12 rounded-2xl bg-white border border-sky-100 flex items-center justify-center">
                  <div className="pulse-ring h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
            <div className="mt-4 text-[12px] text-slate-600">
              Replace placeholders later. Animations already wired.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white">
      <UniqueAnimatedHero />
      <PinterestGrid />
      <YouTubePlaceholder />
      <AatmanirbharSection />
      <HistoricTeaser />
    </div>
  );
}

