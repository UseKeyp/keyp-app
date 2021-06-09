import BannerWhiteWon from './banner-white-won.svg'
import blackChest from './black-chest.png'

const RarityFlag = ({ color }) => {
  return (
    <svg
      className="game-card-rarity-flag"
      width="75"
      height="119"
      viewBox="0 0 75 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75.0001 27L38 0L0 27L-5.1798e-06 118.5L38 86.5L75.0001 118.5L75.0001 27Z"
        fill={color}
      />
    </svg>
  )
}

const GameCard = ({
  blackPlayer,
  edition,
  gifUrl,
  matchId,
  numMoves,
  openingText,
  rarityFlagColor,
  title,
  variantText,
  whitePlayer,
  winner,
  wonByText,
}) => {
  let winnerText = 'Draw!'

  if (winner === 'BLACK') {
    winnerText = 'Black Won!'
  } else if (winner === 'WHITE') {
    winnerText = 'White Won!'
  }

  return (
    <div className="game-card-container">
      <div className="game-card-num-moves">{numMoves}</div>
      <h2 className="game-card-title">{title}</h2>
      <img
        alt="GIF of chess match"
        className="game-card-match-gif"
        src={gifUrl}
      />
      <div className="game-card-mid-section">
        <div className="game-card-winner-text">{winnerText}</div>
        <div className="game-card-users-text">
          {whitePlayer}
          <span className="text-white">{blackPlayer}</span>
        </div>
        <BannerWhiteWon className="game-card-winning-banner" />
      </div>
      <div className="game-card-details">
        <div>
          Won by: <span className="font-black">{wonByText}</span>
        </div>
        <div>
          Variant: <span className="font-black">{variantText}</span>
        </div>
        <div className="font-black">{openingText}</div>
      </div>
      <div className="game-card-bottom-bar font-black">
        <div className="game-card-edition">
          <span className="capitalize">{edition}</span> Edition
        </div>
        <div>Match #{matchId}</div>
        <div className="game-card-rarity-container">
          <RarityFlag color={rarityFlagColor} />
          <img
            className="game-card-treasure-chest"
            src={blackChest}
            alt="white treasure chest"
          />
        </div>
      </div>
    </div>
  )
}

export default GameCard
