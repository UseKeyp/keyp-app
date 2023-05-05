import { cookieSettings } from 'src/functions/auth'
import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'

const middlewares = (oidc) => async (ctx, next) => {
  // PRE MIDDLEWARE
  if (ctx.req.method === 'GET' && ctx.request.url.startsWith('/auth?')) {
    // Verify the provider requested is the same as the one the user logged in with
    const session = await oidc.Session.get(ctx)
    const params = new URLSearchParams(ctx.request.url)
    const loginProvider = params.get('login_provider')
    if (
      loginProvider &&
      session?.accountId &&
      !session?.accountId?.startsWith(loginProvider)
    ) {
      // console.log('Requested provider: ', loginProvider)
      // console.log('Signed in provider: ', session?.accountId?.split('-')[0])
      // console.log(session?.accountId)
      // Destroy previous authorizationCode to fix the nasty bug
      // await db.oidc.deleteMany({
      //   where: {
      //     type: 3,
      //     payload: {
      //       path: ['accountId'],
      //       equals: session?.accountId,
      //     },
      //   },
      // })

      // End the OAuth session
      await session.destroy()

      // End the Redwood session
      ctx.res.clearCookie('session', cookieSettings)
      // Start over with same url
      // return ctx.res.redirect(`/oauth/${ctx.request.url}`)
    }
  }

  await next()
  // POST MIDDLEWARE
  if (ctx.response?.body?.authorization_endpoint)
    ctx.response.body.authorization_endpoint = `${APP_DOMAIN}/oauth/auth`
}

export default middlewares
