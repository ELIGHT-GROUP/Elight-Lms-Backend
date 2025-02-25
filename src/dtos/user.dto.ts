export interface CreateUserDto {
    id: string;
    email: string;
    name?: string;
    image?: string;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
} 