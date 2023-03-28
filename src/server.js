// eslint-disable-next-line import/no-unresolved
import chalk from 'chalk';
import stoppable from 'stoppable';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import app from './app.js';
import { gracefulShutdown } from './utils/graceful-shutdown.js';
import { Logger } from './config/logger.js';

const logger = Logger(fileURLToPath(import.meta.url));

const port = process.env.APP_PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`App running on port ${chalk.greenBright(port)}...`);
});

// In case of an error
app.on('error', (appErr, appCtx) => {
  logger.error(`App Error: '${appErr.stack}' on url: '${appCtx.req.url}' with headers: '${appCtx.req.headers}'`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async err => {
  logger.error(chalk.bgRed('UNHANDLED REJECTION! 💥 Shutting down...'));
  logger.error(err.name, err.message);

  await gracefulShutdown(stoppable(server));
});

// Handle uncaught exceptions
process.on('uncaughtException', async uncaughtExc => {
  // Won't execute
  logger.error(chalk.bgRed('UNCAUGHT EXCEPTION! 💥 Shutting down...'));
  logger.error(`UncaughtException Error: ${uncaughtExc}`);
  logger.error(`UncaughtException Stack: ${JSON.stringify(uncaughtExc.stack)}`);

  await gracefulShutdown(stoppable(server));
});

// Graceful shutdown on SIGINT and SIGTERM signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    logger.warn(`Received ${signal} signal. Shutting down...`);
    await gracefulShutdown(server);
  });
});

export default server;
