import { initMongoConnection } from '../db/initMongoConnection.js';
import { setupServer } from '../server.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TIMER = {
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
};

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
