import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// TODO(security): Consider migrating to a proper database (PostgreSQL/MongoDB) for production scale
// TODO(security): Implement file-level locking for multi-process environments

export interface Registration {
  id: string;
  name: string;
  phone: string;
  email: string;
  format: string;
  registrationType: string;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface RegistrationStore {
  registrations: Registration[];
}

// Resolve data directory relative to project root, not inside src/
// Using path.resolve with process.cwd() to get project root
function getDataDir(): string {
  const dataDir = path.resolve(process.cwd(), 'data');
  return dataDir;
}

function getDataFilePath(): string {
  const filePath = path.join(getDataDir(), 'registrations.json');
  // Security: validate the resolved path is within the expected data directory
  const resolvedPath = path.resolve(filePath);
  const resolvedDataDir = path.resolve(getDataDir());
  if (!resolvedPath.startsWith(resolvedDataDir + path.sep) && resolvedPath !== resolvedDataDir) {
    throw new Error('Invalid data file path');
  }
  return resolvedPath;
}

function ensureDataDir(): void {
  const dataDir = getDataDir();
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readStore(): RegistrationStore {
  const filePath = getDataFilePath();
  if (!fs.existsSync(filePath)) {
    return { registrations: [] };
  }
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(rawData);
    if (!parsed || !Array.isArray(parsed.registrations)) {
      return { registrations: [] };
    }
    return parsed as RegistrationStore;
  } catch {
    // If file is corrupted, start fresh but backup the old one
    const backupPath = filePath + '.backup.' + Date.now();
    try {
      fs.copyFileSync(filePath, backupPath);
    } catch {
      // Ignore backup errors
    }
    return { registrations: [] };
  }
}

function writeStore(store: RegistrationStore): void {
  ensureDataDir();
  const filePath = getDataFilePath();
  // Atomic write: write to temp file then rename
  const tempPath = filePath + '.tmp.' + crypto.randomBytes(8).toString('hex');
  fs.writeFileSync(tempPath, JSON.stringify(store, null, 2), 'utf-8');
  fs.renameSync(tempPath, filePath);
}

export function addRegistration(data: {
  name: string;
  phone: string;
  email: string;
  format: string;
  registrationType: string;
}): Registration {
  const store = readStore();
  
  const registration: Registration = {
    id: crypto.randomUUID(),
    name: data.name,
    phone: data.phone,
    email: data.email,
    format: data.format,
    registrationType: data.registrationType,
    paymentStatus: 'pending',
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.registrations.push(registration);
  writeStore(store);
  
  return registration;
}

export function getAllRegistrations(): Registration[] {
  const store = readStore();
  // Return newest first
  return store.registrations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateRegistration(
  id: string,
  updates: { paymentStatus?: 'pending' | 'paid' | 'cancelled'; notes?: string }
): Registration | null {
  // Validate id format (UUID)
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }

  const store = readStore();
  const index = store.registrations.findIndex(r => r.id === id);
  
  if (index === -1) return null;
  
  if (updates.paymentStatus) {
    store.registrations[index].paymentStatus = updates.paymentStatus;
  }
  if (updates.notes !== undefined) {
    // Limit notes to 1000 chars
    store.registrations[index].notes = updates.notes.slice(0, 1000);
  }
  store.registrations[index].updatedAt = new Date().toISOString();
  
  writeStore(store);
  return store.registrations[index];
}

export function getStats(): {
  total: number;
  paid: number;
  pending: number;
  cancelled: number;
  totalRevenue: number;
  individualCount: number;
  groupCount: number;
  onlineCount: number;
  offlineCount: number;
} {
  const registrations = getAllRegistrations();
  
  const paid = registrations.filter(r => r.paymentStatus === 'paid');
  const pending = registrations.filter(r => r.paymentStatus === 'pending');
  const cancelled = registrations.filter(r => r.paymentStatus === 'cancelled');
  
  // Calculate revenue from paid registrations
  let totalRevenue = 0;
  for (const r of paid) {
    if (r.registrationType === 'individual') {
      totalRevenue += 3600000;
    } else if (r.registrationType === 'group') {
      totalRevenue += 9600000;
    }
  }
  
  return {
    total: registrations.length,
    paid: paid.length,
    pending: pending.length,
    cancelled: cancelled.length,
    totalRevenue,
    individualCount: registrations.filter(r => r.registrationType === 'individual').length,
    groupCount: registrations.filter(r => r.registrationType === 'group').length,
    onlineCount: registrations.filter(r => r.format === 'online').length,
    offlineCount: registrations.filter(r => r.format === 'offline').length,
  };
}
