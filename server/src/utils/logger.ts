/**
 * TravelMitra Server Logger
 * Provides safe, structured logging without leaking sensitive credentials,
 * tokens, passwords, or Authorization headers.
 */

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'authorization',
  'refreshtoken',
  'secret',
  'apikey',
  'privatekey',
  'clientsecret',
  'razorpay_key_secret',
  'cookie',
]);

export function sanitize(data: unknown): unknown {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      clean[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      clean[key] = sanitize(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

export const logger = {
  info: (msg: string, meta?: unknown) => {
    const timestamp = new Date().toISOString();
    if (meta) {
      console.info(`[${timestamp}] [INFO] ${msg}`, JSON.stringify(sanitize(meta)));
    } else {
      console.info(`[${timestamp}] [INFO] ${msg}`);
    }
  },
  warn: (msg: string, meta?: unknown) => {
    const timestamp = new Date().toISOString();
    if (meta) {
      console.warn(`[${timestamp}] [WARN] ${msg}`, JSON.stringify(sanitize(meta)));
    } else {
      console.warn(`[${timestamp}] [WARN] ${msg}`);
    }
  },
  error: (msg: string, meta?: unknown) => {
    const timestamp = new Date().toISOString();
    if (meta) {
      console.error(`[${timestamp}] [ERROR] ${msg}`, JSON.stringify(sanitize(meta)));
    } else {
      console.error(`[${timestamp}] [ERROR] ${msg}`);
    }
  },
};
