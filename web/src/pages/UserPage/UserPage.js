import UserCell from 'src/components/User/UserCell'
import { MetaTags } from '@redwoodjs/web'

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
