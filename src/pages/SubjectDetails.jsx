import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Users, Video, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function SubjectDetails() {
  const { id } = useParams();
  const { subjects, teachers: allTeachers, videos: allVideos, appSettings } = useData();
  const subject = (subjects || []).find(s => s.id === id);

  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">المادة غير موجودة</h2>
        <Link to="/subjects" className="text-amber-400 font-bold inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          <span>العودة للمواد</span>
        </Link>
      </div>
    );
  }

  // Related teachers
  const assignedTeachers = allTeachers.filter(t => 
    (Array.isArray(subject.teachers) && subject.teachers.includes(t.id)) ||
    t.subject.includes(subject.name)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back Button */}
      <div>
        <Link to="/subjects" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm font-semibold transition-colors">
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لكافة المواد</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-navy-900 rounded-3xl p-8 border border-slate-800">
        <div className="lg:col-span-7 space-y-4 text-right">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 inline-block">
            مرحلة {subject.stage}
          </span>
          <h1 className="text-4xl font-black text-white">{subject.name}</h1>
          <p className="text-slate-300 text-base leading-relaxed">
            {subject.description}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={appSettings?.googlePlayUrl || "#app"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition-all shadow-glow-gold"
            >
              <Download className="w-4 h-4" />
              <span>متابعة المادة عبر التطبيق</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-700">
          <img
            src={subject.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"}
            alt={subject.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Subject Teachers */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-400" />
          <span>مدرسو المادة</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedTeachers.length > 0 ? assignedTeachers.map(t => (
            <div key={t.id} className="bg-navy-900 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover border border-amber-500/40" />
              <div>
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <p className="text-xs text-amber-400">{t.title}</p>
                <Link to={`/teachers/${t.id}`} className="text-xs text-blue-400 hover:underline mt-1 inline-block">
                  عرض الملف الشخصي
                </Link>
              </div>
            </div>
          )) : (
            <div className="col-span-full p-6 rounded-2xl bg-navy-900 border border-slate-800 text-slate-400 text-sm">
              نخبة من معلمي منصة الأساس يدرسون هذه المادة عبر التطبيق التفاعلي.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
