export const userTypeDef = `# GraphQL type definition for User
    type User {
        id: ID!
        email: String!
        hash : String!
        salt : String!
    }
    
    extend type Query {
        logIn(email: String!, saltedHash: String!): User
    }

    extend type Mutation {
        signUp(email: String!, password: String!): User
        deleteUser(id: ID!): Boolean!
    }
`;

