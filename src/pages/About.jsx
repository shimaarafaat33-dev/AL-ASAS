import React from 'react';
import { Target, Compass, Award, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function About() {
  const { appSettings } = useData();
  const goals = appSettings?.aboutGoals || [
    "تحسين وتسهيل تجربة التعلم للطلاب",
    "دعم الطالب وتوفير المتابعة المستمرة",
    "تقديم محتوى تعليمي تفاعلي متميز",
    "تسهيل الوصول إلى التعليم الذكي من أي مكان",
    "بناء أساس علمي وأكاديمي قوي للطالب"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
          من نحن
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">منصة الأساس التعليمية</h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {appSettings?.aboutText || "منصة تعليمية متكاملة تقدم محتوى تعليميًا متميزًا للطلاب من مرحلة التأسيس وحتى المرحلة الثانوية، بأحدث الوسائل وأفضل الكوادر التعليمية."}
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all text-right space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">رؤيتنا</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {appSettings?.aboutVision || "تقديم تجربة تعليمية حديثة تساعد الطلاب على بناء أساس قوي وتحقيق تطور مستمر وتفوق دراسي بأساليب مبتكرة."}
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all text-right space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">رسالتنا</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {appSettings?.aboutMission || "توفير محتوى تعليمي متميز مع مدرسين متخصصين ووسائل تعليمية حديثة تلبي تطلعات الطلاب وأولياء الأمور."}
          </p>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-navy-900 p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 text-right">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white">أهدافنا الاستراتيجية</h2>
          <p className="text-slate-400 text-sm">تسعى منصة الأساس لتحقيق مجموعة من الأهداف الرئيسية التي تخدم مستقبل الطالب:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, idx) => (
            <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-navy-950 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-slate-200 text-sm font-medium leading-relaxed">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
