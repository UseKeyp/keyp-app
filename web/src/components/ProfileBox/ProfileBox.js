import PropTypes from 'prop-types'
import Avatar from 'src/components/Avatar'
import { isMobile } from 'src/utils/helpers'
import config from 'src/global.config'

import treasureLogo from './treasure_chess_logo.png'
import ExtUrl from './external_url.svg' //TODO Replace it when <Icon> component is done

const ProfileBox = (props) => {
  const { address, name, date, treasuresAmount, balance, score, avatar } = props

  const url = `${config.baseUrl}${address}`

  return (
    <div className="profileBox">
      <div className="profileBox__avatarWrapper flex justify-between items-center">
        <Avatar size={isMobile ? 64 : 165} image={avatar} />
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
          <div className="profileBox__content flex flex-col justify-between text-right">
            <div className="flex items-end flex-wrap justify-end">
              <p className="profileBox__text profileBox__text--small">
                <span className="profileBox__coloredText">Treasures:</span>{' '}
              </p>
              <div className="profileBox__logoWrapper profileBox__text flex items-start">
                <img
                  className="profileBox__logo"
                  src={treasureLogo}
                  aria-hidden
                  alt=""
                />{' '}
                <span>{treasuresAmount}</span>
              </div>
            </div>
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
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          >
            {address} <ExtUrl />
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
ProfileBox.propTypes = {
  address: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  balance: PropTypes.number,
  score: PropTypes.number,
  treasuresAmount: PropTypes.number,
}

export default ProfileBox
