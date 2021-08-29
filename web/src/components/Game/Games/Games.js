import Table from 'src/components/Table'

const formatDate = (date) => {
  return (
    <>
      {new Date(date).getMonth() + 1}
      {'/'}
      <span className="green-text">{new Date(date).getDate()}</span>
      {'/'}
      {new Date(date).getFullYear()}
    </>
  )
}

const Games = ({ games, onRowClick, selectedRowId }) => {
  const formatGamesForTable = (games) => {
    return games.map((game) => {
      return {
        id: game.id,
        White: game.whiteId,
        Black: game.blackId,
        Winner: game.outcome,
        Result: game.termination,
        Moves: game.moveCount,
        Date: formatDate(game.endTime),
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
