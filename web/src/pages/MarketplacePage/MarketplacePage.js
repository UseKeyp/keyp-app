import { Link, routes } from '@redwoodjs/router'

const MarketplacePage = () => {
  return (
    <>
      <h1>MarketplacePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/MarketplacePage/MarketplacePage.js</code>
      </p>
      <p>
        My default route is named <code>marketplace</code>, link to me with `
        <Link to={routes.marketplace()}>Marketplace</Link>`
      </p>
    </>
  )
}

export default MarketplacePage
