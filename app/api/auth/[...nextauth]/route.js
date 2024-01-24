import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "../../../../helpers/authBcrypt";
import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No user found...");
                    }

                    if (credentials.password.length < 30) {
                        const isValid = await verifyPassword(credentials.password, user.password);

                        if (!isValid) {
                            throw new Error("Password wrong...");
                        }
                    }

                    return user;
                } catch (error) {
                    throw new Error("Authentication failed");
                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user, session }) {

            if (user) {
                return {
                    ...token,
                    id: user._id,
                    photo: user.photo,
                    role: user.role,
                    password: user.password
                }
            }

            return token;
        },
        async session({ token, session }) {

            const { id, name, email, photo, role, password } = token;

            const newSession = {
                ...session,
                user: {
                    id,
                    name,
                    email,
                    photo,
                    role,
                    password
                }
            };

            return newSession;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
