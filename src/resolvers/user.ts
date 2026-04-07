import { MyContext } from "../container.js";

export const userResolvers = {
    Query: {
        me: async (_: any, __: any, context: MyContext) => {
            // Si le middleware d'authentification n'a pas trouvé de cookie valide
            if (!context.userContext || !context.userContext.userId) {
                return null;
            }
            return await context.userService.getUserByID(context.userContext.userId);
        },
    },

    Mutation: {
        logIn: async (_: any, args: { email: string, password: string }, context: MyContext) => {
            // 1. On récupère le user et le token depuis le service
            const authData = await context.userService.logIn(args.email, args.password);
            
            // 2. On attache le JWT dans un cookie HttpOnly
            context.res.cookie('token', authData.token, {
                httpOnly: true, // Empêche l'accès via JavaScript (sécurité XSS)
                secure: process.env.NODE_ENV === 'production', // true en prod (HTTPS obligatoire)
                sameSite: 'lax', // 'lax' ou 'strict' selon si ton front et back sont sur le même domaine
                maxAge: 1000 * 60 * 60 * 24 * 7 // Expire dans 7 jours (en millisecondes)
            });

            // 3. On retourne les données (ton schéma GraphQL n'a plus besoin du token, juste du user)
            return { user: authData.user }; 
        },

        // ⚠️ NOUVELLE MUTATION OBLIGATOIRE POUR LES COOKIES
        logOut: async (_: any, __: any, context: MyContext) => {
            // On efface le cookie pour déconnecter l'utilisateur
            context.res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });
            return true; // Retourne un simple boolean
        },

        signUp: async (_: any, args: { email: string, password: string }, context: MyContext) => {
            const authData = await context.userService.createUser(args.email, args.password);
            
            // Optionnel : Connecter l'utilisateur directement après l'inscription
            context.res.cookie('token', authData.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            return { user: authData.user };
        },

        deleteAccount: async (_: any, __: any, context: MyContext) => {
            if (!context.userContext || !context.userContext.userId) {
                throw new Error("User not authenticated");
            }
            const result = await context.userService.deleteUser(context.userContext.userId);
            
            // Si le compte est supprimé, on détruit aussi la session
            context.res.clearCookie('token');
            return result;
        }
    }
};