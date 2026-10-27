"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

export const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const formSection = document.getElementById('dang-ky');
      
      let isPastHero = false;
      let isBeforeForm = true;

      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        isPastHero = rect.bottom < 0;
      }

      if (formSection) {
        const rect = formSection.getBoundingClientRect();
        // Hide CTA when form is near or in view
        isBeforeForm = rect.top > window.innerHeight;
      }

      setVisible(isPastHero && isBeforeForm);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 transform",
      visible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="relative bg-bg-1/80 backdrop-blur-2xl border-t border-white/5 py-4 px-4 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]">
        {/* Sang hơn: thêm dải gradient mỏng phát sáng ở cạnh trên */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold text-accent tracking-wider">SỐNG CÙNG AI</span>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-text-muted line-through text-xs sm:text-sm">3.600.000đ</span>
              <span className="text-lg sm:text-xl font-black text-text-main">3.200.000đ</span>
            </div>
          </div>
          
          <Button variant="primary" className="!py-2 !px-4 !text-xs sm:!py-3 sm:!px-6 sm:!text-sm md:!px-8 md:!text-base shrink-0" onClick={() => {
            window.open('https://tally.so/r/VLdDX6', '_blank', 'noopener,noreferrer');
          }}>
            Đăng ký ngay
          </Button>
        </div>
      </div>
    </div>
  );
};
