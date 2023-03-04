import { MetaTags } from '@redwoodjs/web'

import Profile from 'src/components/Profile/Profile'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="My Keyp Profile" />
      <Profile />
    </>
  )
}

export default ProfilePage
