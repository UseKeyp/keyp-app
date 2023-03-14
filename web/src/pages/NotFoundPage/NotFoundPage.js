import { Button } from '@usekeyp/components-soft-ui'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import HeaderAndFooterDefaultLayout from 'src/layouts/HeaderAndFooterLayout/HeaderAndFooterDefaultLayout'

export default function NotFoundPage() {
  return (
    <HeaderAndFooterDefaultLayout>
      <MetaTags title="No Go" description="Page not found" />
      <main className="flex justify-center items-center text-center">
        <section className="flex">
          <div className="flex flex-col mt-8 gap-y-4 text-center items-center justify-center">
            <h1 className="text-gray-1200 text-2xl font-light">
              Mhhh, something is missing.
            </h1>
            <p className="text-gray-1200 text-lg font-light">
              (But you did find a 404)
            </p>
            <img
              src="/no-go.png"
              height="812"
              width="812"
              className="flex"
              alt="page not found"
            />
            <div className="flex flex-col sm:flex-row text-gray-1200 text-lg items-center">
              <div className="flex font-light">Back to the</div>
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
              <div className="flex font-light">or get in touch with us on</div>
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
