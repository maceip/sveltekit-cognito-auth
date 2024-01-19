import { redirect, type Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from "@auth/sveltekit"
import Cognito from "@auth/sveltekit/providers/cognito"
import { jwtDecode } from 'jwt-decode';
import { sequence } from '@sveltejs/kit/hooks';

import {
  COGNITO_ID,
  COGNITO_SECRET,
  COGNITO_ISSUER,
  AUTH_SECRET,
} from "$env/static/private"


const handleAuth = (async (...args) => {
  const [{ event }] = args;
  return SvelteKitAuth({
    trustHost: true,
    session: { strategy: "jwt" },
    secret: AUTH_SECRET,
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.username = jwtDecode(account.id_token)["cognito:username"]
          token.aws = account.id_token
        }
        return token;
      },
      async session({ session, token }) {
        session.user = {
          id: token.sub,
          name: token.username,
          aws: token.aws
        };

        event.locals.session = session;

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
  })(...args);
}) satisfies Handle;

const protectedHandle = (async ({ event, resolve }) => {
  console.log("handleWebSocket: ", event.url)

  await event.locals.getSession();

  if (!event.locals.session && event.route.id?.includes('(protected)')) {
    throw redirect(302, '/');
  }
  return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleAuth, protectedHandle);