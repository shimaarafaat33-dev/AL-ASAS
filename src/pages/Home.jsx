import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, QrCode, Play, Star, Sparkles, BookOpen, Users, 
  ArrowLeft, CheckCircle2, Phone, Mail, MapPin, 
  ExternalLink, Layers, GraduationCap, Compass, ShieldCheck, 
  Flame, MonitorPlay, FileCheck, Smartphone
} from 'lucide-react';
import { FacebookIcon } from '../components/SocialIcons';
import VideoModal from '../components/VideoModal';
import { useData } from '../context/DataContext';

export default function Home() {
  const { 
    appSettings, 
    subjects, 
    teachers, 
    videos, 
    testimonials, 
    features, 
    stats,
    db 
  } = useData();

  // State for active video & QR code modal
  const [activeVideo, setActiveVideo] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeStageTab, setActiveStageTab] = useState('الكل');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    subject: '',
    stage: 'التأسيس',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (db && contactForm.name && contactForm.phone) {
      db.saveContactMessage(contactForm);
      setFormSent(true);
      setContactForm({ name: '', phone: '', subject: '', stage: 'التأسيس', message: '' });
      setTimeout(() => setFormSent(false), 5000);
    }
  };

  const stagesList = [
    { id: 'التأسيس', title: 'مرحلة التأسيس', icon: Sparkles, desc: 'بناء المهارات اللغوية والحسابية الأساسية للأطفال بطرق مرحة ومبتكرة.', color: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/30', badge: 'text-amber-400 bg-amber-500/10' },
    { id: 'الابتدائي', title: 'المرحلة الابتدائية', icon: BookOpen, desc: 'تبسيط المناهج وتنمية التفكير والاستيعاب وحل الواجبات الذكية.', color: 'from-teal-500/20 to-teal-600/5', border: 'border-teal-500/30', badge: 'text-teal-400 bg-teal-500/10' },
    { id: 'الإعدادي', title: 'المرحلة الإعدادية', icon: Compass, desc: 'تأسيس منهجي وتدريب مكثف على نماذج الامتحانات والاختبارات الدورية.', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30', badge: 'text-blue-400 bg-blue-500/10' },
    { id: 'الثانوي', title: 'المرحلة الثانوية', icon: GraduationCap, desc: 'شروحات نخبة المعلمين بنظام التقييم الحديث والتأهيل للتفوق الأكاديمي.', color: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/30', badge: 'text-emerald-400 bg-emerald-500/10' },
  ];

  const filteredSubjects = activeStageTab === 'الكل' 
    ? (subjects || []) 
    : (subjects || []).filter(s => s.stage === activeStageTab);

  return (
    <div className="academic-bg-pattern min-h-screen space-y-20 sm:space-y-28 pb-20">

      {/* =========================================================================
          1. EDITORIAL HERO SECTION (Dynamic from DB / Live Store)
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Hero Content Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-right">
            
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-amber-400">
                {appSettings?.slogan || "المنظومة التعليمية الرقمية الرائدة في مصر"}
              </span>
            </div>

            {/* Main Headline (Live bound to admin settings) */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] text-white">
                <span className="gold-gradient-text">{appSettings?.heroTitle || "منصة الأساس التعليمية"}</span>
                <span className="block text-2xl sm:text-4xl lg:text-5xl text-slate-200 mt-2 font-extrabold">
                  {appSettings?.heroSubtitle || "معًا.. نحو تفوق دراسي حقيقي ومستقبل واعد"}
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl pt-2">
                {appSettings?.heroDescription || "منصة تعليمية متكاملة تقدم محتوى تعليميًا متميزًا للطلاب من مرحلة التأسيس وحتى المرحلة الثانوية، مع نخبة من المدرسين وتجربة تعليمية حديثة تساعد الطالب على التعلم والتطور."}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={appSettings?.googlePlayUrl || "https://github.com/shimaarafaat33-dev/AL-ASAS/releases/download/1.1.3/AL-ASAS.V1.1.3.apk"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6 py-3.5 rounded-2xl flex items-center gap-3 text-sm sm:text-base font-black shadow-xl"
                data-cursor-text="تحميل"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>تحميل التطبيق الرسمي (APK)</span>
              </a>

              <button
                onClick={() => setShowQrModal(true)}
                className="px-5 py-3.5 rounded-2xl bg-navy-900/80 hover:bg-navy-800 text-slate-200 border border-slate-700/80 hover:border-amber-500/40 transition-all flex items-center gap-2.5 text-sm font-bold shadow-md"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>مسح كود QR</span>
              </button>

              <Link
                to="/subjects"
                className="px-5 py-3.5 rounded-2xl bg-navy-900/40 hover:bg-navy-800/60 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-2 text-sm font-bold"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>استعراض المواد الدراسية</span>
              </Link>
            </div>

            {/* Live Interactive Stats Pill (Bound to live stats / defaults) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {stats && stats.length > 0 ? (
                stats.slice(0, 4).map((st, i) => (
                  <div key={st.id || i} className="academic-card p-3.5 rounded-2xl text-center space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black gold-gradient-text">{st.number}</span>
                    <span className="text-[11px] text-slate-400 block font-bold">{st.label}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="academic-card p-3.5 rounded-2xl text-center space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black gold-gradient-text">+{teachers?.length || 14}</span>
                    <span className="text-[11px] text-slate-400 block font-bold">معلم خبير ومعتَمد</span>
                  </div>
                  <div className="academic-card p-3.5 rounded-2xl text-center space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black teal-gradient-text">{subjects?.length || 17}</span>
                    <span className="text-[11px] text-slate-400 block font-bold">مادة دراسية شاملة</span>
                  </div>
                  <div className="academic-card p-3.5 rounded-2xl text-center space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black blue-gradient-text">4</span>
                    <span className="text-[11px] text-slate-400 block font-bold">مراحل من التأسيس للثانوي</span>
                  </div>
                  <div className="academic-card p-3.5 rounded-2xl text-center space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black text-emerald-400">100%</span>
                    <span className="text-[11px] text-slate-400 block font-bold">تطبيق مجاني وسريع</span>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Hero Visual Preview Column (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-blue-600/10 to-teal-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="relative w-full max-w-md academic-card p-6 sm:p-7 rounded-3xl border border-slate-700/60 shadow-2xl space-y-5 text-right">
              
              {/* Card Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-300">النسخة المحدثة جاهزة للتحميل</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  v1.1.3 APK
                </span>
              </div>

              {/* Phone Graphic with Floating Highlights */}
              <div className="relative flex justify-center py-2">
                <img 
                  src={appSettings?.appMockupImage || "./phone_mockup_transparent.png"} 
                  alt="تطبيق منصة الأساس التعليمية" 
                  className="w-56 sm:w-64 h-auto object-contain animate-float drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]"
                />

                {/* Floating Feature 1 */}
                <div className="absolute top-6 -right-2 sm:-right-4 bg-navy-900/90 border border-amber-500/40 p-2.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-bold text-white">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>شروحات فيديو تفاعلية</span>
                </div>

                {/* Floating Feature 2 */}
                <div className="absolute bottom-8 -left-2 sm:-left-4 bg-navy-900/90 border border-teal-500/40 p-2.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-bold text-white">
                  <FileCheck className="w-4 h-4 text-teal-400" />
                  <span>اختبارات ذكية فورية</span>
                </div>
              </div>

              {/* Instant APK Download Strip */}
              <div className="pt-2">
                <a
                  href={appSettings?.googlePlayUrl || "https://github.com/shimaarafaat33-dev/AL-ASAS/releases/download/1.1.3/AL-ASAS.V1.1.3.apk"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-gold py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>تثبيت التطبيق على هاتفك الآن (مباشر)</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. THE EDUCATIONAL JOURNEY & STAGES ROADMAP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>مسار التعلم والتفوق</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            رحلة الطالب مع منصة الأساس
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            صممنا مناهجنا لتواكب التطور العمري والأكاديمي للطالب خطوة بخطوة من مرحلة التأسيس الأولى وحتى الثانوية العامة.
          </p>
        </div>

        {/* Stages Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stagesList.map((stage, idx) => {
            const Icon = stage.icon;
            const stageSubjectsCount = (subjects || []).filter(s => s.stage === stage.id).length;
            const isSelected = activeStageTab === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageTab(stage.id === activeStageTab ? 'الكل' : stage.id)}
                className={`academic-card rounded-3xl p-6 text-right space-y-4 cursor-pointer relative overflow-hidden transition-all ${
                  isSelected ? 'border-amber-500 ring-2 ring-amber-500/30' : ''
                }`}
                data-cursor-text="استعراض"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center border ${stage.border}`}>
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                </div>

                <div className="space-y-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${stage.badge}`}>
                    {stageSubjectsCount} مادة دراسية
                  </span>
                  <h3 className="text-xl font-bold text-white pt-1">{stage.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{stage.desc}</p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-amber-400 group">
                  <span>عرض المواد</span>
                  <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Subjects Strip under selected stage */}
        <div className="academic-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="text-right">
              <h3 className="text-lg font-bold text-white">
                المواد المتاحة: {activeStageTab === 'الكل' ? 'جميع المراحل الدراسية' : activeStageTab}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">انقر على أي مادة للاطلاع على تفاصيل المنهج والمدرسين</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStageTab('الكل')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeStageTab === 'الكل' ? 'bg-amber-500 text-slate-950' : 'bg-navy-900 text-slate-300 border border-slate-700'
                }`}
              >
                عرض الكل ({subjects?.length || 0})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {filteredSubjects.slice(0, 12).map((sub) => (
              <Link
                key={sub.id}
                to={`/subjects/${sub.id}`}
                className="p-3.5 rounded-2xl bg-navy-900/60 hover:bg-navy-800 border border-slate-700/60 hover:border-amber-500/40 transition-all group text-right flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                    {sub.stage}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {sub.name}
                  </h4>
                </div>
                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{sub.grade || 'شامل'}</span>
                  <ArrowLeft className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>استعراض كافة المواد الدراسية ({subjects?.length || 0} مادة)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

      {/* =========================================================================
          3. BENTO GRID: ACADEMIC PLATFORM ADVANTAGES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>مميزات لا مثيل لها</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            لماذا يفضل الطلاب وأولياء الأمور منصة الأساس؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features && features.length > 0 ? (
            features.slice(0, 3).map((f, idx) => (
              <div key={f.id || idx} className="academic-card p-6 sm:p-8 rounded-3xl space-y-4 text-right">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  {idx === 0 ? <MonitorPlay className="w-6 h-6" /> : idx === 1 ? <FileCheck className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{f.description}</p>
              </div>
            ))
          ) : (
            <>
              <div className="academic-card p-6 sm:p-8 rounded-3xl space-y-4 text-right">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <MonitorPlay className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">شروحات مرئية فائقة الجودة</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  حصص مسجلة ومبسطة بالرسوم التوضيحية والخرائط الذهنية لترسيخ المفاهيم العلمية بطرق حديثة تناسب كل طالب.
                </p>
              </div>

              <div className="academic-card p-6 sm:p-8 rounded-3xl space-y-4 text-right">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">بنوك أسئلة واختبارات دورية</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  تقييمات ذاتية وتدريب مكثف على نماذج الامتحانات الوزارية مع تصحيح فوري وإرشادات تفصيلية للحلول النموذجية.
                </p>
              </div>

              <div className="academic-card p-6 sm:p-8 rounded-3xl space-y-4 text-right">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">تطبيق هاتف خفيف وسهل</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  تصفح سريع بدون تعقيد، إشعارات بحصص البث المباشر، ومتابعة الدرجات والواجبات أينما كنت.
                </p>
              </div>
            </>
          )}
        </div>

      </section>

      {/* =========================================================================
          4. CURATED VIDEOS THEATER (Official Facebook Videos Hub - Live from DB)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-2">
              <Play className="w-3 h-3 fill-current" />
              <span>المكتبة المرئية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              دروس وفيديوهات منصة الأساس
            </h2>
          </div>

          <Link
            to="/videos"
            className="px-5 py-2.5 rounded-2xl bg-navy-900 text-slate-200 border border-slate-700 hover:border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <span>مشاهدة كافة الفيديوهات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic Videos Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(videos || []).slice(0, 2).map((vid, idx) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="academic-card rounded-3xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-amber-500/50 shadow-2xl flex flex-col justify-between"
              data-cursor-text="تشغيل"
            >
              {/* Video Thumbnail with Play Button */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={vid.thumbnailUrl || (idx === 0 ? "./video_cover_full.jpg" : "./video_cover_video2.jpg")}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1877F2] text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <FacebookIcon className="w-3.5 h-3.5" />
                  <span>فيديو Facebook</span>
                </div>

                {vid.duration && (
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-mono">
                    {vid.duration}
                  </span>
                )}
              </div>

              {/* Video Info & Direct Watch Button */}
              <div className="p-6 space-y-4 text-right flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                    {vid.category || 'شرح المنصة'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">انقر للمشاهدة الفورية</span>
                  <a
                    href={vid.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2] text-blue-300 hover:text-white text-xs font-bold transition-colors border border-blue-500/30"
                  >
                    <span>فتح في Facebook</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          5. BESPOKE FACEBOOK COMMUNITY HUB ("تابعنا على Facebook")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-navy-900 via-[#0a1b3b] to-[#1877F2]/20 border border-blue-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-right">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1877F2]/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                <FacebookIcon className="w-4 h-4" />
                <span>الصفحة الرسمية المعتمدة لمنصة الأساس</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                تابعنا على Facebook وكن أول من يعلم بكل جديد
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                انضم إلى مجتمع طلاب وأولياء أمور منصة الأساس التعليمية على فيسبوك لمتابعة جداول البث المباشر، ومراجعات ليلة الامتحان، والمذكرات والملخصات المجانية.
              </p>

              {/* Community Perks */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-navy-950/60 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>بثوث تفاعلية أسبوعية</span>
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-navy-950/60 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>ملخصات ومذكرات PDF</span>
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-navy-950/60 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>تنبيهات مواعيد الاختبارات</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <a
                href={appSettings?.facebookUrl || "https://www.facebook.com/share/1977UiCsvr/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#1877F2] hover:bg-[#0c63d4] text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all text-sm sm:text-base border border-blue-300/40 group"
                data-cursor-text="متابعة"
              >
                <FacebookIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>زيارة صفحتنا على Facebook</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. TOP TEACHERS SPOTLIGHT (Live from DB)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold mb-2">
              <Users className="w-3 h-3" />
              <span>الكادر الأكاديمي</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              نخبة معلمي منصة الأساس
            </h2>
          </div>

          <Link
            to="/teachers"
            className="px-5 py-2.5 rounded-2xl bg-navy-900 text-slate-200 border border-slate-700 hover:border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <span>استعراض كافة المعلمين ({teachers?.length || 0})</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {(teachers || []).slice(0, 8).map((t) => (
            <Link
              key={t.id}
              to={`/teachers/${t.id}`}
              className="academic-card p-5 rounded-3xl text-center space-y-3 group border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col items-center justify-between"
            >
              <div className="relative">
                <img
                  src={t.avatar || "./teacher_islam.jpg"}
                  alt={t.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-500/30 group-hover:border-amber-500 group-hover:scale-105 transition-all duration-300 shadow-md"
                />
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-navy-900 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                  {t.stage}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {t.name}
                </h3>
                <span className="text-xs font-bold text-teal-400 block">
                  {t.subject}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-1">
                <span>الملف الأكاديمي</span>
                <ArrowLeft className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>

      </section>

      {/* =========================================================================
          7. STUDENT TESTIMONIALS (Live from DB)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>قصص النجاح</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            ماذا يقول طلابنا؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(testimonials || []).map((tst) => (
            <div
              key={tst.id}
              className="academic-card p-6 sm:p-7 rounded-3xl text-right space-y-4 flex flex-col justify-between border border-slate-800"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(tst.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{tst.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={tst.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"}
                  alt={tst.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{tst.name}</h4>
                  <span className="text-xs text-amber-400">{tst.stage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          8. DIRECT INQUIRY & CONTACT FORM (Live from DB)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="academic-card rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>الدعم والتواصل المباشر</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                هل لديك استفسار عن المنصة أو المناهج؟
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                فريق الدعم الفني والأكاديمي في منصة الأساس مستعد للرد على جميع استفساراتكم والمساعدة في تفعيل التطبيق.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-navy-900/60 border border-slate-800">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">الهاتف المباشر وواتساب</span>
                    <span className="text-sm font-bold text-white" dir="ltr">{appSettings?.phone || "01558738502"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-navy-900/60 border border-slate-800">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">البريد الإلكتروني</span>
                    <span className="text-sm font-bold text-white">{appSettings?.email || "alasas.education.0@gmail.com"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="space-y-4 text-right">
                {formSent && (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>تم إرسال رسالتك بنجاح! سيتواصل معك فريق الدعم قريباً.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">الاسم بالكامل</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">رقم الهاتف / واتساب</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">المرحلة الدراسية</label>
                    <select
                      value={contactForm.stage}
                      onChange={(e) => setContactForm({ ...contactForm, stage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="التأسيس">مرحلة التأسيس</option>
                      <option value="الابتدائي">المرحلة الابتدائية</option>
                      <option value="الإعدادي">المرحلة الإعدادية</option>
                      <option value="الثانوي">المرحلة الثانوية</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">الموضوع</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="موضوع الاستفسار"
                      className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">نص الرسالة</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="اكتب استفسارك هنا بالتفصيل..."
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm"
                >
                  إرسال الاستفسار الآن
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          MODALS: Video Player & QR Code
          ========================================================================= */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="academic-card max-w-sm w-full p-6 rounded-3xl border border-amber-500/40 text-center space-y-4 relative">
            <h3 className="text-lg font-bold text-white">مسح كود تحميل التطبيق</h3>
            <p className="text-xs text-slate-300">
              وجّه كاميرا هاتفك نحو الكود لتحميل ملف APK المباشر لمنصة الأساس
            </p>
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-inner">
              <img
                src={appSettings?.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fgithub.com%2Fshimaarafaat33-dev%2FAL-ASAS%2Freleases%2Fdownload%2F1.1.3%2FAL-ASAS.V1.1.3.apk&color=070c1b&bgcolor=ffffff"}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-bold border border-slate-700"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
