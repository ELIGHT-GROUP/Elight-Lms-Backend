import { Hono } from 'hono';
import { getUserController } from '../controllers/userController';

const users = new Hono();

users.get('/', (c) => getUserController(c));

export default users;
