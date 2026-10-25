import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export type DatabaseStatus = 'connected' | 'disconnected' | 'not-configured';

let dbStatus: DatabaseStatus = 'not-configured';

export function getDatabaseStatus(): DatabaseStatus {
  return dbStatus;
}

export async function connectDatabase(): Promise<void> {
  const uri = env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    dbStatus = 'not-configured';
    logger.warn('MONGODB_URI is not configured. Running in limited local development mode without persistent database storage.');
    return;
  }

  try {
    logger.info('Attempting connection to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    dbStatus = 'connected';
    logger.info('Successfully connected to MongoDB database.');

    mongoose.connection.on('disconnected', () => {
      dbStatus = 'disconnected';
      logger.warn('MongoDB connection lost. Status is now disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
      dbStatus = 'connected';
      logger.info('MongoDB connection re-established.');
    });
  } catch (error) {
    dbStatus = 'disconnected';
    logger.error('Failed to connect to MongoDB Atlas. Running in disconnected fallback mode.', error);
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (dbStatus === 'connected') {
    await mongoose.disconnect();
    dbStatus = 'disconnected';
    logger.info('MongoDB disconnected.');
  }
}
