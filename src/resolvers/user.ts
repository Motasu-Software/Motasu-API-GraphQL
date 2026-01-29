
import { MyContext } from "../container";

export const userResolvers = {
    Query: {
        // getUsers: async (_: any, __: any, context: MyContext) => {
        //     return await context.userService.getUsers();
        // }
    },

    Mutation: {
        logIn: async (_: any, args: { email: string, password: string }, context: MyContext) => {
            return await context.userService.logIn(args.email, args.password);
        },
        signUp: async (_: any, args: { email: string, password: string }, context: MyContext) => {
            return await context.userService.createUser(args.email, args.password);
        },
        deleteUser: async (_: any, args: { id: string }, context: MyContext) => {
            return await context.userService.deleteUser(args.id);
        }
    }
};