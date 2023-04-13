import React from 'react'

import { Icon } from '@usekeyp/components-soft-ui'

import WalletInitializationSpinner from 'src/components/WalletInitializationSpinner/WalletInitializationSpinner'

const LoadingScreen = () => {
  return (
    <div className="flex flex-col w-full min-h-screen flex-grow items-center justify-center">
      <div className="pb-16 pl-16 pr-16">
        <WalletInitializationSpinner />
      </div>
      <div className="flex text-base text-gray-1200">
        Setting up your wallet.
      </div>
      <div className="flex items-center text-[9px] text-gray-800 gap-x-1 mt-2">
        Powered by{' '}
        <div className="pt-0.5">
          <Icon
            color="fill-[#B0B6C1]"
            height="10.5px"
            width="30px"
            name="keypnameandlogogray"
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
