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
  const onClick = (id) => {
    const activeGame = games.find((game) => game.id === id)
    onRowClick(activeGame)
  }
  return (
    <Table
      data={formatGamesForTable(games)}
      onRowClick={onClick}
      selectedRowId={selectedRowId}
    />
  )
}

export default Games
