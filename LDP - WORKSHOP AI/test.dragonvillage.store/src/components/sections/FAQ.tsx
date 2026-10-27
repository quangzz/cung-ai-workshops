"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FAQ = () => {
  const faqs = [
    {
      q: "Không giỏi công nghệ thì có dùng AI hiệu quả được không?",
      a: "Chương trình thiết kế chuyên biệt cho dân văn phòng. Dùng AI giờ chỉ cần Tư duy giao việc và thao tác kéo – thả. Chuyên gia cung cấp sẵn bộ khung, bạn chỉ lắp dữ liệu của mình vào là chạy."
    },
    {
      q: "Tôi học Online được không?",
      a: "Được — học Online qua Zoom hoặc Offline tại Hà Nội, đều có bản ghi hình."
    },
    {
      q: "Học xong có được hỗ trợ tiếp không?",
      a: "Có — hỗ trợ gỡ lỗi trọn đời trong Cộng đồng Zalo."
    },
    {
      q: "Có cần biết code không?",
      a: "Không. Bạn sẽ tự động hóa & xây hệ thống AI mà không cần biết code."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-bg-1 relative border-t border-card-border">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Câu hỏi thường gặp" 
          />
        </motion.div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen ? "bg-bg-1 border-accent/30 shadow-[0_4px_20px_rgba(124,58,237,0.08)]" : "bg-bg-1/50 border-card-border hover:border-accent/20"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-text-main pr-8">{faq.q}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                    isOpen ? "bg-accent text-white" : "bg-bg-2 text-text-soft"
                  )}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-text-soft text-lg leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
