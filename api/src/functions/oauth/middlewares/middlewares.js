import { APP_DOMAIN } from 'src/lib/helpers'

const middlewares = (oidc) => async (ctx, next) => {
  // PRE MIDDLEWARE
  await next()
  // POST MIDDLEWARE
  if (ctx.response?.body?.authorization_endpoint)
    ctx.response.body.authorization_endpoint = `${APP_DOMAIN}/oauth/authorize`

  // console.log('post middleware', ctx.method, ctx.oidc.route)
  if (ctx.method === 'GET' && ctx.oidc.route === 'authorization') {
    // Verify the provider requested is the same as the one the user logged in with
    const session = await oidc.Session.get(ctx)
    const params = new URLSearchParams(ctx.request.url)
    const loginProvider = params.get('login_provider')
    // console.log('Requested provider: ', loginProvider)
    // console.log('Signed in provider: ', session?.accountId?.split('-')[0])
    if (
      loginProvider &&
      session?.accountId &&
      !session?.accountId?.startsWith(loginProvider)
    ) {
      // End the session
      // console.log('End the session')
      await ctx.oidc.session.destroy()
      // Start over with same url
      return ctx.res.redirect(`/oauth/${ctx.request.url}`)
    }
  }
}

export default middlewares
