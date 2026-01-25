export const userTypeDef = `# GraphQL type definition for User
    type User {
        id: ID!
        email: String!
        hash : String!
        salt : String!
    }
    
    extend type Query {
        users: [User!]!
        user(email: String!): User
    }

    extend type Mutation {
        createUser(email: String!, password: String!): User!
        deleteUser(id: ID!): Boolean!
    }
`;

