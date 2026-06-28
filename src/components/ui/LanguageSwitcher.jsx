import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const LANGS = [
  { code: 'en', label: 'EN', nativeLabel: 'English' },
  { code: 'hi', label: 'HI', nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'MR', nativeLabel: 'मराठी' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-2 text-xs font-bold tracking-wider text-slate-800 shadow-sm backdrop-blur-md transition-all hover:bg-slate-50 hover:text-slate-950 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-3.5 w-3.5 text-slate-500" />
        <span>{currentLang.nativeLabel}</span>
        <ChevronDown 
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 origin-top-right rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl focus:outline-none z-50"
          >
            <div className="flex flex-col gap-0.5">
              {LANGS.map(({ code, label, nativeLabel }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setLang(code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors ${
                    lang === code
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  <span>{nativeLabel}</span>
                  <span className={`text-[10px] font-bold tracking-wider ${lang === code ? 'text-sky-100' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}