
import type { Next } from 'hono';
import type { AuthContext } from '../types/types';


export const requireAuth = async (c: AuthContext, next: Next) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  await next();
};
