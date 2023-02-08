import { logger } from 'src/lib/logger'
import { getMethod } from 'src/lib/web3/contracts/apps'

export const writeMethod = async (input) => {
  const { user, network, method, args, address } = input

  if (!user) throw 'No user provided'
  if (!method) throw 'No method provided'
  if (!args) throw 'No arguments provided'
  if (!address) throw 'No address provided'
  if (!network) throw 'No network provided'
  logger.debug(
    `writeMethod() address: ${address}, network: ${network}, method: ${method}, args: ${args}`
  )
  const meth = getMethod({ network, method, address })
  if (!meth) throw 'Method not yet supported'
  return meth(input)
}
