import { useAuth } from '@redwoodjs/auth'

import UserDetails from 'src/components/User/UserDetails'
import UserActivityCell from 'src/components/User/UserActivityCell'
import WalletFormTransfer20 from 'src/components/Wallet/WalletFormTransfer20'
import WalletFormTransfer721 from 'src/components/Wallet/WalletFormTransfer721'
import WalletFormTransferUsdc from 'src/components/Wallet/WalletFormTransferUsdc'

const Profile = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <></>
  }
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <UserDetails user={currentUser} isProfile />
          <UserActivityCell usernameOrAddress={currentUser?.username} />
        </div>
      </div>
      <h1 className="mt-10">{t('External Transfer - USDC')}</h1>
      <div className="flex mt-4 ">
        <WalletFormTransferUsdc />
      </div>
      <h1 className="mt-10">{t('External Transfer - ERC20')}</h1>
      <div className="flex mt-4 ">
        <WalletFormTransfer20 />
      </div>
      <h1 className="mt-10">{t('External Transfer - ERC721')}</h1>
      <div className="flex mt-4 h-[476px]">
        <WalletFormTransfer721 />
      </div>
    </div>
  )
}

export default Profile
