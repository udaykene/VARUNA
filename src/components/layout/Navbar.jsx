import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Anchor,
  Clock,
  Compass,
  ExternalLink,
  Home,
  Info,
  Menu,
  Search,
  X,
} from "lucide-react";
import LanguageSwitcher from "../ui/LanguageSwitcher.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (location.pathname !== "/") return null;

  const navLinks = [
    { to: "/", label: t.navHome, icon: Home, exact: true, hash: "" },
    { to: "/explore", label: t.navExplore, icon: Compass },
    {
      to: "/explore?cat=historic",
      label: t.navHistoric,
      icon: Clock,
      matchSearch: "historic",
    },
    // { to: '/#about', label: t.navAbout, icon: Info, exact: true, hash: '#about' },
  ];

  const isActive = ({ to, exact, matchSearch, hash }) => {
    if (matchSearch)
      return (
        location.pathname === "/explore" &&
        location.search.includes(matchSearch)
      );
    const path = to.split("?")[0].split("#")[0];
    if (hash !== undefined)
      return location.pathname === path && location.hash === hash;
    return exact
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3 transition-all duration-300 sm:px-5">
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/80 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 backdrop-blur-xl"
            : "border-white/70 bg-white/80 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        }`}
      >
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:border-sky-300">
            <Anchor className="h-5 w-5 text-sky-600" strokeWidth={2.4} />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-xl font-black tracking-[0.2em] text-slate-950 transition-colors group-hover:text-sky-700">
              {t.appName}
            </span>
            <span className="hidden truncate text-[10px] font-bold uppercase leading-none tracking-[0.22em] text-sky-600 sm:block">
              {t.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:!flex">
          <div className="flex items-center rounded-full border border-slate-200/80 bg-slate-50/80 p-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-white shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-slate-950"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-slate-950"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 36,
                      }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* <Link
            to="/explore"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sky-700 transition-all hover:border-sky-200 hover:bg-sky-100"
            aria-label={t.navExplore}
            title={t.navExplore}
          >
            <Search className="h-4 w-4" />
          </Link> */}
        </div>
        <div className="hidden items-center gap-2 md:!flex">
          {/* <a
            href="https://www.indiannavy.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_28px_rgba(14,165,233,0.25)] transition-all hover:bg-sky-600"
          >
            {t.officialSite}
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a> */}
          <LanguageSwitcher />
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-slate-950 text-white"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="https://www.indiannavy.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-sky-700 hover:bg-sky-50"
              >
                <ExternalLink className="h-4 w-4" />
                {t.officialNavyWebsite}
              </a>
              <div className="border-t border-slate-100 px-1 pt-3">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
