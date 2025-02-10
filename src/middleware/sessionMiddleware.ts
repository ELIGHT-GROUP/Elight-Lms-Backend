import type { Context, Next } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { nanoid } from 'nanoid';

const sessions = new Map<string, Record<string, any>>();

export const sessionMiddleware = async (c: Context, next: Next) => {
  let sessionId = getCookie(c, 'session');

  if (!sessionId) {
    sessionId = nanoid();
    setCookie(c, 'session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60,
    });
  }

  const session = sessions.get(sessionId) || {};
  c.set('session', session);

  await next();

  sessions.set(sessionId, session);
};
