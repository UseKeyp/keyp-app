import Table from 'src/components/Table'

const Games = ({ games, onRowClick, selectedRowId }) => {
  const formatGamesForTable = (games) => {
    return games.map((game) => {
      const { whiteId, blackId, outcome, moveCount, id } = game
      return {
        id,
        White: whiteId,
        Black: blackId,
        Winner: outcome,
        Result: termination,
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
