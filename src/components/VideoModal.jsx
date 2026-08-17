import React, { useState } from 'react';
import { X, Play, ExternalLink, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { FacebookIcon } from './SocialIcons';

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const isFacebook = video.videoUrl && (
    video.videoUrl.includes('facebook.com') ||
    video.videoUrl.includes('fb.watch') ||
    video.videoUrl.includes('fb.com')
  );

  // Official Facebook Video Embed URL Generator
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (isFacebook) {
      if (url.includes('facebook.com/plugins/video.php')) return url;
      // Standard official Facebook iframe embed endpoint
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=720&autoplay=true&t=0`;
    }
    if (url.includes('youtube.com/embed/')) return `${url}?autoplay=1`;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/') + '?autoplay=1';
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const isDirectVideo = (url) => {
    if (!url) return false;
    return (
      url.startsWith('data:video/') ||
      url.startsWith('blob:') ||
      url.endsWith('.mp4') ||
      url.endsWith('.webm') ||
      url.endsWith('.ogg') ||
      url.endsWith('.mov')
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-navy-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-navy-950 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {video.category || 'فيديو تعليمي'}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{video.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            {isFacebook && (
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2] hover:bg-[#0c63d4] text-white text-xs font-bold transition-all shadow-md"
                title="فتح الفيديو في تبويب جديد على Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>فتح في Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-navy-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center w-full overflow-hidden">
          {video.videoUrl ? (
            isDirectVideo(video.videoUrl) ? (
              <video
                src={video.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                متصفحك لا يدعم تشغيل هذا الفيديو.
              </video>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  src={getEmbedUrl(video.videoUrl)}
                  title={video.title}
                  className="w-full h-full border-0 relative z-10"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                  onLoad={() => setIframeLoaded(true)}
                />

                {/* Loading / Fallback Backdrop behind iframe */}
                {!iframeLoaded && isFacebook && (
                  <div className="absolute inset-0 bg-navy-950 flex flex-col items-center justify-center p-6 text-center space-y-3 z-0">
                    <img 
                      src={video.thumbnailUrl || "./video_cover_full.jpg"} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" 
                    />
                    <div className="relative z-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto animate-pulse">
                        <FacebookIcon className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-slate-300">جارٍ تحميل مشغل Facebook الرسمي...</p>
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1877F2] text-white text-xs font-bold shadow-md"
                      >
                        <span>المشاهدة المباشرة على Facebook</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="text-center p-8">
              <Play className="w-16 h-16 text-amber-500 mx-auto mb-3 opacity-60" />
              <p className="text-slate-400">الفيديو متوفر عبر تطبيق منصة الأساس التعليمية</p>
            </div>
          )}
        </div>

        {/* Modal Footer: Description & Direct Access Bar */}
        <div className="p-5 sm:p-6 bg-navy-900 border-t border-slate-800 space-y-3 overflow-y-auto">
          {video.description && (
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-right">{video.description}</p>
          )}

          {isFacebook && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-right">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300">
                  فيديو رسمي من منصة الأساس التعليمية عبر فيسبوك
                </span>
              </div>

              <a
                href={video.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#0c63d4] text-white text-xs sm:text-sm font-black transition-all shadow-lg hover:shadow-blue-500/30"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>مشاهدة الفيديو على Facebook مباشرة (HD)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
