import { useLanguage } from '../../context/LanguageContext.jsx';
import { motion } from 'framer-motion';

const LANGS = [
  { code: 'en', label: 'EN', nativeLabel: 'English' },
  { code: 'hi', label: 'HI', nativeLabel: 'हिंदी' },
  { code: 'mr', label: 'MR', nativeLabel: 'मराठी' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-sky-100 bg-white/80 p-1 shadow-sm backdrop-blur-sm">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`
            relative px-3 py-1 rounded-full text-xs font-semibold tracking-widest transition-all duration-300
            ${lang === code
              ? 'text-white bg-sky-500 shadow-[0_8px_18px_rgba(14,165,233,0.22)]'
              : 'text-slate-500 hover:text-sky-700'
            }
          `}
          title={LANGS.find(l => l.code === code)?.nativeLabel}
        >
          {lang === code && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-sky-500"
              style={{ zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  );
}
