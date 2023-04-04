import { useState } from 'react'

import { Icon } from '@usekeyp/components-soft-ui'

export const MoreAccordion = ({ title, open, children }) => {
  const [isOpen, setIsOpen] = useState(open)

  return (
    <div className="flex min-h-[48px] w-full flex-col rounded-lg border border-gray-300 sm:w-[320px]">
      <button
        className="flex cursor-pointer items-center justify-between px-3 pt-3.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-bold font-normal text-gray-2400">
          {title}
        </h2>
        <button className="flex items-center justify-center rounded-full">
          {isOpen ? (
            <Icon name="arrow_up" height="8" width="14" />
          ) : (
            <Icon name="arrow_down" height="8" width="14" />
          )}
        </button>
      </button>
      {isOpen && <div className="flex pt-4 pb-4">{children}</div>}
    </div>
  )
}
