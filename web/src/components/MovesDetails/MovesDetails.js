import PropTypes from 'prop-types'

const parsePgn = (str) => {
  const list = str
    .split('.')
    .map((line, i) => {
      if (i === 0) return null
      let moves = `${i}${line}`
      moves = moves.split(' ')
      if (moves.length === 4) moves.splice(-1)
      return moves
    })
    .filter((item) => item !== null)
  return list
}

const MovesDetails = ({ title, movesList }) => {
  const list = parsePgn(movesList)

  return (
    <div className="moves-details">
      <h3 className="moves-details__title">{title}</h3>
      <ul className="moves-details__list">
        {list.map((round) => {
          const [turn, white, black] = round

          return (
            <li key={turn} className="moves-details__item">
              <div className="moves-details__item__inner">
                <span className="moves-details__item__detail">{turn}.</span>
                <span className="moves-details__item__detail">{white}</span>
                <span className="moves-details__item__detail">{black}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

MovesDetails.propTypes = {
  title: PropTypes.string.isRequired,
  movesList: PropTypes.string.isRequired,
}

export default MovesDetails
