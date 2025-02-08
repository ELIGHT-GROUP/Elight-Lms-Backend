import { Hono } from 'hono';
import { getAllProductsController } from '../controllers/productController';

const products = new Hono();

products.get('/', (c) => getAllProductsController(c));

export default products;
