import { UserService } from "./services/userService";
import { UserStubStrategy } from "./services/strategies/UserStubStrategy";
import { UserPrismaStrategy } from "./services/strategies/UserPrismaStrategy";

export interface MyContext {
    userService: UserService;
}

export const createServices = () => {

    const useDatabase = process.env.DATABASE_URL !== undefined;

    const userStrategy = useDatabase ? new UserPrismaStrategy() : new UserStubStrategy();
    const userService = new UserService(userStrategy);
    return { userService };
}