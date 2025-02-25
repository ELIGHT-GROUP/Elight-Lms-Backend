export interface ErrorResponse {
  status: string;
  message: string;
  stack?: string;
  errors?: any;
  statusCode?: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
}

export interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}
