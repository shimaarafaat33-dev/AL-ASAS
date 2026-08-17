import React from 'react';
import { X, Calendar, Tag } from 'lucide-react';

export default function ImageLightbox({ item, onClose }) {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] bg-navy-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-navy-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
              {item.category || 'صورة'}
            </span>
            <h4 className="text-white font-bold text-sm sm:text-base">{item.title}</h4>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-navy-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="flex-1 overflow-hidden bg-black flex items-center justify-center p-2">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Info Footer */}
        <div className="p-4 bg-navy-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            <span>تصنيف: {item.category}</span>
          </span>
          {item.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>تاريخ الإضافة: {item.date}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
