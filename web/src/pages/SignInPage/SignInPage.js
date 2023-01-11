import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

import LoginPortal from 'src/components/LoginPortal'
import { useTheme } from 'src/providers/theme'

const SignInPage = () => {
  return (
    <>
      <MetaTags title="Login" description="Log into Keyp!" />
      <LoginPortal />
    </>
  )
}

export default SignInPage
