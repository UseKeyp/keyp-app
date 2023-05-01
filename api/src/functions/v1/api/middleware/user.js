import { fetchUser } from 'src/lib/users'

export const withUser = async (req, res, next) => {
  try {
    const user = await fetchUser(req.ctx.sub)
    req.ctx.user = user
    next()
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.error(e)
    return res.status(500).json({
      statusCode: 500,
      error: e,
      message: 'Error fetching user',
    })
  }
}
