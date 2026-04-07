import { UserService } from "./services/userService.js";
import { UserStubStrategy } from "./services/strategies/UserStubStrategy.js";
import { UserPrismaStrategy } from "./services/strategies/UserPrismaStrategy.js";
import { Response } from "express";

export interface UserContext {
    userId: string;
    email: string;
}

export interface MyContext {
    userService: UserService;
    userContext?: UserContext;
    res: Response; 
}


export const createServices = () => {

    /* Decide which strategy to use based on environment variable */
    const useDatabase = process.env.DATABASE_URL !== undefined;
    const userStrategy = useDatabase ? new UserPrismaStrategy() : new UserStubStrategy();
    
    
    const userService = new UserService(userStrategy);
    return { userService };
}