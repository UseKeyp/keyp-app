import { LOGIN_ENABLED_PROVIDERS } from '@usekeyp/common'

import { isProdOrStaging } from 'src/lib/helpers'

import { CHESS, provider as chessProvider } from './chess'
import { onConnected as onConnectedChess } from './chess/login'
import { COINBASE, provider as coinbaseProvider } from './coinbase'
import { DISCORD, provider as discordProvider } from './discord'
import { GOOGLE, provider as googleProvider } from './google'
import { NODE_OIDC, provider as nodeOIDCProvider } from './node-oidc/node-oidc'
import { PLAID, provider as plaidProvider } from './plaid'
import { TWITCH, provider as twitchProvider } from './twitch'
import { TWITTER, provider as twitterProvider } from './twitter'

const providers = {
  [CHESS]: { ...chessProvider, onConnected: onConnectedChess },
  [COINBASE]: coinbaseProvider,
  [TWITCH]: twitchProvider,
  [PLAID]: plaidProvider,
  [DISCORD]: discordProvider,
  [NODE_OIDC]: nodeOIDCProvider,
  [TWITTER]: twitterProvider,
  [GOOGLE]: googleProvider,
}

// Providers where creating a wallet is allowed
if (!isProdOrStaging) LOGIN_ENABLED_PROVIDERS.push(NODE_OIDC)

const types = [
  DISCORD,
  COINBASE,
  CHESS,
  TWITCH,
  PLAID,
  NODE_OIDC,
  TWITTER,
  GOOGLE,
]

export { providers, types }
