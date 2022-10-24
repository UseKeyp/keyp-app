import * as React from 'react'

const AssetCard = (props) => {
  return (
    <div className="rounded-xl bg-chessBlack-300">
      <div className="flex flex-row p-2">
        <img className="w-10" alt="Asset Icon" src={props.src} />
        <div className="flex flex-col text-xl ml-4">
          <div className="font-bold">{props.asset}</div>
          <div className="text-sm">{props.description}</div>
        </div>
        <div className="text-2xl pt-2 flex whitespace-nowrap justify-end flex-grow align-middle">
          {props.balance} {props.acronym}
        </div>
      </div>
    </div>
  )
}
export default AssetCard
