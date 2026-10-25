import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    emailVerified?: boolean;
    name?: string;
  };
}

/**
 * Authentication Middleware Scaffold for Firebase ID Token Verification.
 * Enforces server-side identity verification via Authorization header.
 * Rejects frontend-supplied user IDs as proof of identity.
 */
export async function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new AppError(
        'Missing or malformed Authorization header. Expected format: Bearer <firebase_id_token>',
        401
      )
    );
  }

  const token = authHeader.split('Bearer ')[1]?.trim();
  if (!token) {
    return next(new AppError('Unauthorized: Token not provided.', 401));
  }

  // Check if Firebase Admin credentials are configured
  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
    logger.warn('Firebase Admin credentials not configured on server. Token verification requires server service account setup.');
    return next(
      new AppError(
        'Firebase Admin authentication service is not configured on the server. Please configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in server/.env.',
        503
      )
    );
  }

  // Token verification with Firebase Admin SDK will execute in Phase 2
  // Simulated placeholder check prevents unverified access
  return next(
    new AppError(
      'Live token verification will be activated once Firebase Admin credentials are initialized.',
      501
    )
  );
}
