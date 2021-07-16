import React from 'react'

const Row = ({ children, onClick, className }) => {
  return (
    <div
      className={`${className} table-component-row flex p-2`}
      onClick={onClick}
    >
      <div className="flex table-component-row-inner">{children}</div>
    </div>
  )
}

export default Row
