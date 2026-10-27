"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';

const audiences = [
  {
    icon: "💼",
    label: "Dân văn phòng & Chuyên gia đa ngành (Marketing, Design, Data)",
    desc: "Đang quá tải và muốn làm chủ AI để bứt phá hiệu suất công việc.",
    accent: "from-accent to-accent-2",
    borderHover: "hover:border-accent/30",
    iconBg: "bg-accent/10 border-accent/20",
  },
  {
    icon: "🏢",
    label: "Chủ doanh nghiệp & Quản lý",
    desc: "Đóng gói năng lực chuyên môn thành hệ thống, tự động hóa vận hành mà không cần tốn hàng nghìn đồ mua tool.",
    accent: "from-accent-2 to-accent-pink",
    borderHover: "hover:border-accent-2/30",
    iconBg: "bg-accent-2/10 border-accent-2/20",
  },
  {
    icon: "🧭",
    label: "Người tự học AI đang loay hoay",
    desc: 'Hoang mang giữa "biển" công cụ, gặp lỗi với AI, cần môi trường "cầm tay chỉ việc" và có cộng đồng hỗ trợ tức thì.',
    accent: "from-accent-pink to-accent",
    borderHover: "hover:border-accent-pink/30",
    iconBg: "bg-accent-pink/10 border-accent-pink/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const TargetAudience = () => {
  return (
    <section className="py-20 md:py-32 bg-bg-deep relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="Ai nên tham gia Workshop này?"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {audiences.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`h-full flex flex-col bg-bg-1 border-accent/8 ${item.borderHover} relative overflow-hidden group p-6 md:p-8`}
              >
                {/* Number watermark */}
                <div className="absolute -right-3 -top-4 text-[80px] md:text-[100px] font-black text-accent/[0.03] group-hover:text-accent/[0.06] transition-colors duration-500 pointer-events-none select-none leading-none">
                  {index + 1}
                </div>

                {/* Top gradient line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.iconBg} border flex items-center justify-center text-2xl md:text-3xl mb-5 shrink-0 shadow-[0_4px_12px_rgba(124,58,237,0.08)]`}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <h3 className="text-lg md:text-xl font-bold text-text-main mb-3 leading-snug relative z-10">
                  {item.label}
                </h3>



                {/* Description */}
                <p className="text-text-soft text-sm md:text-base leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
