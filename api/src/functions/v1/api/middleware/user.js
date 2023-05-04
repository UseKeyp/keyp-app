import { addErrorLocation } from 'src/lib/helpers'
import { fetchUser } from 'src/lib/users'

export const withUser = async (req, res, next) => {
  try {
    const user = await fetchUser(req.ctx.sub)
    req.ctx.user = user
    next()
  } catch (e) {
    next(addErrorLocation('withUser', e))
  }
}
