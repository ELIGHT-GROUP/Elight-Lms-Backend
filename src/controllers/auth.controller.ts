import {
  getAuthorizationUrl,
  getUserInfoFromCode,
} from "../service/authService";
import { AppError } from "../middleware/errorHandler";
import type { Context } from "hono";

export const getAuthorizationUrlHandler = (c: Context) => {
  const authorizationUrl = getAuthorizationUrl();
  return c.redirect(authorizationUrl);
};

export const setCallBackHandler = async (c: Context) => {
  //const { code } = await c.req.json();

  const code = "ghj"

  console.log("code", code);

  try {
    const user = await getUserInfoFromCode(code as string);

    return c.json({
      message: "Authenticated successfully!",
      user,
    });
  } catch (error) {
    console.log("error", error);
    throw new AppError(400, "Authentication failed");
  }
};
