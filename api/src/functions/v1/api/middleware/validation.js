export const validateToken = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1]
  if (!token)
    return res.status(401).send('Unauthorized. No access token provided')
  const response = await fetch(
    settings.APP_DOMAIN + '/oauth/token/introspection',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: encodeBody({
        token,
        client_id: 'api-server',
        client_secret: process.env.INTROSPECTION_SECRET,
      }),
    }
  ).then((res) => res.json())
  if (!response.active) return res.status(401).send('Unauthorized')
  console.log(response)
  const { userId, userProvider } = getIdentifiersFromId(response.sub)
  req.ctx = {
    userId,
    userProvider,
    sub: response.sub,
    scope: response.scope,
    clientId: response.client_id,
  }
  next()
}
