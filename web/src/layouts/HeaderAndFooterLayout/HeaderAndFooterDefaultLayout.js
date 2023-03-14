import { useAuth } from '@redwoodjs/auth'

import { Footer } from 'src/components/Footer/Footer'
import Icon from 'src/components/Icon/Icon'
import UserAccount from 'src/components/UserAccount/UserAccount'

const HeaderAndFooterDefaultLayout = ({ children }) => {
  const { logOut, currentUser, isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <header className="mt-8 flex flex-col justify-between gap-y-2 sm:flex-row sm:px-8">
          <div className="flex items-center justify-center gap-y-2 gap-x-4">
            <Icon name="keypnameandlogo" height="38px" width="128px" />
            <h1 className="flex whitespace-nowrap text-[38px] font-light text-blue-1200">
              App
            </h1>
          </div>
          <div className="flex justify-center">
            {isAuthenticated && (
              <UserAccount currentUser={currentUser} logOut={logOut} />
            )}
          </div>
        </header>
        <div className="sm:max-w-screen mx-4 max-w-7xl px-0 sm:mx-auto sm:px-4">
          <div className="mx-4 mb-16 min-h-screen md:mb-0">{children}</div>
        </div>
        <div className="mx-4 md:mb-0">
          <Footer
            title="Dev Portal"
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
      </div>
    </div>
  )
}

export default HeaderAndFooterDefaultLayout
