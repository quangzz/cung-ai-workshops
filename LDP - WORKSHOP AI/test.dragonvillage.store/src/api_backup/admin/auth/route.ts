import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyPassword,
  createSession,
  destroySession,
  validateSession,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/adminAuth';

// TODO(security): Implement rate limiting for login attempts

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body.password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu không hợp lệ.' },
        { status: 400 }
      );
    }

    const isValid = verifyPassword(body.password);

    if (!isValid) {
      // Generic error message to prevent enumeration
      return NextResponse.json(
        { success: false, message: 'Mật khẩu không đúng.' },
        { status: 401 }
      );
    }

    const token = createSession();

    const response = NextResponse.json({ success: true });

    // Set HttpOnly, Secure, SameSite cookie
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, message: 'Lỗi server.' },
      { status: 500 }
    );
  }
}

// DELETE to logout
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      destroySession(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  } catch (error) {
    console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, message: 'Lỗi server.' },
      { status: 500 }
    );
  }
}

// GET to check session status
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const isValid = validateSession(token);

    return NextResponse.json({ authenticated: isValid });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
