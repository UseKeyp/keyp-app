import { Icon, Button } from '@usekeyp/components-soft-ui-testing'

import { routes, Link } from '@redwoodjs/router'

import LoadingScreen from 'src/components/LoadingCards/LoadingScreen'
import { useRedirection } from 'src/providers/redirection'

const Redirect = ({ type }) => {
  const { errorMessage, successMessage, isLoading } = useRedirection()
  if (isLoading) return <LoadingScreen />

  let callToAction
  let iconName = type
  if (['chess', 'node_oidc', 'discord'].includes(type)) {
    switch (type) {
      case 'chess': {
        iconName = 'chess_com'
        break
      }
      case 'node_oidc': {
        iconName = 'google'
        break
      }
      case 'discord': {
        iconName = 'discord'
        break
      }
    }
    if (successMessage) {
      callToAction = (
        <Link to={routes.profile()}>
          <Button
            classNameVariant="hover:bg-[#005285]"
            borderColor="border-black"
            fluid={false}
          >
            <div className="flex justify-center">
              <div className="text-black">See Profile</div>
            </div>
          </Button>
        </Link>
      )
    } else {
      callToAction = (
        <Link to={routes.login()}>
          <Button
            classNameVariant="hover:bg-gray-400"
            borderColor="border-black"
            fluid={false}
          >
            <div className="flex">
              <div className="text-black">Try Again</div>
            </div>
          </Button>
        </Link>
      )
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow flex-col w-full justify-center align-center items-center">
        <div className="flex flex-col items-center">
          <Link to={routes.home()}>
            <Icon height="264px" width="264px" name="keypnameandlogo" />
          </Link>
          <div className="flex flex-col border-gray-1600 text-center text-lg">
            {!successMessage && (
              <div className="text-center font-bold">
                Selected Login Provider
              </div>
            )}
            <div className="text-green-1600">{successMessage}</div>
            <div
              className={`flex justify-center rounded-lg p-2 border-2 border-${
                successMessage ? `green-1600` : `gray-1600`
              }`}
            >
              <div className="flex justify-center">
                <Icon
                  height="300px"
                  width="400px"
                  color="fill-black group-hover:fill-white"
                  name={iconName}
                />
              </div>
            </div>
            <div className="flex flex-col">
              {typeof errorMessage === 'string' ? (
                <>
                  <h2 className="mt-4 text-lg text-yellow-500 tracking-tight">
                    Oops, there was an issue:
                  </h2>
                  <h3 className="mt-2 font-bold text-lg text-yellow-500">
                    {errorMessage.substring(0, 200)}
                  </h3>
                </>
              ) : null}
            </div>
            <div className="flex justify-center mt-4">
              {callToAction || <p className="mt-8 ">You can close this page</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Redirect
