import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://cungai.vn"),
  title: "Sống cùng AI | Workshop làm chủ AI – Tăng năng suất tới 80%",
  description: "Làm chủ AI – Tự động hóa công việc, tăng năng suất tới 80%. Chuỗi workshop thực chiến 7 buổi dành riêng cho Dân văn phòng, Quản lý & Chuyên gia. Đồng hành cùng các chuyên gia ứng dụng AI hàng đầu Việt Nam.",
  openGraph: {
    title: "Sống cùng AI | Workshop làm chủ AI – Tăng năng suất tới 80%",
    description: "Làm chủ AI – Tự động hóa công việc, tăng năng suất tới 80%. Chuỗi workshop thực chiến 7 buổi.",
    images: ["/og-image-placeholder.png"],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '4415567205425700');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4415567205425700&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased bg-bg-deep text-text-soft text-base">
        {children}
      </body>
    </html>
  );
}
