import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from 'next-auth/providers/facebook';
import User from '@/models/auth/userModel';
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import CryptoJS from "crypto-js";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (mongoose.connections[0].readyState === 0) {
                    await mongoose.connect(process.env.MONGODB_URI);
                }
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("User not found");
                }

                const hashedInput = CryptoJS.SHA256(credentials.password).toString();
                if (hashedInput !== user.password) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image || null,
                };
            },
        }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
        //     authorization: {
        //         params: { scope: "read:user user:email" },
        //     },
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // ✅ 1 hour in seconds
    },
    jwt: {
        maxAge: 60 * 60, // ✅ 1 hour in seconds
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === 'credentials' && user) {
                token._id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image || null;
            } else if (user && account?.provider === 'google') {
                // Database connection
                if (mongoose.connections[0].readyState === 0) {
                    await mongoose.connect(process.env.MONGODB_URI);
                }
                // Check if user already exists in DB
                let loginUser;
                const existingUser = await User.findOne({ email: user.email });

                // If user does not exist, create one
                if (!existingUser) {
                    const randomPassword = Array.from({ length: 12 }, () => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}<>?'.charAt(Math.floor(Math.random() * 84))).join('');
                    const newUser = new User({
                        name: user.name || user.email.split("@")[0],
                        email: user.email,
                        authProvider: account.provider,
                        authId: account.providerAccountId,
                        password: randomPassword,
                        image: user.image
                    });
                    loginUser = await newUser.save();
                } else {
                    // Existing user - update missing fields
                    let needsUpdate = false;
                    if (!existingUser.authProvider) {
                        existingUser.authProvider = account.provider;
                        needsUpdate = true;
                    }
                    if (!existingUser.authId) {
                        existingUser.authId = account.providerAccountId;
                        needsUpdate = true;
                    }
                    if (!existingUser.image && user.image) {
                        existingUser.image = user.image;
                        needsUpdate = true;
                    }
                    if (needsUpdate) {
                        await existingUser.save();
                    }
                    loginUser = existingUser;
                }

                token._id = loginUser._id.toString();
                token.email = loginUser.email;
                token.name = loginUser.name;
                token.googleId = account.providerAccountId;
                token.image = loginUser.image;
            }
            return token;
        },
        async session({ session, token }) {
            session.user._id = token._id;
            session.user.email = token.email;
            session.user.googleId = token.googleId;
            session.user.image = token.image;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};
export default NextAuth(authOptions);
