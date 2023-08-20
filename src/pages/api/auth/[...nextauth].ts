import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// TODO: To change the clientId and clientSecret with env variables

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: "light",
    brandColor: "#00EF8B",
    logo: "https://assets-global.website-files.com/5f734f4dbd95382f4fdfa0ea/63ce603ae36f46f6bb67e51e_flow-logo.svg",
    buttonText: "#00EF8B",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: `747228258883-3ka3ipeih4vg61oh8k4jm133fsa5hkhf.apps.googleusercontent.com`,
      clientSecret: `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`,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
