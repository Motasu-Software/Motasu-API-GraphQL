import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'; 
import {typeDefs} from './typeDefs';
import { resolvers } from './resolvers';
import { createServices } from './container';

async function startServer() {

    const services = createServices();
    const server = new ApolloServer({typeDefs, resolvers});
    const { url } = await startStandaloneServer(server, {
        listen : {port: 4000},
        context: async () => ({...services})
    });

}

startServer();