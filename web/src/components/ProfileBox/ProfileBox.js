const ProfileBox = (props) => {
  const { address, name, date, treasuresAmount, balance, score /* avatar */ } =
    props

  return (
    <div className="profileBox">
      <div className="profileBox__avatarWrapper flex justify-between items-center">
        {/* Avatar */}
      </div>
      <div className="profileBox__contentWrapper flex flex-col flex-1 justify-between">
        <div className="profileBox__contentWrapper__inner flex justify-between">
          <div className="profileBox__content flex flex-col justify-between">
            <p>Date joined: {date}</p>
            <div>
              <p>{name}</p>
              <p>Chess score: {score}</p>
            </div>
          </div>
          <div className="profileBox__content flex flex-col justify-between items-end text-right">
            <p>Treasures: {treasuresAmount}</p>
            <p>
              $
              {balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="profileBox__addressWrapper">
          <p>{address}</p>
        </div>
      </div>
    </div>
  )
}

ProfileBox.defaultProps = {
  score: 0,
  balance: 0,
  treasuresAmount: 0,
}

export default ProfileBox
