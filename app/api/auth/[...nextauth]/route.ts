import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // profile is the user object returned by the provider
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', ''),
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log('=> error connecting to database:', error);
        return false;
      }
    },
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      session.user.id = sessionUser?._id.toString();
      return session;
    },
  },
});

export { handler as GET, handler as POST };
