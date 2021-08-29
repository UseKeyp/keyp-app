import Table from 'src/components/Table/Table'

const GameCard = ({ game }) => {
  const formatGameForTable = (game) => {
    const { whiteId, blackId, winnerId, outcome, moveCount } = game
    return [
      {
        White: whiteId,
        Black: blackId,
        Winner: winnerId,
        Result: outcome,
        Moves: moveCount,
      },
    ]
  }
  return <Table data={formatGameForTable(game)} />
}

export default GameCard
