import { MetaTags } from '@redwoodjs/web'

import Account from 'src/components/Profile/Account'

const AccountPage = () => {
  return (
    <>
      <MetaTags title="Account" description="My Keyp Account" />
      <Account />
    </>
  )
}

export default AccountPage
