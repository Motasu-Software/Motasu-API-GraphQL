export const userTypeDef = `# GraphQL type definition for User
    type User {
        id: ID!
        email: String!
        username: String
        createdAt: String
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    extend type Query {
        me: User
        user(email: String!): User
    }

    extend type Mutation {
        signUp(email: String!, password: String!): AuthPayload
        logIn(email: String!, password: String!): AuthPayload
        logOut: Boolean!
        deleteAccount: Boolean!
    }
`;

