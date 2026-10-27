"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { CalendarDays, MapPin, Users } from 'lucide-react';

export const Pricing = () => {
  return (
    <section className="py-20 md:py-32 bg-bg-deep relative border-t border-card-border overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-accent/[0.01] rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="THÔNG TIN KHAI GIẢNG & ƯU ĐÃI" 
          />
        </motion.div>

        <motion.div 
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-accent to-accent-pink shadow-[0_8px_40px_rgba(124,58,237,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent to-accent-pink text-white px-6 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase whitespace-nowrap z-10 shadow-lg">
              Ưu đãi đặc biệt
            </div>
            
            <div className="bg-bg-1 rounded-[22px] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10">
                {/* Info */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-start gap-4">
                    <CalendarDays className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-text-main font-bold text-lg mb-1">Thời gian & Khai giảng</h4>
                      <p className="text-text-soft">19h – 21h, tối Thứ 4 hàng tuần<br/>Khai giảng: 30/09/2026</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-text-main font-bold text-lg mb-1">Hình thức</h4>
                      <p className="text-text-soft">Online (Zoom)</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col justify-center items-center md:items-end md:border-l md:border-card-border md:pl-10">
                  <div className="text-center md:text-right mb-6">
                    <div className="text-4xl md:text-5xl font-black text-text-main mb-2">3.600.000đ</div>
                    <div className="text-text-muted/70 text-sm mb-4">(chỉ 450k/buổi cho một lộ trình thay đổi toàn diện)</div>
                    <div className="inline-flex text-left md:text-right items-center gap-2 text-accent bg-accent/8 px-4 py-2.5 rounded-xl text-sm font-medium">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>Đăng ký sớm trước 26/09/2026 hoặc nhóm 3 người, chỉ còn <strong className="font-bold">3.200.000đ</strong></span>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full text-lg py-4" onClick={() => {
                    window.open('https://tally.so/r/VLdDX6', '_blank', 'noopener,noreferrer');
                  }}>
                    ĐĂNG KÝ NGAY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
