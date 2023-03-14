let RedwoodDevFatalErrorPage = undefined
if (process.env.NODE_ENV === 'development') {
  RedwoodDevFatalErrorPage = require('@redwoodjs/web').DevFatalErrorPage
}

import { Button } from '@usekeyp/components-soft-ui'
import { APP_DOMAIN } from 'api/src/lib/helpers'

import HeaderAndFooterDefaultLayout from 'src/layouts/HeaderAndFooterLayout/HeaderAndFooterDefaultLayout'

export default RedwoodDevFatalErrorPage ||
  function FatalErrorPage() {
    return (
      <HeaderAndFooterDefaultLayout>
        <main className="flex justify-center items-center text-center">
          <section className="flex">
            <div className="flex mt-8 flex-col gap-y-4 text-center items-center justify-center">
              <h1 className="text-gray-1200 text-2xl font-light">
                Mhhh, something unexpected happened.
              </h1>
              <p className="text-gray-1200 text-lg font-light">
                (There's been a 504)
              </p>
              <img
                src="/fatal-error.png"
                className="flex"
                height="812"
                width="812"
                alt="fatal error"
              />
              <div className="flex flex-col sm:flex-row text-gray-1200 text-lg items-center">
                <div className="flex font-light">Back to the</div>
                <a href={`${APP_DOMAIN}/profile`}>
                  <Button
                    variant="transparent"
                    classNameVariant="m-2"
                    borderColor="border-blue-1200"
                    size="regular"
                    fluid={false}
                  >
                    <div className="text-blue-1200">Dashboard</div>
                  </Button>
                </a>
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
      </HeaderAndFooterDefaultLayout>
    )
  }
