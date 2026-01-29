export const userTypeDef = `# GraphQL type definition for User
    type User {
        id: ID!
        email: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }
    
    extend type Query {
        getUsers: [User!]!
        }
        
    extend type Mutation {
        signUp(email: String!, password: String!): AuthPayload
        logIn(email: String!, password: String!): AuthPayload
        deleteUser(id: ID!): Boolean!
    }
`;

