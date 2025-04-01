import jwt from 'jsonwebtoken';
import ms, { StringValue } from 'ms';

// Generate JWT Token
export const generateToken = (userId: string): string => {
    // Get the JWT_SECRET and JWT_EXPIRATION_TIME
    const JWT_SECRET = getJWTSecret();
    const JWT_EXPIRATION_TIME = getJWTExpirationTime();

    // Generate the token
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
};

// Verify JWT Token
export const verifyToken = (token: string): any => {
  try {
    // Get the JWT_SECRET
    const JWT_SECRET = getJWTSecret();

    // Verify the token
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Get JWT Secret
const getJWTSecret = (): string => {
    const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Set it in .env

    // Check if the JWT_SECRET is set
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
    }

    return JWT_SECRET;
};

// Get JWT Expiration Time
const getJWTExpirationTime = (): number => {
    const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME as StringValue || '7d'; // Set it in .env

    // Check if the JWT_EXPIRATION_TIME is set
    if (!JWT_EXPIRATION_TIME) {
        throw new Error('JWT_EXPIRATION_TIME is not set');
    }

    // Convert the JWT_EXPIRATION_TIME to a number
    const JWT_EXPIRATION_TIME_MS = ms(JWT_EXPIRATION_TIME);

    return JWT_EXPIRATION_TIME_MS;
};