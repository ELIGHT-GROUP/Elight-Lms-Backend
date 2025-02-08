import type { Context } from "hono";
import { AppError } from "../middleware/errorHandler";

export const getUserController = (c: Context) => {

  //throw new AppError(500 , "something wrong hi");
  const user = { id: 1, name: 'John Doe' };
  return c.json(user);
};