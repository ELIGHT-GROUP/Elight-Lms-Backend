import type { Context } from "hono";
import { AppError } from "../middleware/errorHandler";
import { AuthService } from "../services/auth.service";
import type { GoogleUserInfo, JWTPayload } from "../types";
import { generateToken } from "../utils/jwt.utils";

const authService = new AuthService();

export const getAuthorizationUrlHandler = (c: Context) => {
  const authorizationUrl = authService.getAuthorizationUrl();
  return c.redirect(authorizationUrl);
};

export const setCallBackHandler = async (c: Context) => {
  const code = (await c.req.query("code")) as string;

  try {
    const userInfo = (await authService.getUserInfoFromCode(
      code as string
    )) as GoogleUserInfo;

    var user = await authService.findUserByEmail(userInfo.email);

    if (!user) {
      const newUser = await authService.createUser({
        id: userInfo.sub,
        email: userInfo.email,
        image: userInfo.picture,
        name: userInfo.name,
        role: "USER",
      });
      user = newUser;
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload, "30d");

    const cookie = c.req.header("Cookie");

    if (cookie) {
      c.res.headers.set(
        "Set-Cookie",
        `${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=30`
      );
    }

    return c.redirect("/");
  } catch (error) {
    console.error("Authentication error:", error);
    throw new AppError(400, "Authentication failed");
  }
};
