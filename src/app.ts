import { Hono } from 'hono';
import { logger } from 'hono/logger';
import 'dotenv/config';
import Routers from './routes';
import { errorHandler } from './middleware/errorHandler';
import { passportMiddleware } from './middleware/passport';
import { sessionMiddleware } from './middleware/sessionMiddleware';
import type { AuthContext } from './types/types';
import { cors } from 'hono/cors';

const app = new Hono<{ Variables: AuthContext }>();

app.use(logger());
app.onError(errorHandler);
app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use('*', sessionMiddleware);
app.use('*', passportMiddleware);
app.route('/api/v1', Routers);

app.get('/', (c) => {
  const session = c.get('session');
  const user = session.user;

  if (user) {
    return c.json({
      message: 'Logged in successfully!',
      user: {
        id: user.id,
        displayName: user.displayName,
        emails: user.emails,
      },
    });
  } else {
    return c.json({ message: 'Please log in.' }, 401);
  }
});

export default app;
