import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Menu, X, Compass, Clock } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);





  const navLinks = [
    { to: '/explore', label: t.navExplore, icon: Compass },
    { to: '/explore?cat=historic', label: t.navHistoric, icon: Clock },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-sky-100 bg-white/88 shadow-[0_8px_30px_rgba(14,165,233,0.12)] backdrop-blur-xl'
          : 'bg-white/68 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sky-200 blur-md transition-all duration-300 group-hover:bg-sky-300" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-white shadow-sm">
              <Anchor className="h-4 w-4 text-sky-600" strokeWidth={2} />
            </div>
          </div>
          <div>
            <span className="text-lg font-black tracking-[0.2em] text-slate-950 transition-colors duration-300 group-hover:text-sky-700">
              {t.appName}
            </span>
            <div className="hidden text-[9px] font-medium uppercase leading-none tracking-[0.25em] text-sky-600 sm:block">
              {t.tagline}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 text-sm font-medium tracking-wider transition-all duration-300 hover:text-sky-700 ${
                location.pathname.startsWith(to.split('?')[0])
                  ? 'text-sky-700'
                  : 'text-slate-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <div className="h-5 w-px bg-sky-100" />
          <LanguageSwitcher />
        </div>

        <button
          className="text-slate-600 transition-colors hover:text-sky-700 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-sky-100 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-3 px-4 py-4">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-sky-700"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <div className="border-t border-sky-100 pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
