import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AppHeader from 'src/components/AppHeader/AppHeader'
import Icon from 'src/components/Icon/Icon'
import { ItemDescriptionCell } from 'src/components/ItemDescriptionCell/ItemDescriptionCell'
import UserAccount, {
  getStyledUsernameFromCurrentUser,
} from 'src/components/UserAccount/UserAccount'

const Profile = () => {
  const { currentUser, isAuthenticated, logOut } = useAuth()

  if (!currentUser) {
    return <></>
  }
  return (
    <div className="max-width-container">
      <MetaTags title="Profile" description="Profile Page" />
      <div className="flex sm:flex-row justify-between flex-col items-start gap-x-4 gap-y-2 mt-8">
        <div className="flex flex-col gap-y-2 mb-2 gap-x-4 sm:flex-row sm:gap-y-0">
          <Icon name="keypnameandlogo" height="48px" width="164px" />
          <h1 className="flex text-5xl font-light text-blue-1200">Account</h1>
        </div>
        {isAuthenticated ? (
          <UserAccount currentUser={currentUser} logOut={logOut} />
        ) : (
          <></>
        )}
      </div>
      <div className="mb-12 mt-12 flex flex-col">
        <AppHeader
          title="Wallet"
          links={[
            {
              title: 'Docs',
              url: 'https://docs.usekeyp.com/',
            },
          ]}
        />
        <ItemDescriptionCell
          tooltipID="wallet-address"
          title={
            <div className="flex flex-col items-start sm:flex-row gap-x-1 text-gray-1600 sm:items-center">
              Your{' '}
              {currentUser?.username ? (
                <div className="font-bold">
                  {getStyledUsernameFromCurrentUser(currentUser)}
                </div>
              ) : (
                ''
              )}
              Wallet Address
            </div>
          }
          tokenOrAddress={currentUser?.address}
          description="Keyp's OAuth creates a wallet for you. This wallet uses MPC and can be used like any other EVM compatible address."
        />
      </div>
      <div className="bg-gray-100 p-4 w-full h-46">
        <div className="flex flex-row gap-x-8 items-center justify-center h-full">
          <div className="text-blue-1200 font-light text-xl sm:text-3xl break-words">
            Stay tuned for more exciting features
          </div>
          <div className="flex">
            <Icon name="account_page_card" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
