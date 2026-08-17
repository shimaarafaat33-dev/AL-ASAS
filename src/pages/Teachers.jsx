import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, ArrowLeft, Award } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Teachers() {
  const { teachers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('الكل');

  const stagesList = ['الكل', 'التأسيس', 'الابتدائي', 'الإعدادي', 'الثانوي'];

  const visibleTeachers = (teachers || []).filter(t => t.isVisible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  const filtered = visibleTeachers.filter(t => {
    const stagesArr = Array.isArray(t.stages) ? t.stages : [t.stage || t.stages];
    const matchesStage = selectedStage === 'الكل' || stagesArr.includes(selectedStage) || t.stage === selectedStage;
    const matchesSearch = (t.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.subject || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
          النخبة التعليمية
        </span>
        <h1 className="text-4xl font-black text-white">مدرسو منصة الأساس</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          مدرسون متخصصون بخبرات طويلة في تيسير وشرح المناهج الدراسية.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-navy-900 p-4 rounded-3xl border border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن مدرس أو مادة..."
            className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center">
          {stagesList.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedStage === stage
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-navy-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {stage === 'الكل' ? 'جميع المراحل' : stage}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-navy-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col text-center p-6 group"
          >
            <div className="relative w-28 h-28 mx-auto mb-4 rounded-full p-1 bg-gradient-to-br from-amber-400 to-blue-600 shadow-lg">
              <img
                src={t.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"}
                alt={t.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
              {t.name}
            </h3>
            <p className="text-xs font-semibold text-amber-400 mb-2">{t.subject}</p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
              {Array.isArray(t.stages) ? t.stages.map((st, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-[11px] bg-navy-800 text-slate-300 border border-slate-700">
                  {st}
                </span>
              )) : (
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-navy-800 text-slate-300 border border-slate-700">
                  {t.stages}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">
              {t.bio}
            </p>

            <Link
              to={`/teachers/${t.id}`}
              className="py-2.5 px-4 rounded-xl bg-navy-800 hover:bg-blue-600 text-white font-bold text-xs transition-colors border border-slate-700"
            >
              عرض الملف الشخصي
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          لا يوجد مدرسون مطابقون للبحث.
        </div>
      )}
    </div>
  );
}
