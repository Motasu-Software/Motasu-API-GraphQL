import {User } from "../../models/User.js";

export interface IUserService {
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: string): Promise<User | null>;
    
    createUser(email: string, hash: string): Promise<User>;
    deleteUser(id: string): Promise<boolean>;
    getUsers(): Promise<User[]>;
}