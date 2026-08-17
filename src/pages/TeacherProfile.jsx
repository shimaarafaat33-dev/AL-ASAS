import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, BookOpen, Clock, Video, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function TeacherProfile() {
  const { id } = useParams();
  const { teachers, appSettings } = useData();
  const teacher = (teachers || []).find(t => t.id === id);

  if (!teacher) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">المعلم غير موجود</h2>
        <Link to="/teachers" className="text-amber-400 font-bold inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة المدرسين</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Button */}
      <div>
        <Link to="/teachers" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm font-semibold transition-colors">
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لقائمة المدرسين</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-navy-900 rounded-3xl p-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <div className="w-44 h-44 rounded-full p-1.5 bg-gradient-to-br from-amber-400 via-amber-500 to-blue-600 shadow-glow-gold mb-4">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl font-black text-white">{teacher.name}</h1>
          <p className="text-sm font-bold text-amber-400 mt-1">{teacher.title}</p>
          <span className="text-xs text-slate-400 mt-1">تخصص: {teacher.subject}</span>
        </div>

        <div className="lg:col-span-8 space-y-6 text-right">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800">
              <span className="text-xs text-slate-400 block">خبرة تدريسية</span>
              <span className="text-lg font-bold text-white font-poppins">{teacher.experience || '10+ سنوات'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800">
              <span className="text-xs text-slate-400 block">المادة الرئيسية</span>
              <span className="text-base font-bold text-amber-400">{teacher.subject}</span>
            </div>
            <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400 block">المراحل المتاحة</span>
              <span className="text-xs font-bold text-white">
                {Array.isArray(teacher.stages) ? teacher.stages.join(' ، ') : teacher.stages}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">نبذة عن المعلم</h3>
            <p className="text-slate-300 text-sm leading-relaxed bg-navy-950 p-5 rounded-2xl border border-slate-800">
              {teacher.bio}
            </p>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex items-center gap-4">
            <a
              href={appSettings?.googlePlayUrl || "#app"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition-all shadow-glow-gold"
            >
              <Download className="w-4 h-4" />
              <span>متابعة دروس {teacher.name} عبر التطبيق</span>
            </a>
          </div>
        </div>

      </div>

      {/* Video Intro if available */}
      {teacher.videoUrl && (
        <div className="bg-navy-900 p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-400" />
            <span>فيديو تعريفي للأستاذ {teacher.name}</span>
          </h2>
          <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden bg-black border border-slate-700">
            <iframe
              src={teacher.videoUrl}
              title={teacher.name}
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
