import { Icon } from '@usekeyp/components-soft-ui-testing'

const HomePage = () => {
  return (
    <>
      <div className="flex h-screen flex-col text-center">
        <div className="m-auto flex flex-col">
          <h1 className="font-sans text-4xl text-black">Welcome to</h1>
          <div className="flex justify-center">
            <Icon height="132px" width="264px" name="keypnameandlogo" />
          </div>
          <h2 className="font-sans text-black">More coming soon...</h2>
          <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="w-85 rounded-md border border-blue-1200 p-4">
                <a
                href="https://docs.UseKeyp.com"
                target="_blank"
                className="flex font-bold hover:underline"
                rel="noreferrer"
              >
                Docs & How To's
              </a>
              <div className="flex text-left">
                Start here to learn how to build with Keyp
              </div>
            </div>
            <div className="w-85 rounded-md border border-blue-1200 p-4">
              <a
                href="https://schedule.usekeyp.com"
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
            <div className="w-85 rounded-md border border-blue-1200 p-4">
                <a
                href="https://github.com/UseKeyp"
                target="_blank"
                className="flex font-bold hover:underline"
                rel="noreferrer"
              >
                Join the Community
              </a>
              <div className="flex text-left">
                Get help, contribute to our open-source repos, and collaborate
                together on Keyp
              </div>
            </div>
            <div className="w-85 rounded-md border border-blue-1200 p-4">
               <a
                href="https://UseKeyp.com/jobs"
                target="_blank"
                className="flex font-bold hover:underline"
                rel="noreferrer"
              >
                Join the Team
              </a>
              <div className="flex text-left">
                Want to get involved with Keyp? We're hiring!
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
