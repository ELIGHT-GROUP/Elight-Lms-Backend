import type { Context } from "hono";

export const getAllProductsController = (c: Context) => {
  const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
  return c.json(products);
};