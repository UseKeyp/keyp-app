import Avatar from 'src/components/Avatar'
import { isMobile } from 'src/utils/helpers'
import config from 'src/global.config'

const ProfileBox = (props) => {
  const { address, name, date, treasuresAmount, balance, score, avatar } = props

  const url = `${config.baseUrl}${address}`

  return (
    <div className="profileBox">
      <div className="profileBox__avatarWrapper flex justify-between items-center">
        <Avatar size={isMobile ? 64 : 165} image={avatar} />
        {/* Avatar */}
      </div>
      <div className="profileBox__contentWrapper flex flex-col flex-1 justify-between">
        <div className="profileBox__contentWrapper__inner flex justify-between">
          <div className="profileBox__content flex flex-col justify-between">
            <p className="profileBox__text profileBox__text--small">
              <span className="profileBox__coloredText">Date joined:</span>{' '}
              {date}
            </p>
            <div className="profileBox__content__inner">
              <p className="profileBox__text">{name}</p>
              <p className="profileBox__text profileBox__text--small">
                <span className="profileBox__coloredText">Chess score:</span>{' '}
                {score}
              </p>
            </div>
          </div>
          <div className="profileBox__content flex flex-col justify-between items-end text-right">
            <p className="profileBox__text profileBox__text--small">
              <span className="profileBox__coloredText">Treasures:</span>{' '}
              {treasuresAmount}
            </p>
            <p className="profileBox__text profileBox__coloredText">
              $
              {balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="profileBox__addressWrapper">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {address}
          </a>
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
