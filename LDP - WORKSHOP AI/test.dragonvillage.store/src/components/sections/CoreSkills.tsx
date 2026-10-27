"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { BrainCircuit, BarChart3, Settings2, Blocks } from 'lucide-react';

export const CoreSkills = () => {
  const skills = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-accent" />,
      title: "Tư duy & Prompt chính xác",
      description: "Nắm vững cấu trúc Prompt chuyên nghiệp để giao việc cho AI. Chấm dứt kết quả \"sặc mùi máy móc\"; AI hiểu đúng ý đồ, viết bài chuẩn giọng thương hiệu."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-accent-2" />,
      title: "Biến dữ liệu thô → báo cáo",
      description: "Dùng AI đọc hiểu nhanh hàng trăm trang báo cáo, biến dữ liệu thô thành biểu đồ trực quan, nắm insight kinh doanh trong chớp mắt."
    },
    {
      icon: <Settings2 className="w-8 h-8 text-accent-pink" />,
      title: "Tự động hóa công việc",
      description: "Thiết lập hệ thống AI nhiều luồng, tự động hóa mà không cần biết code. AI làm việc 24/7 để bạn tập trung vào tư duy chiến lược."
    },
    {
      icon: <Blocks className="w-8 h-8 text-accent" />,
      title: "Đóng gói cả hệ thống",
      description: "Làm chủ sáng tạo đa phương tiện (ảnh, video) và đóng gói toàn bộ kỹ năng thành hệ thống AI cho doanh nghiệp hoặc cá nhân."
    }
  ];

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

  return (
    <section className="py-20 md:py-32 bg-bg-deep relative border-t border-card-border">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            eyebrow="BẠN HỌC ĐƯỢC GÌ QUA WORKSHOP?"
            title="4 kỹ năng cốt lõi bạn sẽ làm chủ" 
            subtitle="7 buổi chuyên sâu (120 phút/buổi) kết hợp Lý thuyết – Demo – Case Study."
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full group hover:border-accent/30 hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)] flex flex-col md:flex-row gap-6 items-start bg-bg-1">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-bg-deep border border-card-border flex items-center justify-center group-hover:bg-accent/8 group-hover:scale-110 transition-all duration-300">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-main mb-3">
                    {skill.title}
                  </h3>
                  <p className="text-text-soft leading-relaxed text-base md:text-lg">
                    {skill.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bonus workshops info */}
        <motion.div
          className="mt-10 max-w-3xl mx-auto cursor-pointer group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start gap-5 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-bg-1 via-accent/5 to-accent-pink/10 border-2 border-accent/30 shadow-[0_0_40px_rgba(124,58,237,0.15)] relative overflow-hidden transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_50px_rgba(124,58,237,0.25)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent-pink to-accent" />
            
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-accent to-accent-pink flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-xl">+2</span>
            </div>
            
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-text-main mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent-pink transition-all duration-300">
                2 buổi workshop mở rộng
              </h4>
              <p className="text-text-soft text-base md:text-lg leading-relaxed group-hover:text-text-main transition-colors duration-300">
                Thảo luận về các ứng dụng thực tế và cập nhật những xu hướng AI mới nhất trên thị trường.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
