import { Hono } from "hono";
import { getAuthorizationUrlHandler, setCallBackHandler } from "../controllers/authController";


const auth = new Hono();

auth.get("/google", (c) => getAuthorizationUrlHandler(c));
auth.post("/google/callback", (c) => setCallBackHandler(c));

export default auth;
