import winIndicatorWhite from './win-indicator-white.png'
import winIndicatorBlack from './win-indicator-black.png'
import winIndicatorDraw from './win-indicator-draw.png'
import chessBoardIcon from './chess-board-icon.png'
import winIndicatorBlackWhiteEd from './win-indicator-black__white-ed.png'
import winIndicatorWhiteWhiteEd from './win-indicator-white__white-ed.png'
import winIndicatorDrawWhiteEd from './win-indicator-draw__white-ed.png'
import clockIcon from './clock-icon.png'
import ColoredBanner from './ColoredBanner'

import './styles.scss'

const GameCard = ({
  bannerColors, // Type: array - [lightColorHexString, darkColorHexString]
  edition,
  gameTypeString,
  gifUrl,
  lengthOfGameString,
  matchDate, // Type: JS Date object
  matchId,
  notableFeatures,
  players,
  title,
  winner,
  wonByText,
}) => {
  const isWhiteEdition = edition === 'WHITE'
  const isDraw = winner === 'DRAW'

  let winnerText = 'Draw!'
  let winIndicatorBanner = isWhiteEdition
    ? winIndicatorDrawWhiteEd
    : winIndicatorDraw
  if (winner === 'BLACK') {
    winIndicatorBanner = isWhiteEdition
      ? winIndicatorBlackWhiteEd
      : winIndicatorBlack
    winnerText = 'Black Wins!'
  } else if (winner === 'WHITE') {
    winIndicatorBanner = isWhiteEdition
      ? winIndicatorWhiteWhiteEd
      : winIndicatorWhite
    winnerText = 'White Wins!'
  }

  const [player1, player2] = players

  console.log('isWhiteEdition', isWhiteEdition)

  return (
    <div
      className={`game-card-container bg-white text-black relative box-content ${
        isWhiteEdition ? 'is-white-edition' : ''
      }`}
      style={{
        borderColor: isWhiteEdition ? '#BEBDB9' : '#000000',
        color: isWhiteEdition ? '#4B4847' : '#ffffff',
      }}
    >
      <h2 className="game-card-title-cont">{title}</h2>
      <div className="inner-container">
        <div className="top-row-container">
          <div className="profile-container">
            <div
              alt="player 1"
              className="player-pic"
              style={{ backgroundImage: `url(${player1.profilePicSrc})` }}
            />
            <div className="username-text">{player1.username}</div>
            <div className="user-number-text">{player1.userNumber}</div>
          </div>
          <div className="center-info">
            <img
              className="win-indicator-background"
              style={{
                marginLeft: winner !== 'WHITE' ? 'auto' : undefined,
                marginRight: isDraw ? 'auto' : undefined,
              }}
              src={winIndicatorBanner}
              alt=""
            />
            <div
              style={{ textShadow: isWhiteEdition ? 'none' : undefined }}
              className="winner-text"
            >
              {winnerText}
              <div className="winner-subtext">by {wonByText}</div>
            </div>
          </div>
          <div className="profile-container profile-container_right">
            <div
              alt="player 2"
              className="player-pic"
              style={{ backgroundImage: `url(${player2.profilePicSrc})` }}
            />
            <div className="username-text">{player2.username}</div>
            <div className="user-number-text">{player2.userNumber}</div>
          </div>
        </div>
        <img
          alt="GIF of chess match"
          className="game-card-match-gif"
          src={gifUrl}
        />
        <div className="feature-list-container">
          <ul className="list-disc feature-list">
            {notableFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div
          className="bottom-info-bar"
          style={{ backgroundColor: isWhiteEdition ? '#B6B5B2' : '#292929' }}
        >
          <div className="flex bottom-bar-info-datum">
            <img alt="" src={chessBoardIcon} className="bottom-bar-icon" />
            {gameTypeString}
          </div>
          <div className="flex bottom-bar-info-datum">
            <img alt="" src={clockIcon} className="bottom-bar-icon" />
            {lengthOfGameString}
          </div>
          <div className="colored-banner-container">
            <ColoredBanner
              lightColor={bannerColors[0]}
              darkColor={bannerColors[1]}
              height={26}
            />
          </div>
        </div>
        <div className="footer-bar">
          <div>
            <span className="green-text">
              <span className="capitalize">{edition.toLowerCase()}</span>{' '}
              Edition
            </span>{' '}
            {/* Does this need to be configurable - I thought there's always only one edition of each type */}
            1/1
          </div>
          <div className="middle-item">
            <span className="green-text">Match</span> #{matchId}
          </div>
          <div className="right-item">
            {matchDate.toLocaleString('default', { month: 'long' })}{' '}
            <span className="green-text">{matchDate.getDate()}</span>{' '}
            {matchDate.getFullYear()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
