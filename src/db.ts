import logger from './core/utils/logger';
import config from './config/config';
import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    logger.info('Connected to database');
  } catch (err) {
    logger.error('Could not connect to database');
    throw new Error(err.message);
  }
};

export default connect;
