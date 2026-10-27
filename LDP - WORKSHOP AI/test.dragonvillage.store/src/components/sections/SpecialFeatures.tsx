"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';

export const SpecialFeatures = () => {
  const features = [
    {
      title: "Tư duy nền tảng",
      description: "Linh hoạt làm chủ công nghệ, không phụ thuộc vào bất kỳ công cụ nào."
    },
    {
      title: "Thực hành thực chiến",
      description: "Workshop theo tiêu chí \"cầm tay chỉ việc\", nghe và làm được luôn."
    },
    {
      title: "Gia nhập CLB",
      description: "Cơ hội kết nối và hỏi đáp cùng chuyên gia miễn phí trong 02 tháng"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-bg-deep relative border-t border-card-border">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title={<>Điểm đặc biệt chỉ có tại<br className="md:hidden" /> workshop</>} 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-accent/[0.01] rounded-full blur-[150px] pointer-events-none" />
          
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-accent/15 to-transparent hover:from-accent hover:to-accent-pink/30 transition-colors duration-300 z-10 h-full"
            >
              <div className="bg-bg-1 rounded-[23px] p-4 sm:p-6 md:p-8 h-full flex flex-col">
                <div className="text-3xl md:text-4xl font-black text-white mb-2 md:mb-4">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-base sm:text-lg md:text-2xl font-bold text-text-main mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-soft leading-relaxed text-sm md:text-lg">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
