import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor], .cursor-pointer');
      if (interactiveEl) {
        setIsPointer(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(text || '');
        setIsHovering(!!text);
      } else {
        setIsPointer(false);
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out hidden lg:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          width: isHovering ? '0px' : isPointer ? '6px' : '8px',
          height: isHovering ? '0px' : isPointer ? '6px' : '8px',
          backgroundColor: '#f59e0b',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
        }}
      />

      {/* Smooth Trailing Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out hidden lg:flex items-center justify-center font-bold text-[10px] text-slate-950 select-none backdrop-blur-[1px]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 1.5 : isPointer ? 1.25 : 1})`,
          width: isHovering ? '64px' : isPointer ? '44px' : '32px',
          height: isHovering ? '64px' : isPointer ? '44px' : '32px',
          backgroundColor: isHovering ? 'rgba(245, 158, 11, 0.92)' : isPointer ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.08)',
          border: isHovering ? 'none' : isPointer ? '1.5px solid rgba(245, 158, 11, 0.6)' : '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: isPointer ? '0 0 20px rgba(245, 158, 11, 0.25)' : 'none',
        }}
      >
        {cursorText && (
          <span className="animate-fadeIn">{cursorText}</span>
        )}
      </div>
    </>
  );
}
