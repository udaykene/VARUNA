import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import { PageTransition } from './components/ui/Effects.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import DetailPage from './pages/DetailPage.jsx';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/explore" element={<PageTransition><ExplorePage /></PageTransition>} />
        <Route path="/asset/:id" element={<PageTransition><DetailPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="min-h-screen bg-sky-50 text-slate-900 selection:bg-sky-200 selection:text-slate-950">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
