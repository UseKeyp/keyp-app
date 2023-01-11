import { MetaTags } from '@redwoodjs/web'

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
