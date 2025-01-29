import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "@/utils/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        const user = await getUserFromDb(
          credentials.email,
          credentials.password
        );
        console.log("user:", user);
        if (!user) {
          throw new AuthError("Email/password invalid credentials.");
        }
        // Ensure the user object contains the necessary fields
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).userId;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user.userId = token.id;
      (session as any).accessToken = token.accessToken;
      return session
    },
  },
});
