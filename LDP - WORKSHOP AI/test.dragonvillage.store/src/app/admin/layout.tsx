import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Sống cùng AI',
  description: 'Quản lý đăng ký workshop',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        /* Hide desktop table, show mobile cards on small screens */
        @media (max-width: 768px) {
          .admin-page table {
            display: none !important;
          }
          .admin-page [data-mobile-cards] {
            display: block !important;
          }
        }
      `}</style>
      <div className="admin-page">
        {children}
      </div>
    </>
  );
}
