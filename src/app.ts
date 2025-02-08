import { Hono } from 'hono'
import { logger } from 'hono/logger'
import "dotenv/config";
import Routers from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = new Hono()

app.use(logger());
app.onError(errorHandler);
app.route('/api/v1', Routers);

export default app