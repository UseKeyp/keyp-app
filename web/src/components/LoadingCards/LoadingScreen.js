import React from 'react'
import { Icon } from '@usekeyp/components-soft-ui'

const LoadingScreen = () => {
  return (
    <div className="flex flex-col w-full min-h-screen flex-grow items-center justify-center">
      <Icon height="264px" width="264px" name="keypnameandlogo" />
      <div className="flex text-lg font-light">
        Setting up your wallet for Keyp...
      </div>
    </div>
  )
}

export default LoadingScreen
