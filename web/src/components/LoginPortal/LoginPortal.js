import { useEffect } from 'react'

import { Button, Icon } from '@usekeyp/components-soft-ui-testing'

import { useAuth } from '@redwoodjs/auth'
import { routes, navigate, useParams } from '@redwoodjs/router'

import { saveRedirectTo } from 'src/providers/redirection'
import { useToast } from 'src/providers/toast'

const LoginPortal = () => {
  const { signUp, isAuthenticated, reauthenticate } = useAuth()
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex max-w-2">
        <Icon height="264px" width="264px" name="keypnameandlogo" />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="text-gray-1200">{t('Sign In')}</div>
        <Button
          onClick={() => onSubmitSignUp('DISCORD')}
          classNameVariant="hover:bg-[#5865F2] hover:border-[#5865F2] w-[327px]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
        >
          <Icon name="discord" />
        </Button>
        <Button
          onClick={() => onSubmitSignUp('GOOGLE')}
          classNameVariant="hover:bg-[#4285F4] hover:border-[#4285F4] w-[327px]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
        >
          <Icon name="google" />
        </Button>
        <Button
          onClick={() => onSubmitSignUp('NODE_OIDC')}
          classNameVariant="hover:bg-[#4285F4] hover:border-[#4285F4] w-[327px]"
          borderColor="border-[#E5E7EB]"
          fluid={true}
        >
          <div className="text-black">NODE_OIDC</div>
        </Button>
        <Button
          onClick={() => onSubmitSignUp('NODE_OIDC')}
          classNameVariant="hover:bg-[#6c9d41] hover:border-[#6c9d41] w-[327px]"
          borderColor="border-[#E5E7EB]"
          fluid={false}
        >
          <Icon
            height="300px"
            width="400px"
            color="fill-black group-hover:fill-white"
            name="chess_com"
          />
        </Button>
        {errorText && <div className="mt-2 rw-cell-error">{errorText}</div>}
      </div>
    </div>
  )
}

export default LoginPortal
