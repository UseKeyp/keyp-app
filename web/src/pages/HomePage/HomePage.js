import { Icon } from '@usekeyp/components-soft-ui'

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col text-center h-screen">
        <div className="flex flex-col m-auto">
          <h1 className="text-black text-4xl font-sans">Welcome to</h1>
          <div className="flex justify-center">
            <Icon height="132px" width="264px" name="keypnameandlogo" />
          </div>
          <h2 className="text-black font-sans">More coming soon...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
            <a
              href="https://docs.usekeyp.com/"
              target="_blank"
              className="flex flex-col border border-blue-1200 p-4 rounded-md w-85"
              rel="noreferrer"
            >
              <div className="flex font-bold hover:underline">
                Docs & How To's
              </div>
              <div className="flex text-left">
                Start here to learn how to build with Keyp
              </div>
            </a>
            <div className="border border-blue-1200 p-4 rounded-md w-85">
              <a
                href="https://calendly.com/joseph-keyp/onboaring"
                target="_blank"
                className="flex font-bold hover:underline"
                rel="noreferrer"
              >
                Schedule call
              </a>
              <div className="flex text-left">
                Call us to discuss how Keyp empowers your users to effortlessly
                manage their digital assets
              </div>
            </div>
            <a
              href="https://github.com/UseKeyp"
              target="_blank"
              className="flex flex-col border border-blue-1200 p-4 rounded-md w-85"
              rel="noreferrer"
            >
              <div className="flex font-bold hover:underline">
                Join the Community
              </div>
              <div className="flex text-left">
                Get help, contribute to our open-source repos, and collaborate
                together on Keyp
              </div>
            </a>
            <div className="border border-blue-1200 p-4 rounded-md w-85">
              <a
                href="https://twitter.com/usekeyp"
                target="_blank"
                className="flex font-bold hover:underline"
                rel="noreferrer"
              >
                Become a contributor
              </a>
              <div className="flex text-left">
                Want to get involved with Keyp? We're hiring! Reach out to us on
                Twitter to discuss opportunities.
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-x-2 p-8">
          <a
            className="flex"
            href="https://twitter.com/usekeyp"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="twitter" />
          </a>
          <a
            className="flex"
            href="https://github.com/UseKeyp"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" />
          </a>
        </div>
      </div>
    </>
  )
}

export default HomePage
