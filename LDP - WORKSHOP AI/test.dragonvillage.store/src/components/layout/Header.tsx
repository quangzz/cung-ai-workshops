"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-bg-1/80 backdrop-blur-xl border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-3" : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink hover:opacity-90 transition-opacity">
            {/* Logo */}
            <div className="relative opacity-90 hover:opacity-100 transition-opacity shrink-0">
              <Image src="/logo-unikon-white.png" alt="Unikon Logo" width={150} height={40} className="object-contain h-6 sm:h-8 md:h-10 w-auto" />
            </div>
          </Link>
          <div className="hidden md:block h-6 w-px bg-gray-200 mx-2" />
          <span className="hidden md:block text-sm font-semibold tracking-widest text-text-soft">
            SỐNG CÙNG AI
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link 
            href="/clbcungai"
            className="text-xs sm:text-sm font-bold text-accent hover:text-white px-2.5 sm:px-3.5 py-1.5 rounded-full border border-accent/30 hover:border-accent bg-accent/10 hover:bg-accent/20 transition-all flex items-center gap-1"
          >
            <span>✦ CLB Cùng AI</span>
          </Link>
          <Button variant="primary" className="!px-3.5 sm:!px-5 !py-1.5 sm:!py-2 !text-xs sm:!text-sm md:!px-6 md:!text-sm shrink-0" onClick={() => {
            window.open('https://tally.so/r/VLdDX6', '_blank', 'noopener,noreferrer');
          }}>
            Đăng ký ngay
          </Button>
        </div>
      </div>
    </header>
  );
};
