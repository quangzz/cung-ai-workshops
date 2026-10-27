"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';

export const WorkshopProgram = () => {
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

  const sessions = [
    {
      title: "Buổi 1: Tư duy nền tảng và Viết lệnh",
      items: [
        "Đào tạo tư duy nền tảng về AI, kỹ thuật viết lệnh, chọn công cụ phù hợp",
        "Tạo ngay một trợ lý ảo xử lý email và tài liệu"
      ]
    },
    {
      title: "Buổi 2: Viết và Giao tiếp chuyên nghiệp",
      items: [
        "Cung cấp bộ công cụ viết, trình bày dữ liệu, báo cáo và tạo ảnh",
        "Nghiên cứu, làm thuyết trình, và thiết lập giọng văn đúng yêu cầu",
        "Chấm dứt nỗi ám ảnh \"văn sặc mùi AI\""
      ]
    },
    {
      title: "Buổi 3: Phân tích dữ liệu & Ra quyết định",
      items: [
        "Ứng dụng vào Excel, thiết lập KPI, bảng điều khiển và kể chuyện bằng dữ liệu",
        "Dùng AI phân tích dữ liệu, tìm nhanh xu hướng kinh doanh và xuất báo cáo"
      ]
    },
    {
      title: "Buổi 4: Sáng tạo nội dung đa phương tiện",
      items: [
        "Tạo ảnh, video và content social bằng AI",
        "Thiết lập một Giám đốc sáng tạo AI quản lý quy trình. Lên ý tưởng → Viết kịch bản → Tạo ảnh → Xuất Video",
        "Biến một nhân sự bình thường thành một studio sáng tạo thu nhỏ"
      ]
    },
    {
      title: "Buổi 5: Tự động hóa & Lập trình không cần code",
      items: [
        "Tự xây website, landing page",
        "Tạo công cụ làm việc nội bộ, hệ thống tự động hóa thông tin khách hàng",
        "Xây dựng trợ lý tự động hoá chạy dữ liệu liên hoàn"
      ]
    },
    {
      title: "Buổi 6: Trợ lý AI chuyên biệt và Tổng kết",
      items: [
        "Tìm hiểu sâu về Custom GPT, hệ thống đa trợ lý (Multi-Agent)",
        "Chuyển từ dùng AI đơn lẻ sang \"làm sếp\" của một đội ngũ AI",
        "Thiết lập nhiều trợ lý ảo làm việc cùng nhau, ứng dụng ngay vào công việc",
        "Định hình phong cách làm việc mới (Vibe working)"
      ]
    },
    {
      title: "Buổi 7: Thảo luận các ứng dụng thực tế & xu hướng A.I mới nhất",
      items: [
        "Thảo luận chuyên sâu về các ứng dụng thực tế.",
        "Cập nhật các xu hướng AI mới nhất trên thế giới."
      ]
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-bg-main relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <SectionTitle 
            title={
              <>
                7 BUỔI WORKSHOP GIẢI QUYẾT
                <br className="md:hidden" />
                {' '}TRIỆT ĐỂ VẤN ĐỀ
              </>
            } 
            titleClassName="md:whitespace-nowrap !text-2xl sm:!text-3xl md:!text-4xl lg:!text-[2.5rem]"
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {sessions.map((session, index) => (
            <motion.div key={index} variants={itemVariants} className={index === 6 ? "md:col-span-2 lg:col-span-3 lg:w-2/3 lg:mx-auto" : ""}>
              <Card className="h-full flex flex-col items-start gap-4 md:gap-6 border-accent/10 bg-bg-2 relative overflow-hidden group p-6 md:p-8 hover:border-accent/30 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/50 group-hover:bg-accent transition-colors duration-300"></div>
                <h3 className="text-xl md:text-2xl font-bold text-accent relative z-10 leading-snug">
                  {session.title}
                </h3>
                <ul className="flex flex-col gap-3 text-white relative z-10">
                  {session.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent mt-1.5 opacity-80 text-sm">✦</span>
                      <span className="text-sm md:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
