import { Hono } from 'hono';

import users from './users';
import products from './products';

const Routers = new Hono();

Routers.route('/users', users);  
Routers.route('/products', products);

export default Routers;


