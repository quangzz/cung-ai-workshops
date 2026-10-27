"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';

export const SupportGroup = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const images = [
    '/ai-sme/images/qa/qa-1.jpg',
    '/ai-sme/images/qa/qa-2.jpg',
    '/ai-sme/images/qa/qa-3.jpg',
    '/ai-sme/images/qa/qa-4.jpg'
  ];

  return (
    <section className="py-20 md:py-32 bg-bg-1 relative overflow-hidden border-t border-card-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-accent/[0.008] rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="BÍ ĐÂU HỎI ĐÓ, GỠ LỖI TỨC THÌ"
            subtitle="AI bị lỗi? Hãy chụp màn hình gửi vào group, các chuyên gia sẽ gỡ rối cho bạn ngay lập tức."
            subtitleClassName="!max-w-3xl lg:whitespace-nowrap"
          />
        </motion.div>

        <motion.div
          className="mt-16 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Static sliding QA images */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-accent/20 to-accent-pink/20 overflow-hidden shadow-2xl group">
            {/* Left Arrow */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div className="bg-bg-1 rounded-[23px] overflow-hidden py-8">
              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
              >
                {images.map((imgSrc, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImg(imgSrc)}
                    className="snap-center relative flex-shrink-0 w-[280px] md:w-[360px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-[1.03] transition-transform duration-300 group/item"
                  >
                    <img 
                      src={imgSrc} 
                      alt="Hỏi đáp học viên"
                      className="w-full h-auto object-contain block"
                    />
                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover/item:opacity-100 transform scale-90 group-hover/item:scale-100 transition-all duration-300 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 shadow-xl">
                        🔍 Phóng to
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImg} 
                alt="Phóng to" 
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 backdrop-blur-md transition-all border border-white/10 hover:border-white/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
