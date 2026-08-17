import React from 'react';
import { Star, Heart } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Reviews() {
  const { testimonials } = useData();

  const sortedTestimonials = [...(testimonials || [])].filter(t => t.isVisible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
          آراء الطلاب وأولياء الأمور
        </span>
        <h1 className="text-4xl font-black text-white">قصص نجاح طلابنا</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          انطباعات وتقييمات حقيقية من المنضمين لمنظومة الأساس التعليمية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((tst) => (
          <div
            key={tst.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-right flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(tst.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed italic">
                "{tst.content}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <img
                src={tst.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"}
                alt={tst.name}
                className="w-12 h-12 rounded-full object-cover border border-amber-500/50"
              />
              <div>
                <h4 className="text-base font-bold text-white">{tst.name}</h4>
                <span className="text-xs text-amber-400">{tst.stage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
