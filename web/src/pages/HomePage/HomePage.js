import {Icon} from "@usekeyp/components-soft-ui";

const HomePage = () => {
  return <>
    <div className="flex justify-center">
      <div className="flex flex-col text-center">
        <h1 className="text-black text-4xl font-sans">Welcome to <h1 className="invisible text-xs">Keyp</h1></h1>
        <div className="flex justify-center">
          <Icon height="132px" width="264px" name="keypnameandlogo"/>
        </div>
        <h2 className="text-black font-sans">More coming soon...</h2>
        <div className="flex flex-row justify-center gap-x-2 mt-8">
          <a href="https://docs.usekeyp.com/" target="_blank"
             className="flex flex-col border border-blue-1200 p-4 rounded-md w-50">
            <div className="flex font-bold">Docs & How To's</div>
            <div className="flex text-left">Start here to learn how to build with Keyp</div>
          </a>
          <div className="border border-blue-1200 p-4 rounded-md w-50">
            <div className="flex font-bold">Schedule call</div>
            <div className="flex text-left">Call us to discuss how Keyp empowers your users to effortlessly manage their
              digital assets
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
}

export default HomePage
