import mongoose from 'mongoose';
import '../models/handler.models.js';

const database = async (): Promise<void> => {
  let timeout: number = 5000;

  if (process.env.NODE_ENV === 'production') {
    timeout = 40000;
  }
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_DB}`,
      {
        serverSelectionTimeoutMS: timeout,
      },
    );

    if (connectionInstance.connection.readyState !== 1) {
      throw new Error('Database connection was initiated but is not ready');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
};

export default database;
