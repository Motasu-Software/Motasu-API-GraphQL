import { Post } from "../../models/Post.js";

export interface PostPage {
    items: Post[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}

export interface IPostService {
    getPostById(id: string): Promise<Post | null>;
    getPosts(page: number, perPage: number): Promise<PostPage>;
    createPost(authorId: string, title: string, description: string, circuit: string, car: string, lapTime: string): Promise<Post>;
    deletePost(id: string, authorId: string): Promise<boolean>;
}
