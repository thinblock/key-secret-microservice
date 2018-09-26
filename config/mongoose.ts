import * as mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { config } from './env';
import * as list from '../config/exchanges';
import Exchange from '../app/models/exchange.model';
import { forEachSeries } from 'async';

async function initDb() {
  const options: mongoose.ConnectionOptions = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true
  };
  try {
    await mongoose.connect(config().db, options);
    forEachSeries((list.exchanges), async (eachExchange) => {
      await Exchange.findOneAndUpdate(
        { exchangeId: eachExchange.exchangeId },
        { exchangeId: eachExchange.exchangeId, name: eachExchange.name },
        { upsert: true }
      );
    });
    logger.info('DB Connected');
  } catch (e) {
    logger.error('Unable to connect to the database:', e);
  }
}

initDb();