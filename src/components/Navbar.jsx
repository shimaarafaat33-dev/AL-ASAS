import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Download, Menu, X, Smartphone, ShieldCheck, Sun, Moon, Sparkles } from 'lucide-react';
import { FacebookIcon } from './SocialIcons';
import Logo from './Logo';

export default function Navbar({ appSettings, theme = 'dark', onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: 'الرئيسية', path: '/' },
    { title: 'من نحن', path: '/about' },
    { title: 'المواد التعليمية', path: '/subjects' },
    { title: 'المدرسون', path: '/teachers' },
    { title: 'الفيديوهات', path: '/videos' },
    { title: 'معرض الصور', path: '/gallery' },
    { title: 'آراء الطلاب', path: '/reviews' },
    { title: 'تطبيق الأساس', path: '/app' },
    { title: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-2 sm:py-2.5 bg-navy-950/85 backdrop-blur-xl shadow-xl border-b border-slate-700/40' 
        : 'py-3.5 sm:py-4 bg-transparent backdrop-blur-sm border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Identity / Platform Logo */}
        <div className="flex items-center gap-3">
          <Logo size="md" showSlogan={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-navy-900/60 p-1.5 rounded-full border border-slate-700/60 shadow-inner backdrop-blur-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-250 select-none ${
                  isActive
                    ? 'btn-gold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* Action Cluster (Theme, Facebook, Admin, Download) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Theme Toggle Button (Light/Dark Mode) */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-full bg-navy-900/80 hover:bg-navy-800 text-amber-400 border border-slate-700/60 hover:border-amber-500/40 transition-all duration-300 shadow-sm group"
            title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح الأنيق' : 'التبديل إلى الوضع الداكن الملكي'}
            aria-label="تبديل المظهر"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600 group-hover:-rotate-45 transition-transform duration-500" />
            )}
          </button>

          {/* Facebook Link Pill */}
          <a
            href={appSettings?.facebookUrl || "https://www.facebook.com/share/1977UiCsvr/"}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs text-white bg-[#1877F2] hover:bg-[#0c63d4] px-3.5 py-2 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5"
            title="زيارة صفحتنا الرسمية على Facebook"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
            <span>Facebook</span>
          </a>

          {/* Admin Dashboard Entry */}
          <NavLink
            to="/admin"
            className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 px-3 py-2 rounded-full bg-navy-900/60 border border-slate-800 hover:border-amber-500/40 transition-all"
            title="لوحة تحكم إدارة المنصة"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>لوحة التحكم</span>
          </NavLink>

          {/* Download App CTA */}
          <a
            href={appSettings?.googlePlayUrl || "#download-app"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-300"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
            <span className="hidden sm:inline">تحميل التطبيق</span>
            <span className="sm:hidden">تحميل APK</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-navy-900 text-slate-200 hover:text-white border border-slate-700 focus:outline-none"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Staggered Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-navy-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-2xl mt-2">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-navy-900 border border-slate-800">
            <span className="text-xs font-bold text-slate-300">مظهر المنصة:</span>
            <button
              onClick={onToggleTheme}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-navy-800 text-amber-400 text-xs font-bold border border-slate-700"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
              <span>{theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <span>{link.title}</span>
              </NavLink>
            ))}

            <a
              href={appSettings?.facebookUrl || "https://www.facebook.com/share/1977UiCsvr/"}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1877F2] hover:bg-[#0c63d4] flex items-center gap-2 shadow-md mt-2"
            >
              <FacebookIcon className="w-4 h-4" />
              <span>زيارة صفحتنا على Facebook</span>
            </a>

            <NavLink
              to="/admin"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>دخول لوحة تحكم المسؤول</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
