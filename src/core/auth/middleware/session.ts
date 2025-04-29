import session from 'express-session';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import ms, { type StringValue } from 'ms';

export const configureSession = () => {
  // You can change these settings as needed
  const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
  });
  redisClient.connect().catch(console.error);

  // Test the redis client
  redisClient.set('test', 'test', { EX: 10 });

  // Initialize store.
  let redisStore = new RedisStore({
    client: redisClient,
  });

  return session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || 'supersecret', // load from .env in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS
      httpOnly: true,
      maxAge: ms(process.env.SESSION_EXPIRATION_TIME as StringValue || '1d'),
    },
  });
};
