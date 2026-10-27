import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession, SESSION_COOKIE_NAME } from '@/lib/adminAuth';
import { getAllRegistrations, updateRegistration, getStats } from '@/lib/registrationStore';

// TODO(security): Rate limit API endpoints

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return validateSession(token);
}

// GET: Fetch all registrations + stats
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
    const stats = getStats();

    return NextResponse.json({
      success: true,
      registrations,
      stats,
    });
  } catch (error) {
    console.error('Admin registrations GET error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, message: 'Lỗi server.' },
      { status: 500 }
    );
  }
}

// PUT: Update a registration (payment status, notes)
export async function PUT(request: Request) {
  try {
    const isAuthed = await requireAuth();
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body || typeof body.id !== 'string') {
      return NextResponse.json(
        { success: false, message: 'ID không hợp lệ.' },
        { status: 400 }
      );
    }

    // Validate paymentStatus if provided
    const validStatuses = ['pending', 'paid', 'cancelled'];
    if (body.paymentStatus && !validStatuses.includes(body.paymentStatus)) {
      return NextResponse.json(
        { success: false, message: 'Trạng thái thanh toán không hợp lệ.' },
        { status: 400 }
      );
    }

    // Validate notes if provided
    if (body.notes !== undefined && typeof body.notes !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Ghi chú không hợp lệ.' },
        { status: 400 }
      );
    }

    const updated = updateRegistration(body.id, {
      paymentStatus: body.paymentStatus,
      notes: body.notes,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy đăng ký.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, registration: updated });
  } catch (error) {
    console.error('Admin registrations PUT error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, message: 'Lỗi server.' },
      { status: 500 }
    );
  }
}
