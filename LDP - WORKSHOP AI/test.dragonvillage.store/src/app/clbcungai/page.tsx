"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Users, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  Gift, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Plus, 
  Minus, 
  Layers, 
  HelpCircle,
  Clock,
  Compass,
  FileCode2,
  ExternalLink,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/layout/Footer';

const TALLY_URL = "https://tally.so/r/VLdDX6";

// ─── Header for CLB ────────────────────────────────────────────────────────
const ClubHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-bg-1/85 backdrop-blur-xl border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-3.5"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between gap-4">
        {/* Logo & Badge */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/logo-unikon-white.png"
              alt="Unikon Logo"
              width={140}
              height={36}
              className="object-contain h-7 sm:h-8 w-auto"
            />
          </Link>
          <div className="hidden sm:block h-5 w-px bg-white/20" />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-accent/15 text-accent border border-accent/25">
            CLB CÙNG AI
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-text-soft">
          <a href="#ve-clb" className="hover:text-text-main transition-colors">Về CLB</a>
          <a href="#dac-quyen" className="hover:text-text-main transition-colors">Đặc quyền</a>
          <a href="#hoat-dong" className="hover:text-text-main transition-colors">Hoạt động</a>
          <a href="#mentors" className="hover:text-text-main transition-colors">Cố vấn</a>
          <a href="#bieu-phi" className="hover:text-text-main transition-colors">Hội viên</a>
          <a href="#faq" className="hover:text-text-main transition-colors">FAQ</a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="hidden md:inline-flex text-xs font-semibold text-text-soft hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all"
          >
            ← Về Workshop
          </Link>
          <Button
            variant="primary"
            className="!px-4 !py-2 !text-xs sm:!px-5 sm:!py-2 sm:!text-sm shrink-0"
            onClick={() => window.open(TALLY_URL, '_blank', 'noopener,noreferrer')}
          >
            Gia nhập CLB
          </Button>
        </div>
      </div>
    </header>
  );
};

// ─── Mentors Data ──────────────────────────────────────────────────────────
const mentorsList = [
  {
    name: "Đinh Trần Tuấn Linh",
    title: "Co-founder & CTO UNIKON",
    desc: "20 năm kinh nghiệm công nghệ, cố vấn giải pháp AI cho Samsung, Techcombank, OMO, Clear.",
    initials: "TL",
  },
  {
    name: "Phương Võ",
    title: "Business Technologist (Product - Data - AI)",
    desc: "Hơn 7 năm kinh nghiệm xây dựng sản phẩm và chuyển đổi số quy trình doanh nghiệp bằng AI.",
    initials: "PV",
  },
  {
    name: "Phạm Vân Anh",
    title: "Chuyên gia Tư duy Ngôn ngữ & AI Prompting",
    desc: "5 năm huấn luyện và triển khai giải pháp AI content, dịch thuật và xuất bản thực chiến.",
    initials: "VA",
  },
  {
    name: "Nguyễn Thị Hiếu (Hivi)",
    title: "Chuyên gia Tối ưu Quy trình Marketing AI",
    desc: "Tăng trưởng x3 năng suất sáng tạo nội dung & vận hành chiến dịch marketing tự động.",
    initials: "HV",
  },
  {
    name: "Đặng Trần Tài",
    title: "Chuyên gia Digital Marketing & AI Automation",
    desc: "Chứng chỉ Google Digital Marketing & E-commerce, chuyên gia tự động hóa workflow doanh nghiệp.",
    initials: "TT",
  },
  {
    name: "Phạm Việt Hương",
    title: "Chuyên gia Generative AI & Creative Media",
    desc: "Sản xuất hình ảnh, video AI cho các chiến dịch marketing thương hiệu lớn.",
    initials: "VH",
  }
];

