import NextAuth, { Account, Session, User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    providers: [
      SpotifyProvider({
        authorization:
          "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private",
        clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      }),
    ],

    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.refresh_token;
        }

        return token;
      },
      async session({ session, token }) {
        session.user = {
          id: token.sub,
          name: token.name,
          email: token.email,
          picture: token.picture,
        };

        session.token = token.accessToken;

        return session;
      },
    },
  });
};
