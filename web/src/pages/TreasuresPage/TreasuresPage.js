import { Link, routes } from '@redwoodjs/router'

const TreasuresPage = () => {
  return (
    <>
      <h1>TreasuresPage</h1>
      <p>
        Find me in <code>./web/src/pages/TreasuresPage/TreasuresPage.js</code>
      </p>
      <p>
        My default route is named <code>treasures</code>, link to me with `
        <Link to={routes.treasures()}>Treasures</Link>`
      </p>
    </>
  )
}

export default TreasuresPage
