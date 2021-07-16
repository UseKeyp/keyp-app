import React from 'react'

const Cell = ({ children, style }) => {
  return (
    <div className="flex items-center justify-center p-2 m-2" style={style}>
      {children}
    </div>
  )
}

export default Cell
