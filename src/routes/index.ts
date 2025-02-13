import { Hono } from 'hono';


import authRouter from './auth.router';

const Routers = new Hono();

Routers.route('/auth', authRouter)

export default Routers;


