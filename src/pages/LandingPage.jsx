import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Ship, Anchor, Globe, ChevronDown, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { NAVAL_ASSETS } from '../data/navalAssets.js';
import AssetCard from '../components/ui/AssetCard.jsx';

// ── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image — replace src with your actual image */}
      <div className="absolute inset-0">
        <img
          src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b595b8062bb77af5deb43760f1c0b5e926858603.jpg"
          alt="Indian Navy Ship"
          className="h-full w-full object-cover object-center"
        />
        {/* Dark overlay so text pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t.orderOfBattle}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {t.heroTitle}{' '}
          <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent">
            {t.heroTitleHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
        >
          {t.heroSubtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-4 text-base font-bold text-white shadow-[0_14px_32px_rgba(14,165,233,0.35)] transition-all duration-300 hover:bg-sky-400 hover:shadow-[0_18px_40px_rgba(14,165,233,0.45)]"
          >
            {t.exploreFleet}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/explore?cat=historic"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          >
            {t.historicTitle}
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1 text-white/50">
          <span className="text-[10px] uppercase tracking-widest">{t.scroll}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}

function YoutubeSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/xX0RJH22tsE?si=59YXjRtqIgtsFDS1"
            title="Indian Navy featured video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  );
}

// ── About Indian Navy Section ────────────────────────────────
const PILLARS = [
  {
    icon: Shield,
    titleKey: 'maritimeTitle',
    descKey: 'maritimeDesc',
  },
  {
    icon: Globe,
    titleKey: 'powerTitle',
    descKey: 'powerDesc',
  },
  {
    icon: Star,
    titleKey: 'selfRelianceTitle',
    descKey: 'selfRelianceDesc',
  },
  {
    icon: Anchor,
    titleKey: 'humanitarianTitle',
    descKey: 'humanitarianDesc',
  },
];

function AboutNavySection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
              <Ship className="h-3.5 w-3.5" />
              {t.aboutEyebrow}
            </div>
            <h2 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {t.aboutTitle}{' '}
              <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
                {t.aboutTitleHighlight}
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                {t.aboutPara1}
              </p>
              <p>
                {t.aboutPara2}
              </p>
              <p>
                {t.aboutPara3Prefix} <strong className="text-slate-800">{t.aboutPara3Strong}</strong> {t.aboutPara3Suffix}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.indiannavy.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-700 transition-all duration-300 hover:bg-sky-100 hover:border-sky-300"
              >
                <Globe className="h-4 w-4" />
                {t.officialNavyWebsite}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-700"
              >
                {t.browseFleet}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50">
                  <pillar.icon className="h-5 w-5 text-sky-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{t.pillars[pillar.titleKey]}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{t.pillars[pillar.descKey]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Historic Teaser ──────────────────────────────────────────
function HistoricTeaser() {
  const { t } = useLanguage();
  const historicAssets = NAVAL_ASSETS.filter(a => a.category === 'historic').slice(0, 3);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
              <Anchor className="h-3.5 w-3.5" />
              {t.legacyHeritage}
            </div>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">{t.historicTitle}</h2>
            <p className="mt-2 text-sm text-slate-500">{t.historicSubtitle}</p>
          </div>
          <Link
            to="/explore?cat=historic"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition-all hover:gap-3"
          >
            {t.viewAllHistoricAssets}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

// ── Page ─────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <YoutubeSection />
      <AboutNavySection />
      <HistoricTeaser />
    </div>
  );
}
