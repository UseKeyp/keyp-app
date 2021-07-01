import BannerWhiteWon from './banner-white-won.svg'
import blackChest from './black-chest.png'

const RarityFlag = ({ color }) => {
  return (
    <svg
      className="game-card-rarity-flag absolute w-full right-0"
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
    <div className="game-card-container bg-white text-black relative box-content">
      <div className="game-card-num-moves absolute bg-white text-4xl flex items-center justify-center font-black">
        {numMoves}
      </div>
      <h2 className="game-card-title text-2xl absolute font-black">{title}</h2>
      <img
        alt="GIF of chess match"
        className="game-card-match-gif"
        src={gifUrl}
      />
      <div className="relative w-full h-24 bg-black">
        <div className="z-index-3 h-12 text-4xl font-black flex items-center justify-center absolute left-0 right-0 uppercase">
          {winnerText}
        </div>
        <div className="z-index-3 h-12 text-sm font-black flex items-center justify-around absolute bottom-0 left-0 right-0">
          {whitePlayer}
          <span className="text-white">{blackPlayer}</span>
        </div>
        <BannerWhiteWon className="game-card-winning-banner absolute" />
      </div>
      <div className="game-card-details text-sm font-bold h-32 w-full flex flex-col justify-between">
        <div>
          TODOD DELETETHIS TEXT Won by:{' '}
          <span className="font-black">{wonByText}</span>
        </div>
        <div>
          Variant: <span className="font-black">{variantText}</span>
        </div>
        <div className="font-black">{openingText}</div>
      </div>
      <div className="absolute bottom-0 w-full flex text-xs font-black">
        <div className="game-card-edition">
          <span className="capitalize">{edition}</span> Edition
        </div>
        <div>Match #{matchId}</div>
        <div className="game-card-rarity-container absolute w-12 h-20">
          <RarityFlag color={rarityFlagColor} />
          <img
            className="game-card-treasure-chest z-index-3 absolute w-10 m-auto"
            src={blackChest}
            alt="white treasure chest"
          />
        </div>
      </div>
    </div>
  )
}

export default GameCard
