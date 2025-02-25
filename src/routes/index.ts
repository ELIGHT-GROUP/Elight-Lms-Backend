import { Hono } from 'hono';


import authRouter from './auth.routes';

const Routers = new Hono();

Routers.route('/auth', authRouter)

export default Routers;


