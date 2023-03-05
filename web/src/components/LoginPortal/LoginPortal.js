import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import { saveRedirectTo } from 'src/providers/redirection'
import { useToast } from 'src/providers/toast'

const LoginPortal = () => {
  const { signUp, reauthenticate } = useAuth()
  const { error, redirectTo } = useParams()
  const { toast } = useToast()
  const [errorText, setErrorText] = React.useState('')
  const getErrorText = (error) => {
    if (error === 'expired') return `Session expired, please log in again.`
  }

  const onSubmitSignUp = async (type) => {
    const response = await signUp({ type })
    if (response.url) {
      window.location = response.url
    } else {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    if (redirectTo) {
      saveRedirectTo(redirectTo) && reauthenticate()
    }
  }, [redirectTo, reauthenticate])

  useEffect(() => {
    if (error) setErrorText(getErrorText(error))
  }, [error])

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(routes.profile())
  //   }
  // }, [isAuthenticated])

  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="max-w-2 flex sm:justify-center">
        <h1 className="flex mb-20 sm:flex-row flex-col gap-x-4 gap-y-2 text-center">
          <Icon height="60px" width="200px" name="keypnameandlogo" />
          <div className="mb-0 flex text-6xl font-light text-blue-1200 sm:mb-2">
            App
          </div>
        </h1>
      </div>
      <div className="mt-8 flex flex-col gap-y-4 items-start sm:items-center">
        <div className="flex flex-col w-full sm:w-[320px]">
          <div className="text-[16px] font-light text-gray-1600 pb-4">
            Log In or Sign Up
          </div>
          <Button
            onClick={() => onSubmitSignUp('DISCORD')}
            classNameVariant="hover:bg-[#5865F2] hover:border-[#5865F2] sm:w-[320px]"
            borderColor="border-[#E5E7EB]"
            fluid={true}
            position="start"
            alt="discord"
          >
            <div className="group flex flex-row gap-x-4 hover:text-white">
              <div className="flex pl-2">
                <Icon height="24" width="24" name="discord" />
              </div>
              <div className="flex font-light text-gray-1200 group-hover:text-white">
                Discord
              </div>
            </div>
          </Button>
        </div>
        <Button
          onClick={() => onSubmitSignUp('GOOGLE')}
          classNameVariant="hover:bg-[#4285F4] hover:border-[#4285F4] sm:w-[320px]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
          position="start"
          alt="google"
        >
          <div className="group flex flex-row items-center gap-x-6 hover:text-white sm:gap-x-4">
            <div className="flex pl-1.5">
              <Icon height="24" name="google" />
            </div>
            <div className="flex font-light text-gray-1200 group-hover:text-white">
              Google
            </div>
          </div>
        </Button>
        <Button
          onClick={() => onSubmitSignUp('TWITTER')}
          classNameVariant="hover:bg-[#4285F4] hover:border-[#4285F4] sm:w-[320px]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
          position="start"
          alt="twitter"
        >
          <div className="group flex flex-row items-center gap-x-6 hover:text-white sm:gap-x-4">
            <div className="flex pl-1.5">
              <Icon height="24" name="twitter" />
            </div>
            <div className="flex font-light text-gray-1200 group-hover:text-white">
              Twitter
            </div>
          </div>
        </Button>
        <Button
          onClick={() => onSubmitSignUp('CHESS')}
          classNameVariant="hover:bg-[#6c9d41] hover:border-[#6c9d41] sm:w-[320px]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
          position="start"
          alt="chess"
        >
          <div className="group flex flex-row items-center gap-x-4 hover:text-white">
            <div className="flex pl-2">
              <Icon height="24" width="24" name="chess_pawn" />
            </div>
            <div className="flex font-light text-gray-1200 group-hover:text-white">
              Chess.com
            </div>
          </div>
        </Button>
        {!['staging', 'prod'].includes(process.env.ENVIRONMENT) ? (
          <Button
            onClick={() => onSubmitSignUp('NODE_OIDC')}
            classNameVariant="hover:bg-[#005285] hover:border-[#005285] sm:w-[320px]"
            borderColor="border-[#E5E7EB]"
            fluid={true}
            position="start"
            alt="discord"
          >
            <div className="group flex flex-row items-center gap-x-4 hover:text-white">
              <div className="flex pl-2">
                <Icon height="24px" width="24px" name="keypcircle" />
              </div>
              <div className="flex font-light text-gray-1200 group-hover:text-white">
                Test Provider
              </div>
            </div>
          </Button>
        ) : (
          <></>
        )}
        {errorText && <div className="mt-2">{errorText}</div>}
        <h4 className="mt-20 text-center justify-center w-full">
          <a
            className="mr-4 text-[12px] font-light text-blue-1200"
            target="_blank"
            href="https://www.usekeyp.com/terms-of-use-privacy-policy#Terms-of-Use"
            rel="noreferrer"
          >
            Terms of Service
          </a>
          ·
          <a
            className="ml-4 text-[12px] font-light text-blue-1200"
            target="_blank"
            href="https://www.usekeyp.com/terms-of-use-privacy-policy#Privacy-Policy"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </h4>
      </div>
    </div>
  )
}

export default LoginPortal
