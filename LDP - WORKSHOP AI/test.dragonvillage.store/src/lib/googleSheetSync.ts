// TODO(security): The webhook URL should be kept server-side only (never exposed to client).
// This module runs exclusively on the server (imported only by API routes).

interface RegistrationPayload {
  name: string;
  phone: string;
  email: string;
  format: string;
  registrationType: string;
}

/**
 * Sends registration data to a Google Sheet via Apps Script Webhook.
 * This is fire-and-forget: errors are logged but never thrown,
 * so the main registration flow is never blocked.
 */
export async function syncToGoogleSheet(data: RegistrationPayload): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[GoogleSheet Sync] GOOGLE_SHEET_WEBHOOK_URL is not set. Skipping sync.');
    return;
  }

  // TODO(security): Validate that the URL points to a trusted Google Apps Script domain
  try {
    const url = new URL(webhookUrl);
    const allowedHosts = ['script.google.com', 'script.googleusercontent.com'];
    if (!allowedHosts.some(host => url.hostname === host || url.hostname.endsWith('.' + host))) {
      console.error('[GoogleSheet Sync] Webhook URL is not a trusted Google Apps Script domain. Skipping.');
      return;
    }
  } catch {
    console.error('[GoogleSheet Sync] Invalid webhook URL format. Skipping.');
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        format: data.format,
        registrationType: data.registrationType,
      }),
      signal: controller.signal,
      redirect: 'follow', // Google Apps Script redirects on POST
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      console.log('[GoogleSheet Sync] Data synced successfully.');
    } else {
      console.error('[GoogleSheet Sync] Server responded with status:', response.status);
    }
  } catch (error) {
    // Log error but never throw - this must not affect the registration flow
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[GoogleSheet Sync] Request timed out after 10s.');
    } else {
      console.error('[GoogleSheet Sync] Failed to sync:', error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
