import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { logger } from './utils/logger.js';

async function bootstrap() {
  logger.info('Initializing TravelMitra Server...');

  // Connect to MongoDB (or fall back gracefully to local dev mode if unconfigured)
  await connectDatabase();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(`TravelMitra API server listening on http://localhost:${env.PORT}`);
    logger.info(`Health check available at http://localhost:${env.PORT}/api/v1/health`);
    logger.info(`Allowing CORS from frontend: ${env.FRONTEND_URL}`);
  });

  // Graceful shutdown handling
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Gracefully shutting down TravelMitra server...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDatabase();
      process.exit(0);
    });

    // Force shutdown after timeout if pending connections don't drain
    setTimeout(() => {
      logger.error('Forcing server shutdown due to timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch(err => {
  logger.error('Fatal startup error in bootstrap():', err);
  process.exit(1);
});
