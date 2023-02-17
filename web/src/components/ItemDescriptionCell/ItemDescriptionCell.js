import { useState } from 'react'

import Icon from 'src/components/Icon/Icon'
import Tooltip from 'src/components/Tooltip/Tooltip'
export const ItemDescriptionCell = ({
  title,
  tokenOrAddress,
  description,
  children,
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
      <div className="mt-4 flex flex-col items-start justify-between gap-y-2 gap-x-4 overflow-scroll rounded-md border border-gray-800 p-4 sm:flex-row sm:p-6">
        <div className="flex flex-col">
          <div className="flex font-bold text-gray-1600">{title}</div>
          <div className="flex flex-row gap-x-1">
            <div className="flex text-sm text-gray-1600 sm:text-base">
              {tokenOrAddress ? tokenOrAddress : <div>Unavailable</div>}
            </div>
            {tokenOrAddress ? (
              <button
                className="group flex"
                onClick={() => {
                  handleCopy()
                }}
              >
                <Tooltip
                  id="access-token"
                  delayHideTime={250}
                  effect="solid"
                  borderColor="#C6CED2"
                  bgColor="#eef0f2"
                  position="top"
                  tooltipChild={
                    <div className="p-0.5 text-gray-2400">{copySuccess}</div>
                  }
                >
                  <Icon
                    color="fill-blue-1200 group-hover:fill-blue-1600 mt-1"
                    height="20"
                    width="20"
                    name="copy"
                  />
                </Tooltip>
              </button>
            ) : (
              <></>
            )}
          </div>
          {children}
        </div>
        <div className="flex max-w-3xl font-light text-gray-1600">
          {description}
        </div>
      </div>
    </>
  )
}
