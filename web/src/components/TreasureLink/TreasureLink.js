import { routes, Link } from '@redwoodjs/router'

const TreasureLink = ({ treasure }) => {
  // const title = treasure.title.slice(0,10)
  return (
    <Link
      to={routes.treasure({ tokenId: treasure.tokenId })}
      className="flex space-x-2 font-bold align-center items-center w-32"
    ></Link>
  )
}

export default TreasureLink
