import type { Context } from "hono";
import passport from "passport";

export const getAuthorizationUrl = (c: Context) => {
  return new Promise<Response>((resolve, reject) => {
    passport.authenticate("google", (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(c.newResponse("Redirecting to Google...", 302));
      }
    })(c.req.raw as any, c.res as any, () => {});
  });
};

export const setCallBack = (c: Context) => {
  return new Promise<Response>((resolve, reject) => {
    passport.authenticate("google", (err: any, user: any) => {
      if (err) {
        reject(err);
      } else {
        c.set("user", user);
        resolve(c.redirect("/"));
      }
    })(c.req.raw as any, c.res as any, () => {});
  });
};
