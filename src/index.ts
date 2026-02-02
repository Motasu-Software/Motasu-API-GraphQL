import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'; 
import {typeDefs} from './typeDefs';
import { resolvers } from './resolvers';
import dotenv from 'dotenv';
import { createServices, MyContext } from './container';
import depthLimit from 'graphql-depth-limit';
import jwt from 'jsonwebtoken';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
}

export const JWT_SECRET = process.env.JWT_SECRET;

async function startServer() {

    const services = createServices();
    const server = new ApolloServer({
        typeDefs, 
        resolvers,
        introspection: process.env.NODE_ENV !== 'production',
        validationRules: [depthLimit(5)],
    });
    const { url } = await startStandaloneServer(server, {
        listen : {port: 4000},
        context: async ({req}) : Promise<MyContext> => {    
            const token = req.headers.authorization || ''

            const context: MyContext = {
                ...services
            };

            if (token) {
                try {
                    const cleanedToken = token.replace('Bearer ', '');
                    const decodedToken = jwt.verify(cleanedToken, JWT_SECRET) as { userId: string, email: string };
                    context.userContext = decodedToken
                }catch (e){
                    // console.info('Invalid token');
                }
            
         
        
            }
            return context;
        }
    });
    console.log(`🚀  Server ready at: ${url}`);

}

startServer();