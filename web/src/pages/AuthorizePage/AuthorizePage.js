import { MetaTags } from '@redwoodjs/web'

import Authorize from 'src/pages/AuthorizePage/Authorize'

const AuthorizePage = () => {
  return (
    <>
      <MetaTags title="Authorize" />
      <Authorize />
    </>
  )
}

export default AuthorizePage
