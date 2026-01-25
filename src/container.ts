import { UserService } from "./services/userService";
import { UserStubStrategy } from "./services/strategies/UserStubStrategy";

export interface MyContext {
    userService: UserService;
}

export const createServices = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const userStrategy = isProduction ? /* Production Strategy Here */ new UserStubStrategy() : new UserStubStrategy();
    const userService = new UserService(userStrategy);
    return { userService };
}