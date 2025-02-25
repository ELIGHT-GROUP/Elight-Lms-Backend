import { PrismaClient, type User } from "@prisma/client";
import type { CreateUserDto } from "../dtos/user.dto";
import { DatabaseService } from "../services/database.service";

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseService.getInstance().getPrismaClient();
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: userData,
      });
      return user;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error: any) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error: any) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }
}
