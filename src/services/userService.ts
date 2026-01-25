import { IUserService } from "./interfaces/IUserService";
import { User } from "../models/User.js";

export class UserService{
    constructor(private strategy: IUserService){}

    async verifyUser(email: String, saltedHash: String): Promise<User | null> {
        return this.strategy.verifyUser(email, saltedHash);
    }
    async createUser(email: String, password: String): Promise<User> {
        return this.strategy.createUser(email, password);

    }
    async deleteUser(id: String): Promise<boolean> {
        return this.strategy.deleteUser(id);
    }
    
}