import Table from 'src/components/Table/Table'

const GameCard = ({ game }) => {
  const formatGameForTable = (game) => {
    const { white, black, winner, outcome, moveCount } = game
    return [
      {
        White: white.id,
        Black: black.id,
        Winner: winner.id,
        Result: outcome,
        Moves: moveCount,
      },
    ]
  }
  return <Table data={formatGameForTable(game)} />
}

export default GameCard
