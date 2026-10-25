import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root or current directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(val => parseInt(val, 10)).default('5000'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  MONGODB_URI: z.string().optional().default(''),
  // Firebase Admin
  FIREBASE_PROJECT_ID: z.string().optional().default(''),
  FIREBASE_CLIENT_EMAIL: z.string().optional().default(''),
  FIREBASE_PRIVATE_KEY: z.string().optional().default(''),
  // Razorpay
  RAZORPAY_KEY_ID: z.string().optional().default(''),
  RAZORPAY_KEY_SECRET: z.string().optional().default(''),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional().default(''),
  // Amadeus
  AMADEUS_CLIENT_ID: z.string().optional().default(''),
  AMADEUS_CLIENT_SECRET: z.string().optional().default(''),
  AMADEUS_BASE_URL: z.string().default('https://test.api.amadeus.com'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error('Invalid server environment configuration:', parsedEnv.error.format());
  throw new Error('Server environment configuration validation failed.');
}

export const env = parsedEnv.data;
