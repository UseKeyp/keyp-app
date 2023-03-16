import { useState } from 'react'

import Icon from 'src/components/Icon/Icon'

export const MoreAccordion = ({ title, open, children }) => {
  const [isOpen, setIsOpen] = useState(open)

  return (
    <div className="flex flex-col min-h-[48px] rounded-lg border border-gray-300 w-full sm:w-[320px]">
      <div
        className="flex items-center pt-2 px-3 justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-bold text-gray-2400 font-normal">
          {title}
        </h2>
        <button className="flex items-center justify-center rounded-full">
          {isOpen ? (
            <Icon name="arrow_up" height="8" width="14" />
          ) : (
            <Icon name="arrow_down" height="8" width="14" />
          )}
        </button>
      </div>
      {isOpen && <div className="flex pt-4 pb-4">{children}</div>}
    </div>
  )
}
