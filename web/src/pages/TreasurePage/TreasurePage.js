import { Link, routes } from '@redwoodjs/router'

const TreasurePage = ({ treasureId }) => {
  return (
    <>
      <h1>TreasurePage</h1>
      <p>
        Find me in <code>./web/src/pages/TreasurePage/TreasurePage.js</code>
      </p>
      <p>
        My default route is named <code>treasure</code>, link to me with `
        <Link to={routes.treasure({ treasureId: '42' })}>Treasure 42</Link>`
      </p>
      <p>The parameter passed to me is {treasureId}</p>
    </>
  )
}

export default TreasurePage
