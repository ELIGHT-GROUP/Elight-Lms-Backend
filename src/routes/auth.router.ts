import { Hono } from "hono";
import { getAuthorizationUrlHandler, setCallBackHandler } from "../controllers/auth.controller";


const auth = new Hono();

auth.get("/google", (c) => getAuthorizationUrlHandler(c));
auth.get("/google/callback", (c) => setCallBackHandler(c));

export default auth;
