import { IPostService, PostPage } from "../interfaces/IPostService.js";
import { Post } from "../../models/Post.js";

export class PostStubStrategy implements IPostService {
    private posts: Post[] = [
        {
            id: '1',
            title: 'Première session au circuit',
            description: 'Une météo parfaite, beaucoup de fun et un temps très propre.',
            circuit: 'Circuit de Spa-Francorchamps',
            car: 'Porsche 911 GT3',
            lapTime: '2:12.345',
            authorId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Nouveau record personnel',
            description: 'J’ai amélioré mon temps de la semaine dernière de 1.5s.',
            circuit: 'Circuit Paul Ricard',
            car: 'Alpine A110',
            lapTime: '1:58.789',
            authorId: '2',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];

    async getPostById(id: string): Promise<Post | null> {
        const post = this.posts.find(post => post.id === id);
        return post || null;
    }

    async getPosts(page: number, perPage: number): Promise<PostPage> {
        const safePage = Math.max(1, page);
        const safePerPage = Math.max(1, perPage);
        const totalItems = this.posts.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / safePerPage));
        const startIndex = (safePage - 1) * safePerPage;
        const items = this.posts
            .slice(startIndex, startIndex + safePerPage)
            .map(post => ({ ...post }));

        return {
            items,
            page: safePage,
            perPage: safePerPage,
            totalItems,
            totalPages
        };
    }

    async createPost(authorId: string, title: string, description: string, circuit: string, car: string, lapTime: string): Promise<Post> {
        const now = new Date().toISOString();
        const newPost: Post = {
            id: (this.posts.length + 1).toString(),
            title,
            description,
            circuit,
            car,
            lapTime,
            authorId,
            createdAt: now,
            updatedAt: now
        };
        this.posts.unshift(newPost);
        return newPost;
    }

    async deletePost(id: string, authorId: string): Promise<boolean> {
        const originalLength = this.posts.length;
        this.posts = this.posts.filter(post => !(post.id === id && post.authorId === authorId));
        return this.posts.length < originalLength;
    }
}
