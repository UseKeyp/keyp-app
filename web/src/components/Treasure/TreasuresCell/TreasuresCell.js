import { Link, routes } from '@redwoodjs/router'

import Treasures from 'src/components/Treasure/Treasures'

export const QUERY = gql`
  query TREASURES {
    treasures {
      id
      createdAt
      updatedAt
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No treasures yet. '}
      <Link to={routes.newTreasure()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ treasures }) => {
  return <Treasures treasures={treasures} />
}
