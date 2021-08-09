import PropTypes from 'prop-types'

const WHITE = 'white'
const BLACK = 'black'

const TwoPlayers = ({ username, oponent, color }) => {
  return (
    <div className="flex flex-col twoPlayers">
      <div className="flex items-center twoPlayers__player-wrapper">
        <div className="twoPlayers__box twoPlayers__box--white"></div>
        <p className="twoPlayers__text">
          {color === WHITE ? username : oponent}
        </p>
      </div>
      <div className="flex items-center twoPlayers__player-wrapper">
        <div className="twoPlayers__box twoPlayers__box--black"></div>
        <p className="twoPlayers__text">
          {color === BLACK ? username : oponent}
        </p>
      </div>
    </div>
  )
}

TwoPlayers.propTypes = {
  username: PropTypes.string.isRequired,
  oponent: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default TwoPlayers
