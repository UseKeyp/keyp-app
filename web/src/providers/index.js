import { GamesContextProvider } from 'src/providers/games'
import { ThemeContextProvider } from 'src/providers/theme'
import { ToastProvider } from 'src/providers/toast'
import { WalletProvider } from 'src/providers/wallet'

import { FilterProvider } from './filters'
import { LocaleProvider } from './locale'
import { MarketProvider } from './market'
import { OAuthProvider } from './oAuth'
import { OAuthAuthorityProvider } from './oAuthAuthority'
import { RedirectionProvider } from './redirection'
import { RestrictedProvider } from './restricted'
import { TrackingProvider } from './tracking'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <>
      <RestrictedProvider>
        <TrackingProvider />
        <LocaleProvider>
          <ThemeContextProvider>
            <FilterProvider>
              <ToastProvider>
                <OAuthProvider>
                  <OAuthAuthorityProvider>
                    <RedirectionProvider>
                      <WalletProvider>
                        {/* <RampProvider> */}
                        <GamesContextProvider>
                          {/* <MintingProvider> */}
                          <MarketProvider>{children}</MarketProvider>
                          {/* </MintingProvider> */}
                        </GamesContextProvider>
                        {/* </RampProvider> */}
                      </WalletProvider>
                    </RedirectionProvider>
                  </OAuthAuthorityProvider>
                </OAuthProvider>
              </ToastProvider>
            </FilterProvider>
          </ThemeContextProvider>
        </LocaleProvider>
      </RestrictedProvider>
    </>
  )
}

export default AllContextProviders
