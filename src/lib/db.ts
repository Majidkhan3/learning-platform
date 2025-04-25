import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://Matthieu63:sitejs63@cluster0.bogttlb.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0' as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local');
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: CachedConnection;
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }).then(mongoose => mongoose);
    
    // In development, set global for HMR (Hot Module Replacement)
    if (process.env.NODE_ENV === 'development') {
      global.mongoose = cached;
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;