import crypto from 'crypto';

// TODO(security): Implement rate limiting for auth attempts
// TODO(security): Consider using OAuth/OpenID Connect for production
// TODO(security): Consider MFA for additional security
// TODO(security): Implement leaked password detection

// In-memory session store. Sessions are lost on server restart.
// For production, consider using a proper session store (Redis, database).
const sessions = new Map<string, { expiresAt: number }>();

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    // In development/limited sandbox, generate ephemeral password and log warning
    console.warn(
      'ADMIN_PASSWORD environment variable is not set. ' +
      'Using ephemeral generated password. This is NOT suitable for production!'
    );
    // Generate a stable-per-process ephemeral password
    if (!(globalThis as Record<string, unknown>).__ephemeralAdminPassword) {
      (globalThis as Record<string, unknown>).__ephemeralAdminPassword = crypto.randomBytes(16).toString('hex');
      console.warn('Ephemeral admin password:', (globalThis as Record<string, unknown>).__ephemeralAdminPassword);
    }
    return (globalThis as Record<string, unknown>).__ephemeralAdminPassword as string;
  }
  return password;
}

export function verifyPassword(inputPassword: string): boolean {
  if (!inputPassword || typeof inputPassword !== 'string') {
    return false;
  }
  
  const adminPassword = getAdminPassword();
  
  // Constant-time comparison to prevent timing attacks
  if (inputPassword.length !== adminPassword.length) {
    // Still do a comparison to maintain constant time behavior
    crypto.timingSafeEqual(
      Buffer.from(inputPassword.padEnd(adminPassword.length, '\0')),
      Buffer.from(adminPassword)
    );
    return false;
  }
  
  return crypto.timingSafeEqual(
    Buffer.from(inputPassword),
    Buffer.from(adminPassword)
  );
}

export function createSession(): string {
  // Clean up expired sessions
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (session.expiresAt < now) {
      sessions.delete(token);
    }
  }
  
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    expiresAt: now + SESSION_MAX_AGE_MS,
  });
  
  return token;
}

export function validateSession(token: string | undefined): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  const session = sessions.get(token);
  if (!session) {
    return false;
  }
  
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return false;
  }
  
  return true;
}

export function destroySession(token: string): void {
  if (token && typeof token === 'string') {
    sessions.delete(token);
  }
}

export function getSessionCookieOptions(): string {
  const maxAge = Math.floor(SESSION_MAX_AGE_MS / 1000);
  // HttpOnly, Secure, SameSite=Lax for CSRF protection
  return `admin_session={TOKEN}; HttpOnly; Secure; SameSite=Lax; Path=/api/admin; Max-Age=${maxAge}`;
}

export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_MAX_AGE_MS / 1000);
