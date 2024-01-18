
## Overview

quick demo of cognito as an @auth provider via sveltekit

## Getting started

go to your cognito pool
create app client:

Allowed callback URLs
http://localhost:5173/auth/callback/cognito

OAuth grant types
Authorization code grant

OpenID Connect scopes
email
openid
phone
profile


ALLOW_CUSTOM_AUTH
ALLOW_REFRESH_TOKEN_AUTH
ALLOW_USER_SRP_AUTH

Client secret
