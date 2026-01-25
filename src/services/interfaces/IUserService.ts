import {User } from "../../models/User.js";

export interface IUserService {
    verifyUser(email: String, saltedHash: String): Promise<User | null>;
    createUser(email: String, password: String): Promise<User>;
    deleteUser(id: String): Promise<boolean>;
}