# OAuth2

## Providers

Details, including client IDs for each provider are provided below. Note: client IDs are not sensitive data.

### Epic Games

> When not specified, the owner is patrick@usekeyp.com

#### [Google](https://console.developers.google.com/)

- prod: 1041904142635-v3er0se8oi841i2ng20hsi7dtorop5mf.apps.googleusercontent.com
- dev: 1066186127905-hfgi0hu09gk44qt19cj60dc5287ojndg.apps.googleusercontent.com

#### Chess.com

- prod: 459cd394-77cd-11ec-95cb-cfacea4084a2
- dev: 40c5d866-77cd-11ec-a560-67b86d6160ee
- Clients managed via contacting dev team directly

#### [Discord](https://discord.com/developers/applications)

- prod: 1071207957682991115
- dev: 1023392742707044492
- Jacob owns dev client

#### [Twitter](https://developer.twitter.com/en/portal/dashboard)

- prod: YXQwTG9uaVN4Vzd6U1QydjJrYmo6MTpjaQ
- dev: VU4tQW0yOHpKcmQ1VXdXSDJxSlM6MTpjaQ
- prod owned by 4-wave

#### [Coinbase](https://www.coinbase.com/oauth/applications)

- prod: d71f130f740a580493825b0ae8511f1b72d48661217faab9d78f61f9cd4400d9
- dev: bffa8c5db2bc2fb06164426788d553629265d6d7181084557ace51ed85f7e9fe
- Patrick (personal) owns dev and prod

#### [Twitch](https://dev.twitch.tv/)

- prod: 4atukv7xa3xwj6qebjef0ojft89zvv
- dev: p4us7nv9yhsbeyr3i8korgrjjo22j8
- Owned by @usekeyp
- 3/3/23

#### [Epic Games](https://dev.epicgames.com/portal/en-US/)

- prod: xyza7891oDVbPExiIiDFt3BlD9DRsa2J
- dev: xyza78912FiNSSV7M96hC4xUf1n70lap
- Added 3/3/23


# BUG Authorization code expired

## After one oauth discord. Final state:

#### 2 AccessToken
```json
{"exp":1680994695,"gty":"authorization_code","iat":1680908295,"jti":"ywhE_L06R2c4QoUTcnDl-eIIDbUlKaUZYCb31mVXfrN","kind":"AccessToken","scope":"openid email","grantId":"q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf","clientId":"dev-portal","accountId":"DISCORD-381135787330109441","sessionUid":"NcKEm3rLlb6hFqciFrC5I","expiresWithSession":true}
```

#### 3 AuthorizationCode CONSUMED
```json
{"exp":1680908353,"iat":1680908293,"jti":"xKkfXUfo1i7blQPHrd6BoklN6_xPlwLD-qBhaYPx7-G","kind":"AuthorizationCode","scope":"openid email","grantId":"q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf","authTime":1680908268,"clientId":"dev-portal","accountId":"DISCORD-381135787330109441","sessionUid":"NcKEm3rLlb6hFqciFrC5I","redirectUri":"http://0.0.0.0:8910/redirect/keyp","codeChallenge":"6FiE6XOaEnXI5AjwKF4RrJBmAi9cBrarXUZoW6OsloE","expiresWithSession":true,"codeChallengeMethod":"S256"}
```

#### 13 Grant
```json
{"exp":1682117893,"iat":1680908293,"jti":"q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf","kind":"Grant","openid":{"scope":"openid email"},"clientId":"dev-portal","accountId":"DISCORD-381135787330109441"}
```

#### 15 Session uid NcKEm3rLlb6hFqciFrC5I
```json
{"exp":1682117893,"iat":1680908256,"jti":"9ys-8kE1GHP5TzKKbbbqP","uid":"NcKEm3rLlb6hFqciFrC5I","kind":"Session","loginTs":1680908268,"accountId":"DISCORD-381135787330109441","authorizations":{"dev-portal":{"sid":"-smDbWFyIRD6_q_9X8PUG","grantId":"q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf"}}}
```

## Another auth request

interaction FKvsrDhzOIlLThF1fExz_

### before provider oauth

#### DELETED prior 15 Session uid NcKEm3rLlb6hFqciFrC5I
#### 15 Session uid BxVYXHucjLNnyXJ3aNzbr
```json
{"exp":1682118278,"iat":1680908678,"jti":"e42BiISl-SVGMuurQ9zdt","uid":"BxVYXHucjLNnyXJ3aNzbr","kind":"Session"}
```

#### 3 AuthorizationCode
grantId q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf (same as from prior 2,3)
```json
{"exp":1680908738,"iat":1680908678,"jti":"PIOb7Xph8hnPcckGwqIk1AEfVMXePr5UnCGAlvSei_Q","kind":"AuthorizationCode","scope":"openid email","grantId":"q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf","authTime":1680908268,"clientId":"dev-portal","accountId":"DISCORD-381135787330109441","sessionUid":"NcKEm3rLlb6hFqciFrC5I","redirectUri":"http://0.0.0.0:8910/redirect/keyp","codeChallenge":"7JPl5pL6OUmVGkUYo-en6yIHdoSF3dM4bGhBit3kEWc","expiresWithSession":true,"codeChallengeMethod":"S256"}
```

