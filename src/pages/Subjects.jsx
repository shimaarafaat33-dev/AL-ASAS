import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Search, ArrowLeft, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Subjects() {
  const { subjects } = useData();
  const [searchParams] = useSearchParams();
  const initialStage = searchParams.get('stage') || 'الكل';

  const [selectedStage, setSelectedStage] = useState(initialStage);
  const [searchTerm, setSearchTerm] = useState('');

  const stagesList = ['الكل', 'التأسيس', 'الابتدائي', 'الإعدادي', 'الثانوي'];

  const visibleSubjects = (subjects || []).filter(s => s.isVisible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  const filtered = visibleSubjects.filter(sub => {
    const matchesStage = selectedStage === 'الكل' || sub.stage === selectedStage;
    const matchesSearch = (sub.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (sub.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
          دليل المواد
        </span>
        <h1 className="text-4xl font-black text-white">المواد التعليمية</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          تصفح جميع المواد الدراسية المقررة لجميع المراحل من التأسيس حتى الثانوية العامة.
        </p>
      </div>

      {/* Controls: Search & Stage Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-navy-900 p-4 rounded-3xl border border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن مادة..."
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

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((sub) => (
          <div
            key={sub.id}
            className="bg-navy-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col group shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={sub.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"}
                alt={sub.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                {sub.stage}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {sub.name}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {sub.description}
                </p>
              </div>

              <Link
                to={`/subjects/${sub.id}`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-navy-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 border border-slate-700 hover:border-amber-500"
              >
                <span>عرض التفاصيل</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          لا توجد مواد مطابقة للبحث أو المرحلة المحددة.
        </div>
      )}
    </div>
  );
}
