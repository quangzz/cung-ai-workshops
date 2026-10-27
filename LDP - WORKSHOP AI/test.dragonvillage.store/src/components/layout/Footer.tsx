import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer
      className="mt-20 bg-bg-1 border-t border-card-border"
      role="contentinfo"
    >
      {/* Top: Logo */}
      <div className="flex justify-center pt-8 pb-6">
        <Image
          src="/logo-unikon-white.png"
          alt="Unikon Logo"
          width={180}
          height={48}
          className="object-contain h-10 md:h-12 w-auto"
        />
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="border-t border-card-border" />
      </div>

      {/* Main content: 3 columns */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left column: Company info + DMCA */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p className="text-xs leading-relaxed text-text-muted">
              CÔNG TY TNHH MTV NAP COLLECTIVE
              <br />
              ĐKKD SỐ: 0111438945 ĐƯỢC PHÒNG ĐKKD VÀ TÀI CHÍNH DOANH NGHIỆP SỞ TÀI CHÍNH TP. HÀ NỘI CẤP NGÀY 31/03/2026
            </p>
            {/* DMCA Badge */}
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center gap-2 px-3 py-2 rounded-md glass-card">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
                    fill="#A78BFA"
                  />
                  <path
                    d="M10 12l2 2 4-4"
                    stroke="#1A1829"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wide text-accent">
                  DMCA Protected
                </span>
              </div>
            </div>
          </div>

          {/* Middle column: Support links */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-base font-bold mb-1 text-text-main">
              Hỗ trợ khách hàng
            </h3>
            <nav
              aria-label="Footer support links"
              className="flex flex-col gap-2"
            >
              <Link
                href="https://shop.spiderum.com/pages/chinh-sach-bao-mat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="https://shop.spiderum.com/pages/chinh-sach-giao-nhan-san-pham"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                Chính sách giao nhận
              </Link>
              <Link
                href="https://shop.spiderum.com/pages/chinh-sach-thanh-toan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                Chính sách thanh toán
              </Link>
              <Link
                href="https://shop.spiderum.com/pages/dieu-khoan-dich-vu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                Điều khoản dịch vụ chung
              </Link>
            </nav>
          </div>

          {/* Right column: Contact info */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-sm font-bold text-text-main">
              © Copyright 2026
            </p>
            <p className="text-sm text-text-muted">
              Điện thoại: 0961.946.810
            </p>

            <p className="text-sm text-text-muted">
              Địa chỉ: Số 12A3, Phố Lý Nam Đế, Phường Hoàn Kiếm, Thành phố Hà Nội
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
