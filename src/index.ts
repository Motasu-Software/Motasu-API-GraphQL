import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { typeDefs } from './typeDefs/index.js';
import { resolvers } from './resolvers/index.js';
import dotenv from 'dotenv';
import { createServices, MyContext } from './container.js';
import depthLimit from 'graphql-depth-limit';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
}

export const JWT_SECRET = process.env.JWT_SECRET;

async function startServer() {
    // 1. Initialisation d'Express
    const app = express();
    const services = createServices();
    
    // Configuration CORS globale
    app.use(cors({
        origin: [
            'http://localhost:4200', 
            'https://motasu-dev.corentinkorohrichard.fr',
            'https://motasu.corentinkorohrichard.fr'
        ],
        credentials: true,
    }));

    // 2. Initialisation d'Apollo Server
    const server = new ApolloServer({
        typeDefs, 
        resolvers,
        introspection: process.env.NODE_ENV !== 'production',
        validationRules: [depthLimit(5)],
    });

    await server.start();

    app.use(
        '/',
        express.json(),
        cookieParser(),
        
        expressMiddleware(server, {
            context: async ({ req, res }: { req: Request; res: Response }): Promise<MyContext> => { 

                const token = req.cookies?.token || '';

                const context: MyContext = {
                    ...services,
                    res 
                };

                if (token) {
                    try {
                        const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };
                        context.userContext = decodedToken;
                    } catch (e) {
                        console.warn("Invalid token:", e);
                    }
                }
                
                return context;
            }
        })
    );

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/`); // 👈 Message mis à jour
    });
}

startServer();