import { MetaTags } from '@redwoodjs/web'

import UserCell from 'src/components/User/UserCell'

const UserPage = ({ usernameOrAddress }) => {
  return (
    <>
      <MetaTags
        title={usernameOrAddress || 'Player'}
        description={t("Check out this player's Treasures.")}
      />
      <UserCell usernameOrAddress={usernameOrAddress} />
    </>
  )
}

export default UserPage
