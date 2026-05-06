export const postTypeDef = `# GraphQL type definition for Post
    type Post {
        id: ID!
        title: String!
        description: String!
        circuit: String!
        car: String!
        lapTime: String!
        author: User!
        createdAt: String!
        updatedAt: String!
    }

    type PostPage {
        items: [Post!]!
        page: Int!
        perPage: Int!
        totalItems: Int!
        totalPages: Int!
    }

    extend type Query {
        posts(page: Int!, perPage: Int!): PostPage!
    }

    extend type Mutation {
        createPost(title: String!, description: String!, circuit: String!, car: String!, lapTime: String!): Post!
        deletePost(id: ID!): Boolean!
    }
`;
