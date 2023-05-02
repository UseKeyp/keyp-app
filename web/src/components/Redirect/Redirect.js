import { Button } from '@usekeyp/components-soft-ui'

import { routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import LoadingScreen from 'src/components/LoadingCards/LoadingScreen'
import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'
import { useRedirection } from 'src/providers/redirection'

const Redirect = () => {
  const { errorMessage, isLoading } = useRedirection()
  const customErrorObject = getCustomErrorObject(errorMessage)

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
          <div className="flex flex-col items-center font-light md:flex-row">
            <div>Add redirect URLs in your</div>
            <a href="https://dev.usekeyp.com" rel="noreferrer">
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
        subheader: `(${errorMessage})`,
        iconSrc: '/general-url-redirect-error.png',
        iconHeight: '210px',
        iconWidth: '191px',
        description: (
          <div className="flex flex-col items-center md:flex-row">
            <div>Go back to the</div>
            <a href="https://dev.usekeyp.com" rel="noreferrer">
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
    <>
      <MetaTags title="Redirect" description="Redirecting" />
      <DefaultLayout>
        <main className="flex justify-center">
          <section className="flex items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center gap-y-4 text-center">
              <h1 className="mt-8 flex text-[34px] font-light text-gray-1200 sm:mt-16 sm:mt-0">
                {customErrorObject?.header}
              </h1>
              <p className="text-[16px] font-normal text-gray-1200">
                {customErrorObject?.subheader}
              </p>
              <img
                src={customErrorObject?.iconSrc}
                height={customErrorObject?.iconHeight}
                width={customErrorObject?.iconWidth}
                className="flex"
                alt="page not found"
              />
              <div className="mt-8 flex items-center text-[16px] font-normal text-gray-1200">
                {customErrorObject?.description}
              </div>
            </div>
          </section>
        </main>
      </DefaultLayout>
    </>
  )
}

export default Redirect