// ─── Main Page Component ──────────────────────────────────────────────────
export default function ClubPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const qaImages = [
    '/ai-sme/images/qa/qa-1.jpg',
    '/ai-sme/images/qa/qa-2.jpg',
    '/ai-sme/images/qa/qa-3.jpg',
    '/ai-sme/images/qa/qa-4.jpg'
  ];

  const clubActivities = [
    {
      icon: <MessageSquare className="w-6 h-6 text-accent" />,
      title: "Gỡ Lỗi & Khám Bệnh AI 24/7",
      desc: "Chụp ảnh màn hình, gửi file prompt hoặc quy trình bị lỗi vào nhóm kín Zalo/Discord — Đội ngũ mentor và các anh em trong CLB trực tiếp bắt bệnh và sửa lỗi tức thì."
    },
    {
      icon: <Zap className="w-6 h-6 text-accent-pink" />,
      title: "Buổi Sinh Hoạt Chuyên Đề Định Kỳ",
      desc: "Mỗi tháng tổ chức 2-4 buổi Deep-dive thực chiến (online/offline): Hướng dẫn update tool mới nhất, phân tích case-study doanh nghiệp thật, live coding & prompt building."
    },
    {
      icon: <FileCode2 className="w-6 h-6 text-accent-2" />,
      title: "AI Vault – Thư Viện Tài Nguyên Độc Quyền",
      desc: "Kho lưu trữ Prompt đóng gói sẵn, Custom GPTs, Workflow mẫu (Make, n8n, Zapier, Dify) theo từng ngành nghề (Marketing, Sales, Nhân sự, Tài chính) tải về dùng ngay."
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "Mạng Lưới Kết Nối Doanh Chủ & Quản Lý",
      desc: "Không gian giao lưu, kết nối kinh doanh và hợp tác giá trị cao giữa các Founders, Giám đốc điều hành, Quản lý và các chuyên gia công nghệ hàng đầu."
    }
  ];

  const faqs = [
    {
      q: "CLB Cùng AI là gì và dành cho đối tượng nào?",
      a: "CLB Cùng AI là cộng đồng thực chiến dài hạn dành riêng cho Dân văn phòng, Quản lý, Chủ doanh nghiệp và Chuyên gia muốn liên tục cập nhật, ứng dụng và giải quyết các bài toán công việc hàng ngày bằng AI."
    },
    {
      q: "Tôi chưa rành công nghệ hoặc chưa học khóa Sống Cùng AI có tham gia được không?",
      a: "Hoàn toàn được! Các hoạt động trong CLB tập trung vào tư duy ứng dụng và quy trình thực tế (no-code), kèm hướng dẫn chi tiết từng bước. Bạn sẽ được hướng dẫn từ cơ bản và hỗ trợ gỡ lỗi tận tình."
    },
    {
      q: "Các buổi sinh hoạt CLB diễn ra vào thời gian nào?",
      a: "Các buổi sinh hoạt chuyên đề thường diễn ra vào các buổi tối trong tuần hoặc cuối tuần qua Zoom / Offline tại Hà Nội. Mọi buổi sinh hoạt đều có video recording, tài liệu và slide lưu trữ trong kho học viên."
    },
    {
      q: "Gặp khó khăn trong lúc áp dụng vào công việc tôi hỏi ai?",
      a: "Bạn gửi câu hỏi hoặc chụp màn hình lỗi vào nhóm kín Zalo CLB. Mentor và đội ngũ hỗ trợ túc trực phản hồi, giải đáp cặn kẽ giải pháp cho đến khi bạn chạy mượt mà."
    },
    {
      q: "Hình thức đóng hội phí và cam kết quyền lợi ra sao?",
      a: "Hội phí được đóng theo hình thức gói linh hoạt (Tháng / Quý / Năm). CLB cam kết hoàn tiền 100% trong vòng 7 ngày đầu nếu bạn cảm thấy nội dung sinh hoạt không mang lại giá trị thực tế."
    }
  ];

  return (
    <main className="relative min-h-screen bg-bg-deep text-text-soft font-sans overflow-x-hidden">
      <ClubHeader />

      {/* ─── 1. HERO SECTION ───────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1E1933] via-bg-deep to-bg-deep pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent/[0.04] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <Badge variant="pink" className="mb-6 py-1.5 px-4 text-xs font-bold tracking-wider uppercase">
              ✦ CỘNG ĐỒNG TINH HOA • CLB CÙNG AI
            </Badge>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-main max-w-5xl leading-tight">
              KHÔNG GIAN THỰC CHIẾN &amp; ĐỒNG HÀNH <br className="hidden sm:inline" />
              <span className="text-gradient">LÀM CHỦ AI HÀNG NGÀY</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-text-soft max-w-3xl leading-relaxed">
              Học xong không sợ quên – Làm việc không sợ bí. Nơi các quản lý, chuyên gia và doanh chủ cùng nhau giải quyết bài toán thực tế bằng AI, có chuyên gia gỡ lỗi trực tiếp 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full sm:w-auto py-4 px-8 text-base md:text-lg font-bold shadow-[0_8px_28px_rgba(139,92,246,0.35)]"
                onClick={() => window.open(TALLY_URL, '_blank', 'noopener,noreferrer')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                ĐĂNG KÝ GIA NHẬP CLB
              </Button>

              <a
                href="#dac-quyen"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 border border-white/15 hover:border-accent/40 bg-bg-1/80 hover:bg-bg-1 text-text-main px-7 py-3.5 text-base"
              >
                Khám phá đặc quyền
                <ChevronRight className="w-4 h-4 text-accent" />
              </a>
            </div>

            {/* Key highlights / Stats */}
            <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl">
              {[
                { number: "24/7", label: "Gỡ lỗi & Hỗ trợ kỹ thuật" },
                { number: "2 - 4", label: "Buổi Workshop / Tháng" },
                { number: "100+", label: "Workflows & Prompts mẫu" },
                { number: "100%", label: "Chuyên gia trực tiếp trả lời" }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-bg-1/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-card-border/80 text-center hover:border-accent/30 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-black text-gradient">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-text-soft font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. WHY JOIN SECTION (Problem vs Solution) ─────────────────────── */}
      <section id="ve-clb" className="py-20 md:py-28 bg-bg-1/60 border-t border-card-border relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <SectionTitle
            title="TẠI SAO BẠN CẦN CÓ CLB CÙNG AI ĐỒNG HÀNH?"
            subtitle="AI phát triển với tốc độ tính bằng ngày. Tự mày mò một mình vừa mất thời gian, vừa dễ nản lòng và đi sai hướng."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
            {/* Box: Tự mày mò một mình */}
            <div className="rounded-3xl p-6 sm:p-8 bg-bg-deep/90 border border-red-500/20 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 font-bold">
                  ✕
                </div>
                <h3 className="text-xl font-bold text-text-main">Tự Mày Mò AI Một Mình</h3>
              </div>

              <ul className="space-y-4 text-text-soft text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <span><strong>Ngợp trước biển công cụ:</strong> Mỗi ngày có hàng chục app AI mới, không biết công cụ nào thực sự hiệu quả cho công việc.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <span><strong>Prompt lỗi không ai sửa:</strong> Kết quả AI trả về ngớ ngẩn, loay hoay cả buổi không tìm ra điểm nghẽn.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <span><strong>Thiếu môi trường duy trì:</strong> Học xong khóa học nhưng không có người cùng thực hành, vài tuần sau lại quay về cách làm cũ.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <span><strong>Chi phí đắt đỏ:</strong> Mua subscription nhiều công cụ AI nhưng chỉ dùng 10% tính năng, gây lãng phí.</span>
                </li>
              </ul>
            </div>

            {/* Box: Sinh hoạt cùng CLB Cùng AI */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-bg-1 to-bg-deep border border-accent/30 shadow-[0_4px_30px_rgba(124,58,237,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-gradient">Sinh Hoạt Trong CLB Cùng AI</h3>
              </div>

              <ul className="space-y-4 text-text-soft text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span><strong>Được lọc tinh hoa:</strong> Chuyên gia chọn lọc sẵn các công cụ, update các mô hình mới nhất (DeepSeek, Claude 3.7, GPT-4.5) vào công việc thực tế.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span><strong>Bắt bệnh &amp; gỡ lỗi tức thì:</strong> Chụp màn hình gửi nhóm Zalo, chuyên gia chỉ đúng chỗ sai và đưa prompt sửa ngay.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span><strong>Học qua case-study thực tế:</strong> Mỗi tuần đều có buổi chia sẻ cách ứng dụng AI vào Tự động hóa, Marketing, Báo cáo, Quản trị.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span><strong>Dùng chung kho tài nguyên VIP:</strong> Tải miễn phí kho Prompt templates, Custom Agents, kịch bản Make/n8n trị giá hàng chục triệu.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. 4 PILLARS & PRIVILEGES ─────────────────────────────────────── */}
      <section id="dac-quyen" className="py-20 md:py-32 bg-bg-deep relative border-t border-card-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <SectionTitle
            title="4 TRỤ CỘT HOẠT ĐỘNG CỐT LÕI CỦA CLB"
            subtitle="Được thiết kế để bạn luôn dẫn đầu xu hướng AI mà không tốn hàng trăm giờ tự mò mẫm."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-14">
            {clubActivities.map((act, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full bg-bg-1/80 rounded-3xl p-6 sm:p-8 border border-card-border hover:border-accent/30 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-[0_4px_24px_rgba(124,58,237,0.08)]">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {act.icon}
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-accent transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-text-soft text-base leading-relaxed">
                      {act.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-accent">
                    <span>Đặc quyền độc quyền thành viên</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. REAL SUPPORT SHOWCASE ──────────────────────────────────────── */}
      <section id="hoat-dong" className="py-20 md:py-28 bg-bg-1/80 relative border-t border-card-border">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <SectionTitle
            title="BÍ ĐÂU HỎI ĐÓ – GỠ LỖI THỰC CHIẾN TỨC THÌ"
            subtitle="Hình ảnh thực tế học viên gửi câu hỏi &amp; được đội ngũ chuyên gia gỡ lỗi trong nhóm hỗ trợ hàng ngày."
          />

          {/* Sliding Showcase */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-accent/20 to-accent-pink/20 overflow-hidden shadow-2xl group mt-12 max-w-4xl mx-auto">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white rounded-full p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/15"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div className="bg-bg-1 rounded-[23px] overflow-hidden py-8">
              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {qaImages.map((imgSrc, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImg(imgSrc)}
                    className="snap-center relative flex-shrink-0 w-[280px] sm:w-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer hover:scale-[1.03] transition-transform duration-300 group/item"
                  >
                    <img 
                      src={imgSrc} 
                      alt="Minh chứng hỗ trợ CLB"
                      className="w-full h-auto object-contain block"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/35 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover/item:opacity-100 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/20">
                        🔍 Phóng to
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white rounded-full p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/15"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Modal lightbox */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImg} 
                  alt="Ảnh phóng to" 
                  className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── 5. MENTORS & ADVISORS ─────────────────────────────────────────── */}
      <section id="mentors" className="py-20 md:py-32 bg-bg-deep relative border-t border-card-border">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <SectionTitle
            title="ĐỘI NGŨ MENTOR &amp; CỐ VẤN ĐỒNG HÀNH"
            subtitle="Học hỏi và tương tác trực tiếp cùng các chuyên gia hàng đầu từ UNIKON &amp; SPIDERUM."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {mentorsList.map((mentor, index) => (
              <div 
                key={index}
                className="bg-bg-1 rounded-3xl p-6 border border-card-border hover:border-accent/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent font-bold text-lg group-hover:scale-105 transition-transform">
                      {mentor.initials}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-text-main group-hover:text-accent transition-colors">{mentor.name}</h4>
                      <p className="text-xs text-accent-pink font-semibold mt-0.5">{mentor.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-soft leading-relaxed">
                    {mentor.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Trực tiếp cố vấn sinh hoạt CLB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. MEMBERSHIP & PRICING ───────────────────────────────────────── */}
      <section id="bieu-phi" className="py-20 md:py-32 bg-bg-1/70 relative border-t border-card-border">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionTitle
            title="GIA NHẬP CLB CÙNG AI HÔM NAY"
            subtitle="Chọn gói thành viên phù hợp để bắt đầu hành trình làm chủ AI liên tục cùng chuyên gia."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
            {/* Standard Member */}
            <div className="bg-bg-deep rounded-3xl p-8 border border-card-border flex flex-col justify-between relative">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  GÓI HỘI VIÊN TIÊU CHUẨN
                </span>
                <div className="mt-6 mb-2">
                  <span className="text-3xl sm:text-4xl font-black text-text-main">590.000đ</span>
                  <span className="text-text-muted text-sm ml-2">/ 3 tháng</span>
                </div>
                <p className="text-sm text-text-soft mb-6">
                  Dành cho người muốn có môi trường giải đáp thắc mắc và cập nhật xu hướng AI đều đặn.
                </p>

                <ul className="space-y-3.5 text-sm text-text-soft">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Tham gia nhóm kín Zalo gỡ lỗi &amp; hỏi đáp cùng chuyên gia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Tham gia các buổi sinh hoạt chuyên đề online định kỳ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Truy cập kho tài nguyên Prompt &amp; Workflow cơ bản</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Xem lại toàn bộ video recording các buổi sinh hoạt</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                className="w-full mt-8 py-3.5 text-sm font-bold"
                onClick={() => window.open(TALLY_URL, '_blank', 'noopener,noreferrer')}
              >
                Đăng ký Hội viên 3 tháng
              </Button>
            </div>

            {/* VIP Member - Highlighted */}
            <div className="bg-bg-deep rounded-3xl p-8 border-2 border-accent relative shadow-[0_8px_36px_rgba(124,58,237,0.18)] flex flex-col justify-between">
              {/* Badge best value */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-accent to-accent-pink text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                ★ KHUYÊN DÙNG • TIẾT KIỆM 40%
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent px-3 py-1 bg-accent/15 rounded-full border border-accent/25">
                  GÓI HỘI VIÊN VIP 1 NĂM
                </span>
                <div className="mt-6 mb-2">
                  <span className="text-3xl sm:text-4xl font-black text-gradient">1.490.000đ</span>
                  <span className="text-text-muted text-sm ml-2">/ 12 tháng</span>
                </div>
                <p className="text-sm text-text-soft mb-6">
                  Đồng hành trọn vẹn 1 năm, đặc quyền ưu tiên hỗ trợ 1-1 và tặng vé các workshop lớn.
                </p>

                <ul className="space-y-3.5 text-sm text-text-soft">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
                    <span><strong>Toàn bộ quyền lợi của Gói Tiêu Chuẩn trong 12 tháng</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
                    <span><strong>Ưu tiên khám bệnh &amp; sửa prompt 1-1</strong> trực tiếp cùng Mentor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
                    <span><strong>Full quyền truy cập AI Vault VIP:</strong> Kho 100+ prompt chuẩn hóa &amp; blueprints n8n/Make</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
                    <span><strong>Tặng vé mời tham gia miễn phí</strong> 2 Workshop chuyên sâu tiếp theo của Sống Cùng AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
                    <span>Ưu tiên tham gia các buổi Offline Networking kín</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="primary"
                className="w-full mt-8 py-3.5 text-base font-bold shadow-[0_6px_20px_rgba(124,58,237,0.3)]"
                onClick={() => window.open(TALLY_URL, '_blank', 'noopener,noreferrer')}
              >
                Gia nhập Hội viên VIP 1 Năm
              </Button>
            </div>
          </div>

          {/* Student Special Notice */}
          <div className="mt-8 bg-accent/10 border border-accent/20 rounded-2xl p-5 text-center text-sm text-text-soft">
            🎓 <strong>Đặc quyền dành riêng cho Học viên Workshop &quot;Sống Cùng AI&quot;:</strong> Bạn đã được tặng sẵn 1 năm sinh hoạt CLB miễn phí đi kèm theo khóa học!
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ SECTION ────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28 bg-bg-deep relative border-t border-card-border">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle
            title="CÂU HỎI THƯỜNG GẶP VỀ CLB"
            subtitle="Giải đáp các thắc mắc phổ biến nhất khi tham gia cộng đồng CLB Cùng AI."
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-all duration-300",
                    isOpen
                      ? "bg-bg-1 border-accent/35 shadow-[0_4px_20px_rgba(124,58,237,0.08)]"
                      : "bg-bg-1/50 border-card-border hover:border-accent/20"
                  )}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-text-main pr-6">{faq.q}</span>
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                      isOpen ? "bg-accent text-white" : "bg-bg-2 text-text-soft"
                    )}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-text-soft text-sm sm:text-base leading-relaxed border-t border-white/5 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 8. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-bg-1/90 to-bg-deep relative overflow-hidden border-t border-card-border">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[350px] bg-accent/[0.02] rounded-full blur-[180px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10 text-center">
          <Badge variant="pink" className="mb-6">SỐNG CÙNG AI • ĐỒNG HÀNH DÀI LÂU</Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main uppercase tracking-tight">
            ĐỪNG ĐỂ MÌNH ĐƠN ĐỘC <br />
            <span className="text-gradient">TRÊN HÀNH TRÌNH CHINH PHỤC AI</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-text-soft max-w-2xl mx-auto leading-relaxed">
            Gia nhập CLB Cùng AI ngay hôm nay để nhận quyền truy cập nhóm Zalo gỡ lỗi, tham gia các buổi sinh hoạt chuyên sâu và sở hữu kho tài nguyên AI Vault giá trị.
          </p>

          <div className="mt-8">
            <Button
              variant="primary"
              className="py-4 px-10 text-lg font-bold shadow-[0_8px_30px_rgba(124,58,237,0.4)]"
              onClick={() => window.open(TALLY_URL, '_blank', 'noopener,noreferrer')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              ĐĂNG KÝ THAM GIA CLB NGAY
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
