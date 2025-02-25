import { OAuth2Client } from "google-auth-library";
import { AppError } from "../middleware/errorHandler";
import type { CreateUserDto } from "../dtos/user.dto";
import { UserRepository } from "../repo/uset.dao";

export class AuthService {
  private client: OAuth2Client;
  private userRepo: UserRepository;

  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    this.userRepo = new UserRepository();
  }

  public getAuthorizationUrl(): string {
    return this.client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });
  }

  public async getUserInfoFromCode(code: string) {
    if (!code) {
      throw new AppError(400, "No authorization code provided");
    }

    try {
      const { tokens } = await this.client.getToken(code);
      this.client.setCredentials(tokens);

      const userInfoResponse = await this.client.request({
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
      });

      const user = userInfoResponse.data;

      return user;
    } catch (error) {
      throw new AppError(400, "Google Authentication failed. Please try again.");
    }
  }

  public async createUser(userData: CreateUserDto) {
    const user = await this.userRepo.createUser(userData);
    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);
    return user;
  }

  public async findUserById(id: string) {
    const user = await this.userRepo.findById(id);
    return user;
  }
}
