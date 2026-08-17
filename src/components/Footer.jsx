import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import Logo from './Logo';

export default function Footer({ appSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-8 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Platform Branding & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showSlogan={true} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mt-4">
              {appSettings?.aboutText || "منصة تعليمية متكاملة تقدم محتوى تعليميًا متميزًا للطلاب من مرحلة التأسيس وحتى المرحلة الثانوية بأحدث الوسائل وأفضل الكوادر التعليمية."}
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              {appSettings?.facebookUrl && (
                <a href={appSettings.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-navy-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {appSettings?.instagramUrl && (
                <a href={appSettings.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-navy-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {appSettings?.youtubeUrl && (
                <a href={appSettings.youtubeUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-navy-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300">
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              )}
              {appSettings?.whatsappNumber && (
                <a href={`https://wa.me/${appSettings.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-navy-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {appSettings?.telegramUrl && (
                <a href={appSettings.telegramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-navy-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all duration-300">
                  <Send className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-2 border-amber-500 pr-3">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-amber-400 transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-amber-400 transition-colors">من نحن</Link></li>
              <li><Link to="/subjects" className="text-slate-400 hover:text-amber-400 transition-colors">المواد التعليمية</Link></li>
              <li><Link to="/teachers" className="text-slate-400 hover:text-amber-400 transition-colors">المدرسون</Link></li>
              <li><Link to="/videos" className="text-slate-400 hover:text-amber-400 transition-colors">الفيديوهات</Link></li>
              <li><Link to="/gallery" className="text-slate-400 hover:text-amber-400 transition-colors">معرض الصور</Link></li>
            </ul>
          </div>

          {/* Col 3: Educational Stages */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-2 border-amber-500 pr-3">المراحل التعليمية</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/subjects?stage=التأسيس" className="text-slate-400 hover:text-amber-400 transition-colors">مرحلة التأسيس</Link></li>
              <li><Link to="/subjects?stage=الابتدائي" className="text-slate-400 hover:text-amber-400 transition-colors">المرحلة الابتدائية</Link></li>
              <li><Link to="/subjects?stage=الإعدادي" className="text-slate-400 hover:text-amber-400 transition-colors">المرحلة الإعدادية</Link></li>
              <li><Link to="/subjects?stage=الثانوي" className="text-slate-400 hover:text-amber-400 transition-colors">المرحلة الثانوية</Link></li>
              <li><Link to="/app" className="text-slate-400 hover:text-amber-400 transition-colors">تحميل تطبيق المنصة</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-2 border-amber-500 pr-3">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span dir="ltr">{appSettings?.phone || "01558738502"}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{appSettings?.email || "alasas.education.0@gmail.com"}</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <span>{appSettings?.address || "مصر - القاهرة"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} منصة الأساس التعليمية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-amber-400 transition-colors">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-amber-400 transition-colors">الشروط والأحكام</Link>
            <Link to="/contact" className="hover:text-amber-400 transition-colors">الدعم والمساندة</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
