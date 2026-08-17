import React, { useState } from 'react';
import ImageLightbox from '../components/ImageLightbox';
import { useData } from '../context/DataContext';

export default function Gallery() {
  const { gallery } = useData();
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [activeItem, setActiveItem] = useState(null);

  const categories = ['الكل', 'المنصة', 'المدرسون', 'الطلاب', 'الأنشطة', 'الفعاليات', 'التطبيق'];

  const sortedGallery = [...(gallery || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filtered = selectedCategory === 'الكل'
    ? sortedGallery
    : sortedGallery.filter(g => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
          معرض الصور
        </span>
        <h1 className="text-4xl font-black text-white">من داخل عالم الأساس</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          صور حية للأنشطة والأنشطة التعليمية وفعاليات المتفوقين في المنصة.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-navy-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="relative aspect-square rounded-3xl overflow-hidden border border-slate-800 group cursor-pointer shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-right">
              <span className="text-xs font-bold text-amber-400">{item.category}</span>
              <h4 className="text-base font-bold text-white leading-tight">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>

      <ImageLightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
