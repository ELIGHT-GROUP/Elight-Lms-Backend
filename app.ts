import { Hono } from 'hono'
import "dotenv/config";

const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

export default app