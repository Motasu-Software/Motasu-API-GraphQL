import { MyContext } from "../container.js";

export const postResolvers = {
    Query: {
        posts: async (_: any, args: { authorEmail?: string; page: number; perPage: number }, context: MyContext) => {
            return context.postService.getPosts(args.page, args.perPage, args.authorEmail);
        }
    },

    Mutation: {
        createPost: async (_: any, args: { title: string; description: string; circuit: string; car: string; lapTime: string }, context: MyContext) => {
            if (!context.userContext || !context.userContext.userId) {
                throw new Error("User not authenticated");
            }

            return context.postService.createPost(
                context.userContext.userId,
                args.title,
                args.description,
                args.circuit,
                args.car,
                args.lapTime
            );
        },

        deletePost: async (_: any, args: { id: string }, context: MyContext) => {
            if (!context.userContext || !context.userContext.userId) {
                throw new Error("User not authenticated");
            }

            const deleted = await context.postService.deletePost(args.id, context.userContext.userId);
            if (!deleted) {
                throw new Error("Impossible de supprimer le post.");
            }
            return { id: args.id };
        }
    },

    Post: {
        author: async (post: { authorId: string }, _: any, context: MyContext) => {
            return await context.userService.getUserByID(post.authorId);
        }
    }
};
