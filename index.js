const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID
        name: String
    }
            
    type Query {
        user: [User]
    }
`;

const users = [
    {id: '1', name: 'Alice'},
    {id: '2', name: 'Bob'},
    {id: '3', name: 'Charlie'}
];

const resolvers = {
    Query: {
        user: () => users,
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});