"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background layers */}
      <div className="absolute inset-0 z-0" style={{ background: 'var(--grad-hero)' }} />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.02] rounded-full blur-[200px] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <Badge variant="pink" className="mb-6">CHUỖI WORKSHOP ĐỘC QUYỀN • SỐNG CÙNG AI</Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-[60px] xl:text-[68px] font-black uppercase tracking-tight mb-6 text-gradient overflow-visible" style={{ lineHeight: '1.4' }}>
              MÙ MỜ AI, BẠN CÓ THỂ BỊ TỤT LẠI PHÍA SAU
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-text-main mb-6 uppercase" style={{ lineHeight: '1.4' }}>
              CÔNG CỤ KHÔNG GIẢI QUYẾT VẤN ĐỀ<span className="hidden md:inline">,</span> THỨ BẠN CẦN LÀ TƯ DUY
            </p>
            
            <ul className="text-text-soft text-base md:text-lg leading-relaxed mb-8 max-w-2xl space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span>Sống cùng AI là chuỗi workshop dành riêng cho Dân văn phòng, Quản lý &amp; Chuyên gia.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span>Các chuyên gia giải đáp mọi câu hỏi trong Cộng đồng Zalo.</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto" onClick={() => {
                window.open('https://tally.so/r/VLdDX6', '_blank', 'noopener,noreferrer');
              }}>
                <Sparkles className="w-5 h-5" />
                ĐĂNG KÝ NGAY
              </Button>
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <span className="text-text-muted line-through text-lg">3.600.000đ</span>
                  <span className="text-3xl font-black text-text-main">3.200.000đ</span>
                </div>
                <span className="text-accent-pink text-sm mt-1 font-medium">Ưu đãi khi đăng ký sớm trước ngày 26/09/2026 hoặc đăng ký nhóm 3 người</span>
              </div>
            </div>
          </motion.div>

          {/* Visual placeholder for workshop image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[550px] mx-auto hidden md:block"
          >
            {/* Decorative tilted background card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent/10 to-accent-pink/10 border border-accent/15 transform rotate-3 scale-95 shadow-[0_8px_40px_rgba(124,58,237,0.12)]" />
            
            {/* Main card with visual content */}
            <div className="relative rounded-3xl overflow-hidden border border-accent/20 bg-bg-1/90 shadow-2xl aspect-square flex items-center justify-center group">
              <img 
                src="/ai-sme/images/workshop-real.jpg" 
                alt="Workshop thực tế"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay gradient for a premium look */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-1/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Small floating badge */}
              <div className="absolute top-6 right-6 backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-3 transform transition-transform group-hover:scale-110">
                <Sparkles className="w-5 h-5 text-accent-pink" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
