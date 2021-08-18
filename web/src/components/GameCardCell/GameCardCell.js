import GameCard from 'src/components/GameCard/GameCard'

export const QUERY = gql`
  query FindMatchQuery($id: Int!) {
    match: match(id: $id) {
      id
      date
      bannerColors
      edition
      gameType
      gifUrl
      lengthOfGame
      notableFeatures
      players
      title
      winner
      wonBy
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div></div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ match }) => {
  const { id, date: _date, gameType, lengthOfGame, wonBy, ...rest } = match
  const date = new Date(_date)

  return (
    <GameCard
      matchId={id}
      matchDate={date}
      gameTypeString={gameType}
      lengthOfGameString={lengthOfGame}
      wonByText={wonBy}
      {...rest}
    />
  )
}
