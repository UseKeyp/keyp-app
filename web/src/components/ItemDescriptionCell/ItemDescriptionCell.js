import { useState } from 'react'

import Icon from 'src/components/Icon/Icon'
import Tooltip from 'src/components/Tooltip/Tooltip'
export const ItemDescriptionCell = ({
  title,
  tokenOrAddress,
  description,
  children,
  tooltipID,
}) => {
  const [copySuccess, setCopySuccess] = useState('Copy')
  function handleCopy() {
    navigator.clipboard.writeText(tokenOrAddress ? tokenOrAddress : '')
    setCopySuccess('Copied!')
    setTimeout(() => {
      setCopySuccess('Click to copy')
    }, 2000)
  }

  return (
    <>
      <div className="mt-4 grid gap-y-8 overflow-scroll rounded-md border border-gray-800 p-4 sm:p-6 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="flex text-[16px] font-bold text-gray-1600">
            {title}
          </div>
          <div className="flex flex-row gap-x-1">
            <div className="flex break-all border border-gray-100 bg-gray-100 p-2 text-[16px] text-gray-2400 sm:break-normal sm:text-base">
              <div className="flex items-center gap-x-2">
                {tokenOrAddress ? tokenOrAddress : <div>Unavailable</div>}
                {tokenOrAddress ? (
                  <button
                    className="group flex"
                    onClick={() => {
                      handleCopy()
                    }}
                  >
                    <Tooltip
                      id={tooltipID}
                      delayHideTime={250}
                      effect="solid"
                      borderColor="#C6CED2"
                      bgColor="#eef0f2"
                      position="top"
                      tooltipChild={
                        <div className="p-0.5 text-gray-2400">
                          {copySuccess}
                        </div>
                      }
                    >
                      <Icon
                        color="fill-blue-1200 group-hover:fill-blue-1600 h-[32px] w-[26px] sm:h-[16px] sm:w-[13px]"
                        name="copy"
                      />
                    </Tooltip>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {children}
        </div>
        <div className="flex font-light text-gray-1600">{description}</div>
      </div>
    </>
  )
}
