import { AppError } from "../middleware/errorHandler";
import type { Context } from "hono";
import { getAuthorizationUrl, setCallBack } from "../service/authService";

export const getAuthorizationUrlHandler = async (c: Context) => {
  try {
    return await getAuthorizationUrl(c);
  } catch (error) {
    console.error(error);
    throw new AppError(500, "Authontication failed");
  }
};

export const setCallBackHandler = async (c: Context) => {
  try {
    return await setCallBack(c);
  } catch (error) {
    console.error(error);
    throw new AppError(500, "Failed to set callback");
  }
};
