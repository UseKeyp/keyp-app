import { Link, routes } from '@redwoodjs/router'

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const TreasuresList = ({ treasures }) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Black id</th>
            <th>White id</th>
            <th>Minter address</th>
            <th>Owner address</th>
            <th>Name</th>
            <th>Updated at</th>
            <th>Card color</th>
            <th>Black rating</th>
            <th>Duration</th>
            <th>White rating</th>
            <th>Termination</th>
            <th>End time</th>
            <th>Event</th>
            <th>Moves</th>
            <th>Move count</th>
            <th>Game rule variant</th>
            <th>Winner</th>
            <th>External url</th>
            <th>Opening</th>
            <th>Achievements</th>
            <th>Token id</th>
            <th>Minted at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {treasures.map((treasure) => (
            <tr key={treasure.id}>
              <td>{truncate(treasure.id)}</td>
              <td>{timeTag(treasure.createdAt)}</td>
              <td>{truncate(treasure.blackId)}</td>
              <td>{truncate(treasure.whiteId)}</td>
              <td>{truncate(treasure.minterAddress)}</td>
              <td>{truncate(treasure.ownerAddress)}</td>
              <td>{truncate(treasure.name)}</td>
              <td>{timeTag(treasure.updatedAt)}</td>
              <td>{truncate(treasure.cardColor)}</td>
              <td>{truncate(treasure.blackRating)}</td>
              <td>{truncate(treasure.timeControl)}</td>
              <td>{truncate(treasure.whiteRating)}</td>
              <td>{truncate(treasure.termination)}</td>
              <td>{timeTag(treasure.endTime)}</td>
              <td>{truncate(treasure.event)}</td>
              <td>{truncate(treasure.moves)}</td>
              <td>{truncate(treasure.moveCount)}</td>
              <td>{truncate(treasure.gameRuleVariant)}</td>
              <td>{truncate(treasure.winner)}</td>
              <td>{truncate(treasure.externalUrl)}</td>
              <td>{truncate(treasure.opening)}</td>
              <td>{truncate(treasure.achievements)}</td>
              <td>{truncate(treasure.tokenId)}</td>
              <td>{timeTag(treasure.mintedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.treasure({ id: treasure.id })}
                    title={'Show treasure ' + treasure.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTreasure({ id: treasure.id })}
                    title={'Edit treasure ' + treasure.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TreasuresList
