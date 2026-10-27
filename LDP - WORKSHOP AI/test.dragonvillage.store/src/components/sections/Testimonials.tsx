"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  // PLACEHOLDER DATA - DO NOT USE FAKE REVIEWS
  const testimonials = [
    {
      name: "[TÊN HỌC VIÊN]",
      role: "[CHỨC DANH]",
      content: "[TESTIMONIAL THẬT – CHỜ ĐIỀN] Nội dung đánh giá của học viên về khóa học Sống cùng AI..."
    },
    {
      name: "[TÊN HỌC VIÊN]",
      role: "[CHỨC DANH]",
      content: "[TESTIMONIAL THẬT – CHỜ ĐIỀN] Nội dung đánh giá của học viên về khóa học Sống cùng AI..."
    },
    {
      name: "[TÊN HỌC VIÊN]",
      role: "[CHỨC DANH]",
      content: "[TESTIMONIAL THẬT – CHỜ ĐIỀN] Nội dung đánh giá của học viên về khóa học Sống cùng AI..."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-bg-1 relative border-t border-card-border overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/[0.008] rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Kết quả thực tế từ học viên" 
            subtitle="[PHẦN NÀY ĐANG ĐỂ CHỜ DỮ LIỆU THẬT TỪ HỌC VIÊN]"
          />
        </motion.div>

        {/* Stats Strip */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { value: "[500+]", label: "Học viên" },
            { value: "[4.9/5]", label: "Đánh giá" },
            { value: "[92%]", label: "Thấy kết quả rõ rệt" }
          ].map((stat, i) => (
            <div key={i} className="bg-bg-1 rounded-2xl p-6 text-center border border-card-border shadow-sm">
              <div className="text-3xl md:text-4xl font-black text-gradient mb-2">{stat.value}</div>
              <div className="text-text-soft text-sm uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between bg-bg-1">
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-text-main text-lg italic leading-relaxed mb-8">
                    &quot;{review.content}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent">
                    {review.name.charAt(1)}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main">{review.name}</h4>
                    <span className="text-sm text-text-muted">{review.role}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
