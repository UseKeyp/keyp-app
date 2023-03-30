import {
  AppHeader,
  Icon,
  ItemDescriptionCell,
} from '@usekeyp/components-soft-ui'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import { getStyledUsernameFromCurrentUser } from 'src/components/UserAccount/UserAccount'

const Profile = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <></>
  }
  return (
    <div className="max-width-container">
      <MetaTags title="Profile" description="Profile Page" />
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
          <div className="flex text-blue-1200 font-light text-xl sm:text-4xl break-words">
            Stay tuned for more exciting features
          </div>
          <Icon name="account_page_card" />
        </div>
      </div>
    </div>
  )
}

export default Profile
