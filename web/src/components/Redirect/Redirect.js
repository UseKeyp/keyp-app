import { Icon, Button } from '@usekeyp/components-soft-ui'

import { useAuth } from '@redwoodjs/auth'
import { routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import LoadingScreen from 'src/components/LoadingCards/LoadingScreen'
import UserAccount from 'src/components/UserAccount/UserAccount'
import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'
import { useRedirection } from 'src/providers/redirection'
import { logOut } from 'src/utils/auth/client'

const Redirect = () => {
  const { errorMessage, isLoading } = useRedirection()
  const customErrorObject = getCustomErrorObject(errorMessage)
  const { isAuthenticated, currentUser } = useAuth()

  const url = new URL(window.location.href)
  const state = decodeURIComponent(url.searchParams.get('state'))
  let uid = state.split(':')[1]

  function getCustomErrorObject(errorMessage) {
    if (errorMessage === 'redirect_uris must only contain strings') {
      return {
        header: "You're Missing Something",
        subheader: '(No redirect URL set for your client app)',
        iconSrc: '/no-url-redirect.gif',
        iconHeight: '228px',
        iconWidth: '480px',
        description: (
          <div className="flex flex-col md:flex-row font-light items-center">
            <div>Add redirect URLs in your</div>
            <a href="https://dev.usekeyp.com" target="_blank" rel="noreferrer">
              <Button
                variant="transparent"
                classNameVariant="m-2"
                borderColor="border-blue-1200"
                size="regular"
                fluid={false}
              >
                <div className="text-blue-1200">Dev Portal</div>
              </Button>
            </a>
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
        ),
      }
    } else {
      return {
        header: "We're not where we expected to be",
        subheader: '(Some other redirect error)',
        iconSrc: '/general-url-redirect-error.png',
        iconHeight: '210px',
        iconWidth: '191px',
        description: (
          <div className="flex flex-col md:flex-row items-center">
            <div>Add redirect URLs in your</div>
            <a href="https://dev.usekeyp.com" target="_blank" rel="noreferrer">
              <Button
                variant="transparent"
                classNameVariant="m-2"
                borderColor="border-blue-1200"
                size="regular"
                fluid={false}
              >
                <div className="text-blue-1200">Dev Portal</div>
              </Button>
            </a>
            <div className="flex">or get in touch with us on</div>
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
        ),
      }
    }
  }

  if (
    !uid &&
    (errorMessage === 'End-User aborted interaction' ||
      errorMessage ===
        'The resource owner or authorization server denied the request.')
  ) {
    navigate(routes.home())
  }

  if (uid && errorMessage) {
    const url = `/oauth/interaction/${uid}/abort`
    window.location.replace(url)
  }

  if (isLoading) return <LoadingScreen />

  return (
    <DefaultLayout>
      <MetaTags title="Redirect" description="Redirecting" />
      <div className="flex sm:flex-row justify-between flex-col items-start gap-x-4 gap-y-2 mt-8">
        <div className="flex gap-y-2 gap-x-4 flex-row sm:gap-y-0">
          <Icon name="keypnameandlogo" height="48px" width="164px" />
          <h1 className="flex text-5xl font-light text-blue-1200">App</h1>
        </div>
        {isAuthenticated ? (
          <UserAccount currentUser={currentUser} logOut={logOut} />
        ) : (
          <></>
        )}
      </div>
      <main className="absolute inset-0">
        <section className="flex h-screen justify-center items-center text-center">
          <div className="flex flex-col gap-y-4 text-center items-center justify-center">
            <h1 className="text-gray-1200 text-[34px] font-light mt-8 md:mt-0">
              {customErrorObject?.header}
            </h1>
            <p className="text-gray-1200 text-[16px]">
              {customErrorObject?.subheader}
            </p>
            <img
              src={customErrorObject?.iconSrc}
              height={customErrorObject?.iconHeight}
              width={customErrorObject?.iconWidth}
              className="flex"
              alt="page not found"
            />
            <div className="flex text-gray-1200 text-[16px] items-center mt-8">
              {customErrorObject?.description}
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  )
}

export default Redirect
