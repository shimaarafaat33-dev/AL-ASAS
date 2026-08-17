import React from 'react';
import { Download, Smartphone, QrCode, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AppPage() {
  const { appSettings } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-8 sm:p-12 rounded-3xl border border-amber-500/30 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-right space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 inline-block">
              التطبيق التعليمي الذكي الرسمي
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">تطبيق منصة الأساس التعليمية</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              حمل التطبيق الآن وحول هاتفك الذكي إلى بيئة تعليمية متكاملة تقدم الدروس والاختبارات والمتابعة اللحظية بأعلى جودة.
            </p>

            {/* Buttons & QR */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {appSettings?.googlePlayUrl && (
                <a
                  href={appSettings.googlePlayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-glow-gold transition-all"
                >
                  <Smartphone className="w-6 h-6" />
                  <span>تحميل التطبيق للأندرويد (APK مباشر)</span>
                </a>
              )}

              {appSettings?.appStoreUrl && (
                <a
                  href={appSettings.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-navy-800 hover:bg-navy-700 text-white font-bold px-6 py-3.5 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all"
                >
                  <Download className="w-6 h-6 text-blue-400" />
                  <span>تحميل للآيفون (App Store)</span>
                </a>
              )}
            </div>
          </div>

          {/* Smartphone Transparent Floating Mockup */}
          <div className="lg:col-span-5 flex justify-center relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity" />
            <img
              src={appSettings?.appMockupImage || "./phone_mockup_transparent.png"}
              alt="تطبيق منصة الأساس التعليمية"
              className="relative w-72 sm:w-80 h-auto object-contain drop-shadow-[0_20px_35px_rgba(245,158,11,0.35)] animate-float hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Features Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-navy-900 p-8 rounded-3xl border border-slate-800 text-right space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">دروس تفاعلية سريعة</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            مشاهدة الدروس بدقة عالية وبدون تقطيع مع إمكانية التحميل للمشاهدة بدون إنترنت.
          </p>
        </div>

        <div className="bg-navy-900 p-8 rounded-3xl border border-slate-800 text-right space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">اختبارات وواجبات</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            حل التدريبات التفاعلية والتصحيح اللحظي واستلام درجات الاختبارات مباشرة.
          </p>
        </div>

        <div className="bg-navy-900 p-8 rounded-3xl border border-slate-800 text-right space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">متابعة أولياء الأمور</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            تقارير دورية تظهر نسبة إنجاز الطالب ونقاط القوة والتحسين بوضوح تام.
          </p>
        </div>
      </div>
    </div>
  );
}
