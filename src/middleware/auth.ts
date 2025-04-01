import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './types/authenticated-request';
import { verifyToken } from '../utils/jwt';

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  req.userId = decoded.userId; // Add userId to request
  next();
};
