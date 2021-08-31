import { Link, routes } from '@redwoodjs/router'

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const Treasure = ({ treasure }) => {
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Treasure {treasure.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{treasure.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(treasure.createdAt)}</td>
            </tr>
            <tr>
              <th>Black id</th>
              <td>{treasure.blackId}</td>
            </tr>
            <tr>
              <th>White id</th>
              <td>{treasure.whiteId}</td>
            </tr>
            <tr>
              <th>Minter address</th>
              <td>{treasure.minterAddress}</td>
            </tr>
            <tr>
              <th>Owner address</th>
              <td>{treasure.ownerAddress}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{treasure.name}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(treasure.updatedAt)}</td>
            </tr>
            <tr>
              <th>Card color</th>
              <td>{treasure.cardColor}</td>
            </tr>
            <tr>
              <th>Black rating</th>
              <td>{treasure.blackRating}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{treasure.timeControl}</td>
            </tr>
            <tr>
              <th>White rating</th>
              <td>{treasure.whiteRating}</td>
            </tr>
            <tr>
              <th>Termination</th>
              <td>{treasure.termination}</td>
            </tr>
            <tr>
              <th>End time</th>
              <td>{timeTag(treasure.endTime)}</td>
            </tr>
            <tr>
              <th>Event</th>
              <td>{treasure.event}</td>
            </tr>
            <tr>
              <th>Moves</th>
              <td>{treasure.moves}</td>
            </tr>
            <tr>
              <th>Move count</th>
              <td>{treasure.moveCount}</td>
            </tr>
            <tr>
              <th>Game rule variant</th>
              <td>{treasure.gameRuleVariant}</td>
            </tr>
            <tr>
              <th>Winner</th>
              <td>{treasure.winner}</td>
            </tr>
            <tr>
              <th>External url</th>
              <td>{treasure.externalUrl}</td>
            </tr>
            <tr>
              <th>Opening</th>
              <td>{treasure.opening}</td>
            </tr>
            <tr>
              <th>Achievements</th>
              <td>{treasure.achievements}</td>
            </tr>
            <tr>
              <th>Token id</th>
              <td>{treasure.tokenId}</td>
            </tr>
            <tr>
              <th>Minted at</th>
              <td>{timeTag(treasure.mintedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTreasure({ id: treasure.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
      </nav>
    </>
  )
}

export default Treasure
