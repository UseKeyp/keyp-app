import * as React from 'react'

const AvailableConnections = (props) => {
  const [isConnected, setIsConnected] = React.useState(false)

  return (
    <div className="rounded-xl max-w-[240px] bg-chessBlack-300">
      <div className="text-center text-2xl font-bold text-white pt-2 pb-2">
        {props.title}
      </div>
      <div className="flex shrink justify-center">
        <img src={props.src} alt="connection-icon" />
      </div>
      <div>
        <div className="text-center text-white text-sm pt-2">
          {props.description}
        </div>
      </div>
      <div className="flex justify-center text-center">
        <button onClick={() => setIsConnected(!isConnected)}>
          {!isConnected && (
            <button className="text-xl text-blueLink">Connect</button>
          )}
          {isConnected && (
            <button className="text-xl text-red">Disconnect</button>
          )}
        </button>
      </div>
    </div>
  )
}

export default AvailableConnections
