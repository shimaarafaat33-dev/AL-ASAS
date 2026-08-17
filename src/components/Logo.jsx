import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';

export default function Logo({ size = 'md', showSlogan = false, className = '' }) {
  const sizeClasses = {
    sm: { icon: 'w-9 h-9', title: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-11 h-11 sm:w-12 sm:h-12', title: 'text-xl font-black', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14 sm:w-16 sm:h-16', title: 'text-2xl font-black', sub: 'text-[12px]' },
    xl: { icon: 'w-20 h-20 sm:w-24 sm:h-24', title: 'text-4xl font-black', sub: 'text-sm' },
  }[size];

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      {/* Platform Logo Badge */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-glow-gold overflow-hidden shrink-0 ${sizeClasses.icon}`}>
        <div className="w-full h-full bg-navy-950 rounded-[14px] overflow-hidden flex items-center justify-center relative">
          <img 
            src={logoImg} 
            alt="لوجو منصة الأساس التعليمية" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-right">
        <div className="flex items-center gap-1.5">
          <span className={`font-cairo leading-none tracking-tight ${sizeClasses.title}`}>
            <span className="text-white">منصة </span>
            <span className="gold-gradient-text drop-shadow-sm">الأساس </span>
            <span className="text-blue-400">التعليمية</span>
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`font-poppins font-medium text-slate-400 uppercase tracking-wider ${sizeClasses.sub}`}>
            Al Asas Education
          </span>
          {showSlogan && (
            <span className="text-[10px] font-cairo text-amber-400/90 hidden sm:inline-block border-r border-slate-700 pr-2">
              معًا... نحو مستقبل أفضل
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
