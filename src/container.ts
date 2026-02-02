import { UserService } from "./services/userService";
import { UserStubStrategy } from "./services/strategies/UserStubStrategy";
import { UserPrismaStrategy } from "./services/strategies/UserPrismaStrategy";

export interface UserContext {
    id: string;
    email: string;
}

export interface MyContext {
    userService: UserService;
    userContext?: UserContext;
}


export const createServices = () => {

    /* Decide which strategy to use based on environment variable */
    const useDatabase = process.env.DATABASE_URL !== undefined;
    const userStrategy = useDatabase ? new UserPrismaStrategy() : new UserStubStrategy();
    
    
    const userService = new UserService(userStrategy);
    return { userService };
}