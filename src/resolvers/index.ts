import { userResolvers } from "./user.js";
import { postResolvers } from "./post.js";

export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
    },
    Post: {
        ...postResolvers.Post,
    }
};