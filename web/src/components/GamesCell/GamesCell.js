import Games from 'src/components/Games'

export const QUERY = gql`
  query GamesQuery {
    games {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ games, ...rest }) => {
  return <Games games={games} {...rest} />
}
