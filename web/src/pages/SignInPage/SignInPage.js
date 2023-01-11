import { MetaTags } from '@redwoodjs/web'

import { useTheme } from 'src/providers/theme'
import { useEffect } from 'react'
import LoginPortal from 'src/components/LoginPortal'

const SignInPage = () => {
  return (
    <>
      <MetaTags title="Login" description="Log into Keyp!" />
      <LoginPortal />
    </>
  )
}

export default SignInPage
