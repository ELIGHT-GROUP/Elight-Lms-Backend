import { Hono } from "hono";
import {
  getAuthorizationUrlHandler,
  setCallBackHandler,
} from "../controllers/auth.controller";
import { verifyToken, checkRole } from "../middleware/authMiddleware";

const auth = new Hono();


auth.get("/login", getAuthorizationUrlHandler);
auth.get("/callback", setCallBackHandler);

export default auth; 