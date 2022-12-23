import { Icon } from '@usekeyp/components-soft-ui'

const HomePage = () => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <Icon height="66px" width="132px" name="keypnameandlogo" />
        <div className="flex gap-x-8 text-blue-1200 font-sans items-center">
          <a href="https://docs.usekeyp.com/" target="_blank" rel="noreferrer">
            Features
          </a>
          <a href="https://docs.usekeyp.com/" target="_blank" rel="noreferrer">
            Get Started
          </a>
          <a href="https://docs.usekeyp.com/" target="_blank" rel="noreferrer">
            Docs
          </a>
          <a href="https://docs.usekeyp.com/" target="_blank" rel="noreferrer">
            We're Hiring
          </a>
        </div>
      </div>
      <div className="flex mt-16">
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-4">
            <h1 className="flex flex-col text-black text-4xl font-bold tracking-wide">
              <div className="flex text-green-1600">Familiar Interface,</div>{' '}
              <div className="flex text-blue-1200">Endless Possibilities</div>
            </h1>
            <h2 className="flex text-black font-sans font-light max-w-xl">
              Improve onboarding and payments in your games & apps effortlessly
              with OAuth logins and debit card transactions. Use simple API
              calls to verify users, create, transfer & airdrop assets.
            </h2>
          </div>
          <div className="flex justify-center">
            <Icon height="132px" width="264px" name="keypnameandlogo" />
          </div>
          <h2 className="text-black font-sans">More coming soon...</h2>
          <div className="flex flex-row justify-center gap-x-2 mt-8">
            <a
              href="https://docs.usekeyp.com/"
              target="_blank"
              className="flex flex-col border border-blue-1200 p-4 rounded-md w-50"
              rel="noreferrer"
            >
              <div className="flex font-bold">Docs & How To's</div>
              <div className="flex text-left">
                Start here to learn how to build with Keyp
              </div>
            </a>
            <div className="border border-blue-1200 p-4 rounded-md w-50">
              <div className="flex font-bold">Schedule call</div>
              <div className="flex text-left">
                Call us to discuss how Keyp empowers your users to effortlessly
                manage their digital assets
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
