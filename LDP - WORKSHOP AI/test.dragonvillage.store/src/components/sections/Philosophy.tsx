"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';

export const Philosophy = () => {
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
            title={<>Chấm dứt chạy đua công cụ<br />Quay về với Tư duy cốt lõi</>}
          />
        </motion.div>

        <motion.div
          className="mt-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-text-soft leading-relaxed mb-16">
            Chuỗi workshop Sống cùng AI ra đời để thay đổi hoàn toàn cách bạn làm việc. Chúng tôi không dạy mẹo vặt. Chúng tôi hướng dẫn bạn hiểu bản chất của AI, chuẩn hóa chuyên môn của bạn thành dữ liệu để tạo ra những Trợ lý AI hiệu quả nhất.
          </p>

          <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-accent to-accent-pink/50 hover:from-accent-2 hover:to-accent-pink transition-colors duration-500">
            <div className="bg-bg-1 rounded-[23px] p-8 md:p-12 h-full w-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/[0.02] group-hover:bg-accent/[0.05] transition-colors duration-500" />
              <div className="relative z-10 text-left">
                <span className="inline-block text-accent font-bold uppercase tracking-widest text-sm mb-4 border border-accent/20 rounded-full px-4 py-1.5 bg-accent/8">
                  Bí mật ở đây
                </span>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-text-main leading-relaxed">
                  <span className="text-gradient">80% kết quả</span> đến từ 20% nỗ lực đúng chỗ. Khác biệt nằm ở cách bạn tận dụng công nghệ để nhân bản chính mình — chứ không phải làm việc nhiều hơn.
                </h3>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-accent/8 blur-xl -z-10 group-hover:bg-accent/15 transition-colors duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
