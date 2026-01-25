const users = [
    {id: '1', email: 'alice@example.com', hash: 'hash1', salt: 'salt1'},
    {id: '2', email: 'bob@example.com', hash: 'hash2', salt: 'salt2'},
    {id: '3', email: 'jim@example.com', hash: 'hash3', salt: 'salt3'}
];

export const userResolvers = {
    Query: {
        users: () => users,
        user: (_: any, args: { email: string }) => users.find(user => user.email === args.email),   
    }};
    

