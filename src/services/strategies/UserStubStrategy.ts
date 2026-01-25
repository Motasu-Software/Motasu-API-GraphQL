import { IUserService } from "../interfaces/IUserService";
import { User } from "../../models/User.js";

export class UserStubStrategy implements IUserService {
    private users: User[] = [
        {id: '1', email: 'alice@example.com', hash: 'hash1', salt: 'salt1'},
        {id: '2', email: 'bob@example.com', hash: 'hash2', salt: 'salt2'},
        {id: '3', email: 'jim@example.com', hash: 'hash3', salt: 'salt3'}
    ];

    async verifyUser(email: String, saltedHash: String): Promise<User | null> {
        const user = this.users.find(user => user.email === email && user.hash === saltedHash);
        return user || null;
    }

    async createUser(email: String, password: String): Promise<User> {
        const newUser: User = {
            id: (this.users.length + 1).toString(),
            email: email,
            hash: password, // In a real implementation, hash the password properly
            salt: 'staticSalt' // In a real implementation, generate a unique salt
        };
        this.users.push(newUser);
        return newUser;
    }

    async deleteUser(id: String): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length < initialLength;

    }
}