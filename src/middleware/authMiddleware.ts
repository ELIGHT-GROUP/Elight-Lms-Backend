import { verify } from "jsonwebtoken";
import { AppError } from "./errorHandler";
import type { Context, Next } from "hono";
import type { JWTPayload } from "../types";

export const verifyToken = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verify(token, process.env.JWT_SECRET!) as JWTPayload;

    c.set("user", decoded);

    await next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
};

export const checkRole = (
  allowedRoles: ("USER" | "ADMIN" | "SUPER_ADMIN")[]
) => {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as JWTPayload;

    if (!user || !allowedRoles.includes(user.role)) {
      throw new AppError(403, "Insufficient permissions");
    }

    await next();
  };
};
