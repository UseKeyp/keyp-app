import { MetaTags } from '@redwoodjs/web'

import Authorize from 'src/pages/AuthorizePage/Authorize'
import { useOAuthAuthority } from 'src/providers/oAuthAuthority'

const AuthorizePage = () => {
  const { continueInteraction } = useOAuthAuthority()
  const handleConsent = () => {
    continueInteraction({ type: 'confirm' })
  }

  const handleAbort = () => {
    continueInteraction({ type: 'abort' })
  }

  return (
    <>
      <MetaTags title="Authorize" />
      <Authorize consent={handleConsent} abort={handleAbort} />
    </>
  )
}

export default AuthorizePage
