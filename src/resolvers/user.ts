import { markAsUntransferable } from "node:worker_threads";
import { MyContext } from "../container";

export const userResolvers = {
    Query: {
        logIn: async (_: any, args: { email: string, password: string }, context: MyContext) => {
            return await context.userService.verifyUser(args.email, args.password);
        }
    },

    Mutation: {
        createUser: async (_: any, args: { email: string, password: string }, context: MyContext) => {
            return await context.userService.createUser(args.email, args.password);
        },
        deleteUser: async (_: any, args: { id: string }, context: MyContext) => {
            return await context.userService.deleteUser(args.id);
        }
    }
};