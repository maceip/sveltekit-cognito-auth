import { SvelteKitAuth } from "@auth/sveltekit"
import Cognito from "@auth/sveltekit/providers/cognito"
import { jwtDecode } from 'jwt-decode';

import {
  COGNITO_ID,
  COGNITO_SECRET,
  COGNITO_ISSUER,
  AUTH_SECRET,
} from "$env/static/private"

export const handle = SvelteKitAuth({
  secret: AUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.username = jwtDecode(account.id_token)["cognito:username"]
      }
      return token;
    },
    async session({ session, token }) {
      session.user.name = token.username
      return session;
    },
  },
  providers: [
    Cognito({
      clientId: COGNITO_ID,
      clientSecret: COGNITO_SECRET,
      issuer: COGNITO_ISSUER,
    }),
  ],
})
