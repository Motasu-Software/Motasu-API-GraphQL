import { IUserService } from "./interfaces/IUserService";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export class UserService {
    constructor(private strategy: IUserService) {}

    private generateToken(user: User): string {
        const payload = { userId: user.id, email: user.email };
        const secretKey = process.env.JWT_SECRET;
        return jwt.sign(payload, secretKey, { expiresIn: "1h" });
    }

    async getUsers(): Promise<User[]> {
        return this.strategy.getUsers();
    }

    async logIn(email: string, password: string) {
        const user = await this.strategy.getUserByEmail(email);
        const hash = bcrypt.hashSync(password, user?.salt || "");

        if (user && user.hash === hash) {
            return {
                token: this.generateToken(user),
                user: user,
            };
        } else {
            throw new Error("Invalid email or password");
        }
    }

    async createUser(email: string, password: string): Promise<{ token: string; user: User }> {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await this.strategy.createUser(email, hash, salt);
        return {
            token: this.generateToken(user),
            user: user,
        };  
    }
    async deleteUser(id: string): Promise<boolean> {
        return this.strategy.deleteUser(id);
    }
}
