import { PrismaClient, Prisma, Post as PrismaPost } from "@prisma/client";
import { IPostService, PostPage } from "../interfaces/IPostService.js";
import { Post } from "../../models/Post.js";

const prisma = new PrismaClient();

export class PostPrismaStrategy implements IPostService {
    async getPostById(id: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: { id }
        });
        return post ? this.mapToPost(post) : null;
    }

    async getPosts(page: number, perPage: number, authorEmail?: string): Promise<PostPage> {
        const safePage = Math.max(1, page);
        const safePerPage = Math.max(1, perPage);
        const where: any = {};

        if (authorEmail) {
            where.author = { email: authorEmail };
        }

        const totalItems = await prisma.post.count({ where });
        const totalPages = Math.max(1, Math.ceil(totalItems / safePerPage));
        const items = await prisma.post.findMany({
            where,
            skip: (safePage - 1) * safePerPage,
            take: safePerPage,
            orderBy: { createdAt: "desc" }
        });

        return {
            items: items.map(post => this.mapToPost(post)),
            page: safePage,
            perPage: safePerPage,
            totalItems,
            totalPages
        };
    }

    async createPost(authorId: string, title: string, description: string, circuit: string, car: string, lapTime: string): Promise<Post> {
        const post = await prisma.post.create({
            data: {
                title,
                description,
                circuit,
                car,
                lapTime,
                authorId
            }
        });
        return this.mapToPost(post);
    }

    async deletePost(id: string, authorId: string): Promise<boolean> {
        const result = await prisma.post.deleteMany({
            where: {
                id,
                authorId
            }
        });
        return result.count > 0;
    }

    private mapToPost(post: PrismaPost): Post {
        return {
            id: post.id,
            title: post.title,
            description: post.description,
            circuit: post.circuit,
            car: post.car,
            lapTime: post.lapTime,
            authorId: post.authorId,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        };
    }
}
