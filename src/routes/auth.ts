import { Hono } from "hono";
import {
  getAuthorizationUrlHandler,
  setCallBackHandler,
} from "../controllers/authController";

const auth = new Hono();

auth.get("/google", (c) => getAuthorizationUrlHandler(c));
auth.get("/google/callback", (c) => setCallBackHandler(c));
auth.get('/logout', (c) => {
  c.set('user', undefined);
  return c.redirect('/');
});

export default auth;
