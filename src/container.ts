import { UserService } from "./services/userService.js";
import { PostService } from "./services/postService.js";
import { UserStubStrategy } from "./services/strategies/UserStubStrategy.js";
import { UserPrismaStrategy } from "./services/strategies/UserPrismaStrategy.js";
import { PostStubStrategy } from "./services/strategies/PostStubStrategy.js";
import { PostPrismaStrategy } from "./services/strategies/PostPrismaStrategy.js";
import { Response } from "express";

export interface UserContext {
    userId: string;
    email: string;
}

export interface MyContext {
    userService: UserService;
    postService: PostService;
    userContext?: UserContext;
    res: Response; 
}


export const createServices = () => {

    /* Decide which strategy to use based on environment variable */
    const useDatabase = process.env.DATABASE_URL !== undefined;
    const userStrategy = useDatabase ? new UserPrismaStrategy() : new UserStubStrategy();
    const postStrategy = useDatabase ? new PostPrismaStrategy() : new PostStubStrategy();
    
    const userService = new UserService(userStrategy);
    const postService = new PostService(postStrategy);
    return { userService, postService };
}