let RedwoodDevFatalErrorPage = undefined
if (process.env.NODE_ENV === 'development') {
  RedwoodDevFatalErrorPage = require('@redwoodjs/web').DevFatalErrorPage
}

import { Button, Icon } from '@usekeyp/components-soft-ui'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import DefaultLayout from 'src/layouts/DefaultLayout'

export default RedwoodDevFatalErrorPage ||
  (() => (
    <DefaultLayout>
      <MetaTags
        title="Fatal Error"
        description="Something unexpected happened"
      />
      <div className="flex sm:flex-row flex-col items-start gap-x-4 mt-8">
        <div className="flex">
          <Icon name="keypnameandlogo" height="48px" width="164px" />
        </div>
        <h1 className="mb-8 flex text-5xl font-light text-blue-1200">
          Dev Portal
        </h1>
      </div>
      <main className="flex h-screen justify-center items-center text-center">
        <section className="flex">
          <div className="flex flex-col gap-y-4 text-center items-center justify-center">
            <h1 className="text-gray-1200 text-2xl">
              Mhhh, something unexpected happened.
            </h1>
            <p className="text-gray-1200 text-lg">(There's been a 504)</p>
            <img
              src="/fatal-error.png"
              className="flex object-scale-down"
              alt=""
            />
            <div className="flex flex-col sm:flex-row text-gray-1200 text-lg items-center">
              <div className="flex">Back to the</div>
              <Link to={routes.profile()}>
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
              or get in touch with us on{' '}
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
  ))
