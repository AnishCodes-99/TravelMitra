import { Router, Request, Response } from 'express';
import { env } from '../config/env.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

router.get('/status', (_req: Request, res: Response) => {
  const isFirebaseAdminConfigured = Boolean(
    env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY
  );

  res.json({
    service: 'authentication-gateway',
    isFirebaseAdminConfigured,
    message: isFirebaseAdminConfigured
      ? 'Firebase Admin is configured for server-side token verification.'
      : 'Firebase Admin credentials not set. Token verification is disabled in local development mode.',
  });
});

// Protected profile verification test endpoint (requires valid Firebase ID token)
router.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
