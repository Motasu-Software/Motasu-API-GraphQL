import { Post } from "../models/Post.js";
import { IPostService, PostPage } from "./interfaces/IPostService.js";

export class PostService {
    constructor(private strategy: IPostService) {}

    async getPostById(id: string): Promise<Post | null> {
        return this.strategy.getPostById(id);
    }

    async getPosts(page: number, perPage: number, authorEmail?: string): Promise<PostPage> {
        return this.strategy.getPosts(page, perPage, authorEmail);
    }

    async createPost(authorId: string, title: string, description: string, circuit: string, car: string, lapTime: string): Promise<Post> {
        return this.strategy.createPost(authorId, title, description, circuit, car, lapTime);
    }

    async deletePost(id: string, authorId: string): Promise<boolean> {
        return this.strategy.deletePost(id, authorId);
    }
}
