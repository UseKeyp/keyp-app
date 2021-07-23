import React from 'react'

const Row = ({ children, onClick, className, index, isSelected }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onClick()
  }
  return (
    <div
      className={`table-component-row flex p-2 ${className ? className : ''}`}
      role={'row'}
      aria-rowindex={index ? index : undefined}
    >
      <div
        className={`flex table-component-row-inner ${
          isSelected ? 'row-active' : ''
        }`}
        role={'presentation'}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </div>
  )
}

export default Row
