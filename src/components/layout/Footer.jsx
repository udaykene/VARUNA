import { Link } from 'react-router-dom';
import { Anchor, Shield, Globe, ExternalLink, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-800 bg-sky-900">
                <Anchor className="h-4 w-4 text-sky-400" />
              </div>
              <span className="text-xl font-black tracking-[0.2em] text-white">{t.appName}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {t.footerDescription}
            </p>
            <p className="text-xs italic text-sky-400">{t.footerTagline}</p>

            {/* Official link */}
            <a
              href="https://www.indiannavy.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex items-center gap-2 rounded-lg border border-sky-700 bg-sky-900/50 px-4 py-2.5 text-sm font-medium text-sky-300 transition-all hover:bg-sky-800/60 hover:text-sky-200"
            >
              <Globe className="h-4 w-4" />
              indiannavy.nic.in
              <ExternalLink className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
            </a>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t.navFooterTitle}</h4>
            <nav className="space-y-2">
              {[
                { to: '/', label: t.home },
                { to: '/explore', label: t.navExplore },
                { to: '/explore?cat=carriers', label: t.categoryLabels.carriers },
                { to: '/explore?cat=submarines', label: t.categoryLabels.submarines },
                { to: '/explore?cat=historic', label: t.navHistoric },
              ].map(({ to, label }) => (
                <Link
                  key={`${to}-${label}`}
                  to={to}
                  className="block text-sm text-slate-400 transition-colors hover:text-sky-300"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Data Sources */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t.dataSources}</h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://www.indiannavy.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-400 transition-colors hover:text-sky-300"
              >
                <Shield className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sky-600" />
                {t.officialNavyWebsite}
              </a>
              <p className="flex items-start gap-2 text-slate-400">
                <Globe className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sky-600" />
                {t.publicData}
              </p>
              <p className="flex items-start gap-2 text-slate-400">
                <Anchor className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sky-600" />
                {t.dataCurrent}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} VARUNA. {t.footerLegal}
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium tracking-wider text-emerald-500">{t.fleetOperational}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
