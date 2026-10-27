"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';

export const PainPoints = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const painPoints = [
    "Dùng thử Chat GPT nhưng kết quả trả về chung chung không áp dụng được",
    "Bội thực giữa một rừng tool mới, không biết cần tool nào và bắt đầu học từ đâu",
    "Lo lắng, bất an vì đồng nghiệp xài AI vèo vèo, mình vẫn cặm cụi làm thủ công",
    "Dùng AI để nhanh hơn, nhưng càng dùng càng mất thời gian"
  ];

  return (
    <section className="py-20 md:py-32 bg-bg-deep relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Nếu hằng ngày bạn vẫn đang cảm thấy:" 
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-4 md:gap-8 mt-10 md:mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {painPoints.map((point, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col items-start gap-4 md:gap-6 border-accent/10 bg-bg-1 relative overflow-hidden group p-5 md:p-8">
                <div className="absolute -right-4 -top-6 text-[80px] md:-right-6 md:-top-10 md:text-[120px] font-black text-accent/[0.04] group-hover:text-accent/[0.08] transition-colors duration-500 pointer-events-none select-none">
                  {index + 1}
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent/8 border border-accent/15 flex items-center justify-center text-xl md:text-3xl font-black text-accent shadow-[0_4px_12px_rgba(124,58,237,0.1)] shrink-0">
                  {index + 1}
                </div>
                <h3 className="text-base sm:text-lg md:text-2xl font-bold text-text-main relative z-10 leading-snug">
                  {point}
                </h3>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
