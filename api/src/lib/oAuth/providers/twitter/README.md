
## Setup Twitter client

- Set App permissions to "Read", and enable Request email from users.
- Set Type of App to "Web App" (confidential client)

User's email is available at the https://api.twitter.com/1.1/account/verify_credentials.json endpoint

## twitter.js

- REDWOOD_ENV_TWITTER_BASIC_SECRET is calculated using `btoa(clientId:clientSecret)`
- Scope `users.read tweet.read offline.access`
