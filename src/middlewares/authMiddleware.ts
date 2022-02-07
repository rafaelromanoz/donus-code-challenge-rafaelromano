import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../auth/authConfig';

interface IUser {
  id: number;
}
const authMiddleware = (req: Request, res: Response , next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }
    const user = validateToken(authorization);
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
    const { id } = user as IUser;
    req.user = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

export default authMiddleware;

