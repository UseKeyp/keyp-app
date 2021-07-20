import GameCard from './GameCard'

export const whiteWinWhiteEdition = () => {
  return (
    <div className="p-8">
      <GameCard
        achievements={["Intro: Queen's Gambit", 'Won While Down']}
        title="User-Made Title"
        numMoves="42"
        winner="WHITE"
        blackPlayer="user 2"
        blackPlayerRating="234"
        matchId={9873678}
        rarityFlagColor="#5DCC36"
        edition="white"
        whitePlayer="GM Hikaru"
        whitePlayerRating="1234"
        wonByText="Checkmate"
        variantText="Standard"
        openingText="Bird's Opening"
        gifUrl="https://media0.giphy.com/media/3o6ZsYLRb6IG6vAkcU/giphy.gif"
      />
    </div>
  )
}

export default { title: 'Components/GameCard' }
