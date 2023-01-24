import { CHESS, provider as chessProvider } from './chess'
import { onConnected as onConnectedChess } from './chess/login'
import { COINBASE, provider as coinbaseProvider } from './coinbase'
import { DISCORD, provider as discordProvider } from './discord'
import { GOOGLE, provider as googleProvider } from './google'
import { NODE_OIDC, provider as nodeOIDCProvider } from './node-oidc/node-oidc'
import { PLAID, provider as plaidProvider } from './plaid'
import { TWITCH, provider as twitchProvider } from './twitch'
export const providers = {
  [CHESS]: { ...chessProvider, onConnected: onConnectedChess },
  [COINBASE]: coinbaseProvider,
  [TWITCH]: twitchProvider,
  [PLAID]: plaidProvider,
  [DISCORD]: discordProvider,
  [NODE_OIDC]: nodeOIDCProvider,
  [GOOGLE]: googleProvider,
}

export const types = [
  DISCORD,
  COINBASE,
  CHESS,
  TWITCH,
  PLAID,
  NODE_OIDC,
  GOOGLE,
]
