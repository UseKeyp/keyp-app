import { fetchUser } from 'src/lib/users'

export const withUser = async (req, _res, next) => {
  const user = await fetchUser(req.ctx.sub)
  req.ctx.user = user
  next()
}
