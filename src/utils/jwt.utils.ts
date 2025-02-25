import jwt from "jsonwebtoken";
import type { JWTPayload } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "elight";

export const generateToken = (
  payload: JWTPayload,
  expiresIn: any = "1d"
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const extractTokenFromHeader = (authHeader: string): string => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided or invalid format");
  }
  return authHeader.split(" ")[1];
};
