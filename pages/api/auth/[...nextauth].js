import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import { buildPath, extractData } from "../../../lib/file-helpers";

export default NextAuth({
  callbacks: {
    async session(session, token) {
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const filePath = buildPath("users.json");
        const usersData = extractData(filePath);
        const user = usersData.find((user) => user.email === credentials.email);

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in!");
        }
        return {
          email: user.email,
          id: user.id,
          name: user.name,
          mobile: user.mobile,
          userimg: user.userimg,
          address: user.address,
        };
      },
    }),
  ],
});