#### 10 Interaction FKvsrDhzOIlLThF1fExz_
```json
{"exp":1680909278,"iat":1680908678,"jti":"FKvsrDhzOIlLThF1fExz_","kind":"Interaction","params":{"scope":"openid email","state":"ed2e792b-e88b-4e56-a0a5-fdb0a7dc4fdb","client_id":"dev-portal","redirect_uri":"http://0.0.0.0:8910/redirect/keyp","response_type":"code","code_challenge":"7JPl5pL6OUmVGkUYo-en6yIHdoSF3dM4bGhBit3kEWc","code_challenge_method":"S256"},"prompt":{"name":"login","details":{},"reasons":["no_session"]},"returnTo":"https://localhost/oauth/auth/FKvsrDhzOIlLThF1fExz_"}
```
Q: What was the grantId for the Interaction at this point? I think that will lead us to a solution.
A: Interactions don't have grant IDs but I have another idea. Lets run the middleware BEFORE oidc processing.

### On completion 2,3,3,13,15

#### 3 CONSUMED AuthorizationCode
grantId q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf same as from prior 2,3
```json
{"exp":1680908738,"iat":1680908678,"jti":"PIOb7Xph8hnPcckGwqIk1AEfVMXePr5UnCGAlvSei_Q","kind":"AuthorizationCode","scope":"openid email","grantId":"q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf","authTime":1680908268,"clientId":"dev-portal","accountId":"DISCORD-381135787330109441","sessionUid":"NcKEm3rLlb6hFqciFrC5I","redirectUri":"http://0.0.0.0:8910/redirect/keyp","codeChallenge":"7JPl5pL6OUmVGkUYo-en6yIHdoSF3dM4bGhBit3kEWc","expiresWithSession":true,"codeChallengeMethod":"S256"}
```

#### 3 AuthorizationCode (NEW)
CONSUMED
grantId q26iNQ-7-ASqpjtLLPOYi0VEtgKQ8ry3Nk12XgS-HIf same as from prior 2,3
```json
{"exp":1680909183,"iat":1680909123,"jti":"giAnc6MxBffJOPVX6bdzI7SrsGZrIWmsMEKOmtoLh81","kind":"AuthorizationCode","scope":"openid email","grantId":"qbEu5bk0e-5PilQvRbvmuZS2fuV1ai2oj4cMXoONoVP","authTime":1680909004,"clientId":"dev-portal","accountId":"GOOGLE-117403839683914908602","sessionUid":"BxVYXHucjLNnyXJ3aNzbr","redirectUri":"http://0.0.0.0:8910/redirect/keyp","codeChallenge":"7JPl5pL6OUmVGkUYo-en6yIHdoSF3dM4bGhBit3kEWc","expiresWithSession":true,"codeChallengeMethod":"S256"}
```

#### 2 AccessToken
```json
{"exp":1680995526,"gty":"authorization_code","iat":1680909126,"jti":"ZuicViSK4DZEaFWOreJCAJSD3JY6KHynD58jFMdx-Xa","kind":"AccessToken","scope":"openid email","grantId":"qbEu5bk0e-5PilQvRbvmuZS2fuV1ai2oj4cMXoONoVP","clientId":"dev-portal","accountId":"GOOGLE-117403839683914908602","sessionUid":"BxVYXHucjLNnyXJ3aNzbr","expiresWithSession":true}
```

#### 13 Grant
```json
{"exp":1682118723,"iat":1680909123,"jti":"qbEu5bk0e-5PilQvRbvmuZS2fuV1ai2oj4cMXoONoVP","kind":"Grant","openid":{"scope":"openid email"},"clientId":"dev-portal","accountId":"GOOGLE-117403839683914908602"}
```

#### 15 Session uid BxVYXHucjLNnyXJ3aNzbr
```json
{"exp":1682118723,"iat":1680908678,"jti":"uiu50bZ7MHeLuxIL2o5o2","uid":"BxVYXHucjLNnyXJ3aNzbr","kind":"Session","loginTs":1680909004,"accountId":"GOOGLE-117403839683914908602","authorizations":{"dev-portal":{"sid":"ZGfRx5BSIMnLNM19zo-jF","grantId":"qbEu5bk0e-5PilQvRbvmuZS2fuV1ai2oj4cMXoONoVP"}}}
```

I believe what is happening is that a new #3 authorization code entity is created using an old grant. Then later the authorization code is looked up to complete the flow, it pulls the wrong one from before, which is now expired.

I will try to move the middleware to pre-process.

This is proving more difficult than expected because deleting the session requires loading details about the session first, which oidc typically does for me. I will need to see the functions on how it performs this task

I was able to move it and it seems to be working! Now I may also need to end the session every time an authorization request is made, to handle cases when no login_provider is used

Now the #3 Authorization code is not being generated when the user starts a new flow. Why is authorization code not being generated??
