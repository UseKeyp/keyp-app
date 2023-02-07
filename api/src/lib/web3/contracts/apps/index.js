import merge from 'deepmerge'

import { METHODS_BY_NETWORK as JB_METHODS_BY_NETWORK } from 'src/lib/web3/contracts/apps/juicebox'
import { AVAILABLE_NETWORKS } from 'src/lib/web3/provider'

const EMPTY_METHODS = AVAILABLE_NETWORKS.reduce((acc, network) => {
  acc[network] = {}
  return acc
}, {})

const ALL_METHODS = merge.all([
  EMPTY_METHODS,
  JB_METHODS_BY_NETWORK,
  // Add more methods here
])

export const getMethod = ({ network, method, address }) => {
  if (AVAILABLE_NETWORKS.indexOf(network) === -1)
    throw `Invalid network '${network}'. Supported networks are ${AVAILABLE_NETWORKS.join(
      ', '
    )}`

  const addressLower = address.toLowerCase()
  if (!ALL_METHODS[network][addressLower])
    throw `Contract not found on network ${network}`

  const meth = ALL_METHODS[network][addressLower][method]
  if (!meth) throw 'Invalid method'
  return meth
}
