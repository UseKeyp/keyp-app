import GameCard from './GameCard'

export const whiteWinWhiteEdition = () => {
  return (
    <div className="p-8">
      <GameCard
        title="User-Made Title"
        numMoves="42"
        winner="WHITE"
        blackPlayer="Chess.com User 02"
        matchId={9873678}
        rarityFlagColor="#5DCC36"
        edition="white"
        whitePlayer="Chess.com User 01"
        wonByText="Checkmate"
        variantText="Standard"
        openingText="Bird's Opening"
        gifUrl="https://media0.giphy.com/media/3o6ZsYLRb6IG6vAkcU/giphy.gif"
      />
    </div>
  )
}

export default { title: 'Components/GameCard' }
