import Table from 'src/components/Table'

const Games = ({ games, onRowClick, selectedRowId }) => {
  const formatGamesForTable = (games) => {
    return games.map((game) => {
      return {
        Id: game.id,
        White: game.whiteId,
        Black: game.blackId,
        Winner: game.outcome,
        Result: game.termination,
        Moves: game.moveCount,
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
