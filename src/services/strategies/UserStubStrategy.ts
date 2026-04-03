import { IUserService } from "../interfaces/IUserService.js";
import { User } from "../../models/User.js";

export class UserStubStrategy implements IUserService {
    private users: User[] = [
        {id: '1', email: 'alice@example.com', hash: 'hash1'},
        {id: '2', email: 'bob@example.com', hash: 'hash2'},
        {id: '3', email: 'jim@example.com', hash: 'hash3'}
    ];

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);
        return user || null;
    }

    async createUser(email: string, hash: string): Promise<User> {
        const newUser: User = {
            id: (this.users.length + 1).toString(),
            email: email,
            hash: hash
        };
        this.users.push(newUser);
        return newUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length < initialLength;

    }

    async getUsers(): Promise<User[]> {
        return this.users;
    }
}