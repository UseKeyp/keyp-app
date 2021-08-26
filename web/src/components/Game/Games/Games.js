import Table from 'src/components/Table'

const Games = ({ games, onRowClick, selectedRowId }) => {
  const formatGamesForTable = (games) => {
    return games.map((game) => {
      const { white, black, winner, outcome, moveCount, id } = game
      return {
        id,
        White: white.id,
        Black: black.id,
        Winner: winner.id,
        Result: outcome,
        Moves: moveCount,
      }
    })
  }
  return (
    <Table
      data={formatGamesForTable(games)}
      onRowClick={onRowClick}
      selectedRowId={selectedRowId}
    />
  )
}

export default Games
