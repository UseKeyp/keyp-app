import * as React from 'react'
import { trimAddress } from 'src/utils/helpers'

const ProfileCard = (props) => {
  const address = trimAddress(props.address) || 'No address set'

  return (
    <div className="max-width-container">
      <div className="max-w-[480px] rounded-xl bg-chessBlack-300 p-2">
        <div className="flex shrink justify-left ml-4 mt-4">
          <img src={props.src} width="100px" />
          <div className="flex flex-col text-left">
            <div className="text-xl text-white ml-2">{props.name}</div>
            <div className="text-xl font-bold text-white ml-2 pb-2">
              {props.username}
            </div>
            <div className="text-left text-white text-sm pl-2 pt-2 pr-4">
              {props.description}
            </div>
          </div>
        </div>
        <div className="text-left pb-2 pl-6 text-white text-xs italic">
          {address}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
