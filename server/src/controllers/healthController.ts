import { Request, Response } from 'express';
import { getDatabaseStatus } from '../config/db.js';

export function getHealth(_req: Request, res: Response): void {
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    status: 'ok',
    service: 'travelmitra-api',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
  });
}
