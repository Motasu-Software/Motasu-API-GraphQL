import { User } from "../../models/User";
import { IUserService } from "../interfaces/IUserService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Assume PrismaClient is properly imported and configured

export class UserPrismaStrategy implements IUserService {
    createUser(email: string, hash: string, salt: string): Promise<User> {
        const newUser = prisma.user.create({
            data: {
                email: email,
                hash: hash,
                salt: salt
            }
        });
        return newUser;
    }
    deleteUser(id: string): Promise<boolean> {
        return prisma.user.delete({
            where: {
                id: id
            }
        }).then(() => true).catch(() => false);
    }
    getUsers(): Promise<User[]> {
        const users = prisma.user.findMany();
        return users;
    }
    // Implementation using Prisma ORM would go here
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    }
}