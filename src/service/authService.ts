import { OAuth2Client } from "google-auth-library";
import { AppError } from "../middleware/errorHandler";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAuthorizationUrl = (): string => {
  return client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
};

export const getUserInfoFromCode = async (code: string) => {
  if (!code) {
    throw new AppError(400, "No authorization code provided");
  }

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const userInfoResponse = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    const user = userInfoResponse.data;

    return user;
  } catch (error) {
    throw new AppError(400, "Google Authentication failed. Please try again.");
  }
};
