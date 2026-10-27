"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import Image from 'next/image';

const mainMentors = [
  {
    name: "Đinh Trần Tuấn Linh",
    title: "Co-founder & CTO UNIKON",
    desc: "20 năm kinh nghiệm về công nghệ, chuyên cung cấp giải pháp AI cho các thương hiệu lớn (Samsung, OMO, Clear, Techcombank)",
    initials: "ĐL",
    slug: "dinh-tran-tuan-linh",
    imageStyle: {}
  },
  {
    name: "Phương Võ",
    title: "Business Technologist chuyên Product - Data/MarTech - AI",
    desc: "Hơn 7 năm kinh nghiệm xây dựng chiến lược, triển khai sản phẩm.",
    initials: "PV",
    slug: "phuong-vo",
    imageStyle: { objectPosition: "75% 0%", transform: "scale(2.2) translateY(-5%)", transformOrigin: "75% 0%" }
  }
];

const additionalMentors = [
  {
    name: "Phạm Vân Anh",
    title: "Chuyên gia tư duy ngôn ngữ và công nghệ",
    desc: "Hơn 6 năm kinh nghiệm biên tập, dịch thuật, xuất bản và 5 năm huấn luyện, ứng dụng AI",
    initials: "VA",
    slug: "pham-van-anh",
    imageStyle: {}
  },
  {
    name: "Nguyễn Thị Hiếu - Hivi",
    title: "Chuyên gia tối ưu quy trình Marketing bằng AI",
    desc: "Nâng cao hiệu suất Marketing bằng AI",
    initials: "HV",
    slug: "nguyen-thi-hieu-hivi",
    imageStyle: {}
  },
  {
    name: "Đặng Trần Tài",
    title: "Chuyên gia Digital Marketing & Web Developer",
    desc: "Chứng chỉ Google Digital Marketing & E-commerce Professional",
    initials: "ĐT",
    slug: "dang-tran-tai",
    imageStyle: {}
  },
  {
    name: "Phạm Việt Hương",
    title: "Chuyên gia Generative AI",
    desc: "Sản xuất ảnh, video cho các chiến dịch marketing và truyền thông thương hiệu lớn",
    initials: "VH",
    slug: "pham-viet-huong",
    imageStyle: {}
  },
  {
    name: "Hà Cao",
    title: "Chuyên gia thiết kế đồ hoạ",
    desc: "Minh hoạ thương hiệu chiến lược và truyền thông",
    initials: "HC",
    slug: "ha-cao",
    imageStyle: {}
  },
];

// Gradient colors for avatar placeholders
const avatarGradients = [
  "from-accent/30 to-accent-2/30",
  "from-accent-2/30 to-accent-pink/30",
  "from-accent-pink/30 to-accent/30",
  "from-accent/25 to-accent-pink/25",
  "from-accent-2/25 to-accent/25",
  "from-accent-pink/25 to-accent-2/25",
  "from-accent/30 to-accent-2/30",
];

function MentorAvatar({ mentor, index, size = "lg" }: { mentor: typeof mainMentors[0]; index: number; size?: "lg" | "sm" }) {
  const sizeClasses = size === "lg"
    ? "w-28 h-28 md:w-32 md:h-32"
    : "w-20 h-20 md:w-24 md:h-24";

  const textSize = size === "lg"
    ? "text-2xl md:text-3xl"
    : "text-xl md:text-2xl";

  return (
    <div className={`relative ${sizeClasses} rounded-full overflow-hidden border-4 border-bg-deep shadow-[0_4px_16px_rgba(124,58,237,0.1)]`}>
      <Image
        src={`/mentors/${mentor.slug}.jpg`}
        alt={mentor.name}
        fill
        unoptimized={true}
        className="object-cover"
        style={mentor.imageStyle}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const container = target.closest('.rounded-full');
          if (container) {
            const fallback = container.querySelector('[data-fallback]') as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }
        }}
      />
      <div
        data-fallback
        className={`absolute inset-0 bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} items-center justify-center hidden`}
      >
        <span className={`${textSize} font-black text-accent/50`}>{mentor.initials}</span>
      </div>
    </div>
  );
}

export const Mentors = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const updateActiveIndex = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.mentor-card')?.clientWidth ?? 280;
    const gap = 24;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, additionalMentors.length - 1));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    updateActiveIndex();
  };

  const handleTouchEnd = () => {
    updateActiveIndex();
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('.mentor-card');
    if (!card) return;
    const cardWidth = card.clientWidth;
    const gap = 24;
    el.scrollTo({ left: idx * (cardWidth + gap), behavior: 'smooth' });
    setActiveIndex(idx);
  };

  return (
    <section className="py-20 md:py-32 bg-bg-deep relative border-t border-card-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            eyebrow="ĐƯỢC CẦM TAY CHỈ VIỆC BỞI CÁC CHUYÊN GIA HÀNG ĐẦU"
            title="Đội ngũ Mentor uy tín"
          />
        </motion.div>

        {/* Main mentors grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {mainMentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              variants={itemVariants}
            >
              <Card className="h-full flex flex-col items-center text-center p-6 bg-bg-1 border-accent/8 hover:border-accent/25">
                <div className="mb-6">
                  <MentorAvatar mentor={mentor} index={index} size="lg" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-main mb-2 leading-snug">{mentor.name}</h3>
                <h4 className="text-sm font-semibold text-accent mb-4 leading-relaxed">{mentor.title}</h4>
                <p className="text-text-soft text-sm leading-relaxed">{mentor.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional mentors – manual drag/swipe carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-center text-text-soft text-base md:text-lg font-medium mb-8">
            ...và các chuyên gia khác
          </h3>

          {/* Carousel container */}
          <div className="relative">
            {/* Left/right fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-bg-deep to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-bg-deep to-transparent z-10 pointer-events-none" />

            {/* Draggable scrolling track */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8 snap-x snap-mandatory"
              style={{ cursor: isDragging ? 'grabbing' : 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchEnd={handleTouchEnd}
              onScroll={updateActiveIndex}
            >
              {additionalMentors.map((mentor, index) => (
                <div
                  key={mentor.slug}
                  className="mentor-card flex-shrink-0 w-[260px] md:w-[300px] snap-start"
                >
                  <Card className="h-full flex flex-col items-center text-center p-5 md:p-6 bg-bg-1 border-accent/8 hover:border-accent/25" hoverEffect={false}>
                    <div className="mb-4">
                      <MentorAvatar mentor={mentor} index={index + 2} size="sm" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-text-main mb-1.5 leading-snug">{mentor.name}</h3>
                    <h4 className="text-xs font-semibold text-accent mb-3 leading-relaxed">{mentor.title}</h4>
                    <p className="text-text-soft text-xs leading-relaxed">{mentor.desc}</p>
                  </Card>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {additionalMentors.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to mentor ${idx + 1}`}
                  onClick={() => scrollToIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-accent w-6' : 'bg-accent/25 hover:bg-accent/50'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
