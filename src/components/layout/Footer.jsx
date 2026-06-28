import { Link } from 'react-router-dom';
import { Anchor, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-sky-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
                <Anchor className="h-4 w-4 text-sky-600" />
              </div>
              <span className="text-xl font-black tracking-[0.2em] text-slate-950">{t.appName}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">{t.tagline}</p>
            <p className="text-xs italic text-sky-600">{t.footerTagline}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Navigation</h4>
            <nav className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/explore', label: t.navExplore },
                { to: '/explore?cat=historic', label: t.navHistoric },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="block text-sm text-slate-500 transition-colors hover:text-sky-700">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Data Sources</h4>
            <div className="space-y-2 text-sm text-slate-500">
              <p className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-sky-500" /> Indian Navy Official</p>
              <p className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-sky-500" /> Public domain data</p>
              <p className="flex items-center gap-2"><Anchor className="h-3.5 w-3.5 text-sky-500" /> As of June 2026</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-sky-100 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            Copyright {year} VARUNA. For educational and reference purposes only.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs tracking-wider text-emerald-600">FLEET OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
