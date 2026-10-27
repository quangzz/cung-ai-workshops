import { NextResponse } from 'next/server';
import { addRegistration } from '@/lib/registrationStore';
import { syncToGoogleSheet } from '@/lib/googleSheetSync';

// TODO(security): Implement rate limiting to prevent abuse
// TODO(security): Add CSRF token validation if using cookie-based auth
// TODO(security): Implement email verification before confirming registration

interface RegistrationData {
  name: string;
  phone: string;
  email: string;
  format: string;
  registrationType: string;
}

function validateRegistration(data: unknown): { valid: boolean; errors: string[]; sanitized?: RegistrationData } {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid request body'] };
  }

  const body = data as Record<string, unknown>;

  // Validate name
  if (typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push('Vui lòng nhập họ tên.');
  } else if (body.name.trim().length > 200) {
    errors.push('Họ tên quá dài.');
  }

  // Validate phone - digits only, 10-11 chars
  if (typeof body.phone !== 'string' || body.phone.trim().length === 0) {
    errors.push('Vui lòng nhập số điện thoại.');
  } else if (!/^[0-9]{10,11}$/.test(body.phone.replace(/\s/g, ''))) {
    errors.push('Số điện thoại không hợp lệ.');
  }

  // Validate email
  if (typeof body.email !== 'string' || body.email.trim().length === 0) {
    errors.push('Vui lòng nhập email.');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.email.length > 254) {
    errors.push('Email không hợp lệ.');
  }

  // Validate format
  const allowedFormats = ['online', 'offline'];
  if (typeof body.format !== 'string' || !allowedFormats.includes(body.format)) {
    errors.push('Hình thức học không hợp lệ.');
  }

  // Validate registrationType
  const allowedTypes = ['individual', 'group'];
  if (typeof body.registrationType !== 'string' || !allowedTypes.includes(body.registrationType)) {
    errors.push('Loại đăng ký không hợp lệ.');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      name: (body.name as string).trim(),
      phone: (body.phone as string).replace(/\s/g, ''),
      email: (body.email as string).trim().toLowerCase(),
      format: body.format as string,
      registrationType: body.registrationType as string,
    }
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = validateRegistration(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: 'Dữ liệu không hợp lệ', errors: validation.errors },
        { status: 400 }
      );
    }

    // Save to data store
    const registration = addRegistration(validation.sanitized!);

    // Sync to Google Sheet (fire-and-forget, does not block response)
    void syncToGoogleSheet(validation.sanitized!);

    // Log registration event (PII redacted in logs)
    console.log('New registration saved:', registration.id, 'at', registration.createdAt);

    return NextResponse.json({ success: true, message: 'Đăng ký thành công' });
  } catch (error) {
    console.error('Registration error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, message: 'Lỗi server, vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
