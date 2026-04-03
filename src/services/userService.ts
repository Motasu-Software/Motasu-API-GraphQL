import { IUserService } from "./interfaces/IUserService.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export class UserService {
    constructor(private strategy: IUserService) {}

    private generateToken(user: User): string {
        const payload = { userId: user.id, email: user.email };
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error("JWT_SECRET environment variable is not set");
        }
        return jwt.sign(payload, secretKey, { expiresIn: "7d" });
    }

    async getUserByID(id: string): Promise<User | null> {
        return this.strategy.getUserById(id);
    }

    async getUsers(): Promise<User[]> {
        return this.strategy.getUsers();
    }

    async logIn(email: string, password: string) {
        const user = await this.strategy.getUserByEmail(email);

        if (user && bcrypt.compareSync(password, user.hash)) {
            return {
                token: this.generateToken(user),
                user: user,
            };
        } else {
            throw new Error("Invalid email or password");
        }
    }

    async createUser(email: string, password: string): Promise<{ token: string; user: User }> {
        const hash = bcrypt.hashSync(password, 10);
        const user = await this.strategy.createUser(email, hash);
        return {
            token: this.generateToken(user),
            user: user,
        };  
    }
    async deleteUser(id: string): Promise<boolean> {
        return this.strategy.deleteUser(id);
    }
}
