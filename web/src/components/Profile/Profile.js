import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AppHeader from 'src/components/AppHeader/AppHeader'
import { Footer } from 'src/components/Footer/Footer'
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
      <div className="flex flex-col justify-between mt-12 gap-y-8 sm:flex-row sm:items-center">
        <div className="flex items-center justify-center gap-x-4 sm:flex-row">
          <Icon name="keypnameandlogo" height="38px" width="128px" />
          <h1 className="flex whitespace-nowrap text-[38px] font-light text-blue-1200">
            Account
          </h1>
        </div>
        {isAuthenticated && (
          <UserAccount currentUser={currentUser} logOut={logOut} />
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
            <div className="flex flex-row gap-x-1 text-gray-1600">
              Your{' '}
              {currentUser?.username ? (
                <div className="font-bold">
                  {getStyledUsernameFromCurrentUser(currentUser, 'text-[16px]')}
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
      <div className="flex bg-gray-100 p-4 w-full justify-center h-46 mb-12">
        <div className="flex flex-col sm:flex-row gap-x-12 gap-y-4 items-center justify-center h-full">
          <div className="flex text-blue-1200 font-light text-xl sm:text-3xl break-words">
            Stay tuned for more exciting features
          </div>
          <Icon name="account_page_card" />
        </div>
      </div>
      <Footer
        title="App"
        links={[
          {
            title: 'Docs',
            url: 'https://docs.usekeyp.com/api',
          },
          {
            title: 'Discord',
            url: 'https://discord.usekeyp.com/',
          },
        ]}
      />
    </div>
  )
}

export default Profile
