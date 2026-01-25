import { userTypeDef } from "./user";

const baseTypeDef = `# Base GraphQL type definitions
    type Query {
        _empty: String
    }

    type Mutation{
        _empty: String
    }
`;

export const typeDefs = [baseTypeDef, userTypeDef];

