"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { ShieldCheck, Users, PlaySquare, Gift, MessageCircleHeart } from 'lucide-react';

export const ClubPrivileges = () => {
  const privileges = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      title: "Tư duy nền tảng",
      desc: "Không lệ thuộc công cụ."
    },
    {
      icon: <Users className="w-6 h-6 text-accent-2" />,
      title: "Tham gia cộng đồng",
      desc: "Chuyên gia TRỰC TIẾP trả lời câu hỏi."
    },
    {
      icon: <PlaySquare className="w-6 h-6 text-accent-pink" />,
      title: "Học linh hoạt Online/Offline",
      desc: "tại Hà Nội (có recording)."
    },
    {
      icon: <Gift className="w-6 h-6 text-accent" />,
      title: "Tặng 2 buổi Workshop",
      desc: "cập nhật xu hướng AI mới nhất."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-bg-1 relative border-t border-card-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title={<>Đặc quyền chỉ có tại<br className="md:hidden" /> Sống cùng AI</>} 
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
          {/* Card list */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {privileges.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col gap-3 sm:gap-4 border-accent/10 bg-bg-1 p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/8 flex items-center justify-center border border-accent/15">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-accent mb-1">{item.title}</h4>
                    <p className="text-sm sm:text-base text-text-soft">{item.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Side support box */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-full rounded-3xl bg-gradient-to-br from-accent/15 to-accent-pink/10 p-[1px]">
              <div className="bg-bg-1/95 backdrop-blur-xl h-full rounded-[23px] p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircleHeart className="w-8 h-8 text-accent" />
                  <h3 className="text-2xl font-bold text-text-main">Cộng đồng văn minh, hỗ trợ nhiệt tình</h3>
                </div>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    <p className="text-text-soft text-lg leading-relaxed">
                      <strong className="text-text-main font-semibold">Bí đâu hỏi đó, gỡ lỗi tức thì:</strong> chụp màn hình gửi group Zalo, chuyên gia & học viên bắt bệnh ngay.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    <p className="text-text-soft text-lg leading-relaxed">
                      <strong className="text-text-main font-semibold">Học từ chuyên gia hàng đầu:</strong> cầm tay chỉ việc bởi Business Technologist, CTO, chuyên gia AI từ UNIKON & Spiderum.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
