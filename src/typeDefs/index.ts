import { userTypeDef } from "./user.js";
import { postTypeDef } from "./post.js";

const baseTypeDef = `# Base GraphQL type definitions
    type Query {
        _empty: String
    }

    type Mutation{
        _empty: String
    }
`;

export const typeDefs = [baseTypeDef, userTypeDef, postTypeDef];

