import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: { scope: "read:user user:email" },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user && account?.provider === 'github') {
                console.log("GitHub token object:", JSON.stringify(account));
                console.log("GitHub user object:", JSON.stringify(user));
                console.log("GitHub account object:", JSON.stringify(account));
                token.email = user.email;
                token.username = user.name;
                token.id = user.id; // GitHub user ID
            }
            return token;
        },
        async session({ session, token }) {
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.id = token.id;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};
export default NextAuth(authOptions);
