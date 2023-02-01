import { MetaTags } from '@redwoodjs/web'

import LoginPortal from 'src/components/LoginPortal'

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Login" description="Log into Keyp!" />
      <LoginPortal />
    </>
  )
}

export default LoginPage
