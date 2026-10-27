import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession, SESSION_COOKIE_NAME } from '@/lib/adminAuth';
import { getAllRegistrations } from '@/lib/registrationStore';

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return validateSession(token);
}

// GET: Export all registrations as CSV
export async function GET() {
  try {
    const isAuthed = await requireAuth();
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const registrations = getAllRegistrations();

    // Build CSV with BOM for Excel compatibility
    const BOM = '\uFEFF';
    const headers = [
      'ID',
      'Họ và Tên',
      'Số điện thoại',
      'Email',
      'Hình thức',
      'Loại đăng ký',
      'Trạng thái thanh toán',
      'Ghi chú',
      'Ngày đăng ký',
      'Cập nhật lần cuối',
    ];

    const rows = registrations.map(r => [
      r.id,
      escapeCsvField(r.name),
      r.phone,
      r.email,
      r.format === 'online' ? 'Online' : 'Offline',
      r.registrationType === 'individual' ? 'Cá nhân' : 'Nhóm 3 người',
      r.paymentStatus === 'paid' ? 'Đã thanh toán' : r.paymentStatus === 'cancelled' ? 'Đã hủy' : 'Chờ thanh toán',
      escapeCsvField(r.notes),
      formatDate(r.createdAt),
      formatDate(r.updatedAt),
    ]);

    const csvContent = BOM + [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const filename = `registrations_${new Date().toISOString().split('T')[0]}.csv`;

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Export error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, message: 'Lỗi server.' },
      { status: 500 }
    );
  }
}

function escapeCsvField(field: string): string {
  if (!field) return '""';
  // If field contains comma, quote, or newline, wrap in quotes and escape existing quotes
  if (field.includes(',') || field.includes('"') || field.includes('\n') || field.includes('\r')) {
    return '"' + field.replace(/"/g, '""') + '"';
  }
  return field;
}

function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  } catch {
    return isoString;
  }
}
