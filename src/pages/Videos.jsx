import React, { useState } from 'react';
import { Play, Search, Film, ExternalLink } from 'lucide-react';
import { FacebookIcon } from '../components/SocialIcons';
import VideoModal from '../components/VideoModal';
import { useData } from '../context/DataContext';

export default function Videos() {
  const { videos } = useData();
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['الكل', 'شرح المنصة', 'الدرس التجريبي', 'الفعاليات', 'توجيهي'];

  const sortedVideos = [...(videos || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filtered = sortedVideos.filter(v => {
    const matchesCat = selectedCategory === 'الكل' || v.category === selectedCategory;
    const matchesSearch = (v.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (v.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
          <Film className="w-3.5 h-3.5" />
          <span>المكتبة المرئية والشروحات</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">فيديوهات منصة الأساس</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          تصفح الدروس النموذجية والشروحات التفاعلية وفعاليات المنصة مع نخبة من أفضل المعلمين.
        </p>
      </div>

      {/* Controls: Search & Category Chips */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 academic-card p-4 rounded-3xl border border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن فيديو أو درس..."
            className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-navy-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'btn-gold shadow-md'
                  : 'bg-navy-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((vid) => {
          const isFacebook = vid.videoUrl && (
            vid.videoUrl.includes('facebook.com') ||
            vid.videoUrl.includes('fb.watch') ||
            vid.videoUrl.includes('fb.com')
          );

          return (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="academic-card rounded-3xl overflow-hidden cursor-pointer group shadow-xl flex flex-col justify-between"
              data-cursor-text="مشاهدة"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {isFacebook && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#1877F2] text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                    <FacebookIcon className="w-3 h-3" />
                    <span>Facebook</span>
                  </div>
                )}

                {vid.duration && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono">
                    {vid.duration}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3 text-right flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {vid.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{vid.description}</p>
                </div>

                {isFacebook && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-amber-400 font-bold">تشغيل فوري</span>
                    <a
                      href={vid.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-bold"
                    >
                      <span>المشاهدة على فيسبوك</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
