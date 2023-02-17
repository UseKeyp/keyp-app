let RedwoodDevFatalErrorPage = undefined
if (process.env.NODE_ENV === 'development') {
  RedwoodDevFatalErrorPage = require('@redwoodjs/web').DevFatalErrorPage
}

import { Button, Icon } from '@usekeyp/components-soft-ui'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import UserAccount from 'src/components/UserAccount/UserAccount'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { logOut } from 'src/utils/auth/client'

export default RedwoodDevFatalErrorPage ||
  function FatalErrorPage() {
    const { isAuthenticated, currentUser } = useAuth()
    return (
      <DefaultLayout>
        <MetaTags
          title="Fatal Error"
          description="Something unexpected happened"
        />
        <div className="flex sm:flex-row justify-between flex-col items-start gap-x-4 gap-y-2 mt-8">
          <div className="flex flex-col gap-y-2 gap-x-4 sm:flex-row sm:gap-y-0">
            <Icon name="keypnameandlogo" height="48px" width="164px" />
            <h1 className="flex text-5xl font-light text-blue-1200">App</h1>
          </div>
          {isAuthenticated ? (
            <UserAccount currentUser={currentUser} logOut={logOut} />
          ) : (
            <></>
          )}
        </div>
        <main className="flex h-screen justify-center items-center text-center">
          <section className="flex">
            <div className="flex flex-col gap-y-4 text-center items-center justify-center">
              <h1 className="text-gray-1200 text-2xl font-light">
                Mhhh, something unexpected happened.
              </h1>
              <p className="text-gray-1200 text-lg font-light">
                (There's been a 504)
              </p>
              <img
                src="/fatal-error.png"
                className="flex object-scale-down"
                alt=""
              />
              <div className="flex flex-col sm:flex-row text-gray-1200 text-lg items-center">
                <div className="flex font-light">Back to the</div>
                <Link to={routes.account()}>
                  <Button
                    variant="transparent"
                    classNameVariant="m-2"
                    borderColor="border-blue-1200"
                    size="regular"
                    fluid={false}
                  >
                    <div className="text-blue-1200">Dashboard</div>
                  </Button>
                </Link>
                <div className="flex font-light">
                  or get in touch with us on
                </div>
                <Button
                  href="https://discord.usekeyp.com/"
                  variant="transparent"
                  classNameVariant="m-2"
                  borderColor="border-blue-1200"
                  size="regular"
                  fluid={false}
                >
                  <div className="text-blue-1200">Discord</div>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </DefaultLayout>
    )
  }
