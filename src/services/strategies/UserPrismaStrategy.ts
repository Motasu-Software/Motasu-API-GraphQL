import { User } from "../../models/User.js";
import { IUserService } from "../interfaces/IUserService.js";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient(); // Assume PrismaClient is properly imported and configured

export class UserPrismaStrategy implements IUserService {
    async createUser(email: string, hash: string): Promise<User> {
        try {
            return await prisma.user.create({
                data: {
                    email: email,
                    hash: hash
                }
            });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error('Email already in use');
            }
            throw error;
        }
    }

    getUserById(id: string): Promise<User | null> {
        const user = prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user;
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