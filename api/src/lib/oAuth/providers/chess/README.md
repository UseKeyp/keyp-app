Below sent to Nikola for update on 2/9/23

Dev/Sandbox client ID: `40c5d866-77cd-11ec-a560-67b86d6160ee`

```json
{
  "name": "Keyp Dev",
  "logo": "https://app.usekeyp.com/logo-test.png",
  "redirectUri": [
    "http://localhost/redirect/chess",
    "http://0.0.0.0:8910/redirect/chess",
    "https://dev.treasurechess.com/redirect/chess",
    "https://app.dev-env.usekeyp.com/redirect/chess",
    "https://treasure-chess-dev-4.vercel.app/redirect/chess",
    "https://treasure-chess-sandbox-4.vercel.app/redirect/chess",
  ],
  "privacyPolicyUrl": "https://www.usekeyp.com/terms-of-use-privacy-policy",
  "termsOfServiceUrl": "https://www.usekeyp.com/terms-of-use-privacy-policy"
}
```

Staging/Prod client ID: `459cd394-77cd-11ec-95cb-cfacea4084a2`

```json
{
  "name": "Keyp",
  "logo": "https://app.usekeyp.com/logo.png",
  "redirectUri": [
    "https://app.usekeyp.com/redirect/chess",
    "https://staging-app.usekeyp.com/redirect/chess",
    "https://app.staging-env.usekeyp.com/redirect/chess",
    "https://treasurechess.com/redirect/chess",
    "https://treasure.chess.com/redirect/chess",
    "https://treasure.gcp-staging.chess-platform.com/redirect/chess",
  ],
  "privacyPolicyUrl": "https://www.usekeyp.com/terms-of-use-privacy-policy",
  "termsOfServiceUrl": "https://www.usekeyp.com/terms-of-use-privacy-policy"
}
```


In "diff format" he requested

## Dev/Sandbox client ID: `40c5d866-77cd-11ec-a560-67b86d6160ee`

Name change to "Keyp Dev"
Logo change to "https://app.usekeyp.com/logo-test.png"
Append these redirectUris:
- "http://localhost/redirect/chess",
- "https://dev.treasurechess.com/redirect/chess",
- "https://app.dev-env.usekeyp.com/redirect/chess",
privacyPolicyUrl change to "https://www.usekeyp.com/terms-of-use-privacy-policy"
termsOfServiceUrl change to "https://www.usekeyp.com/terms-of-use-privacy-policy"

## Staging/Prod client ID: `459cd394-77cd-11ec-95cb-cfacea4084a2`

Name change to "Keyp"
Logo change to "https://app.usekeyp.com/logo.png"
Append these redirectUris:
- "https://app.usekeyp.com/redirect/chess",
- "https://staging-app.usekeyp.com/redirect/chess",
- "https://app.staging-env.usekeyp.com/redirect/chess",
- "https://treasurechess.com/redirect/chess",
privacyPolicyUrl change to "https://www.usekeyp.com/terms-of-use-privacy-policy"
termsOfServiceUrl change to "https://www.usekeyp.com/terms-of-use-privacy-policy"
