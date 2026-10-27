"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';

export const Commitment = () => {
  const commitments = [
    "Biết sử dụng AI hiệu quả trong công việc hàng ngày.",
    "Biết viết prompt và giao việc cho AI chuyên nghiệp.",
    "Biết tạo nội dung, hình ảnh và video bằng AI.",
    "Biết dùng AI cho Excel, báo cáo và phân tích dữ liệu.",
    "Biết tự động hóa công việc và xây tool nội bộ.",
    "Có cơ hội thăng tiến lên vị trí quản lý nhờ tư duy và khả năng sử dụng AI hiệu quả"
  ];

  return (
    <section className="py-20 md:py-32 bg-bg-1 relative overflow-hidden">
      {/* Background gradients */}
      
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <Card className="p-8 md:p-12 lg:p-16 border-accent/15 bg-gradient-to-br from-white to-bg-deep">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle 
              title="SAU WORKSHOP, BẠN SẼ:" 
              titleClassName="md:whitespace-nowrap lg:text-[40px] xl:text-[44px] tracking-tight"
              align="left"
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {commitments.map((text, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-4 group"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="mt-1 flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md group-hover:bg-green-400/40 transition-all duration-300"></div>
                  <CheckCircle2 className="w-6 h-6 text-green-500 relative z-10" />
                </div>
                <p className="text-lg md:text-xl text-text-main font-medium leading-snug">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </div>
    </section>
  );
};
