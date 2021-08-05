import PropTypes from 'prop-types'

const MovesDetails = ({ heading, movesList }) => {
  return (
    <div className="moves-details">
      <h3 className="moves-details__heading">{heading}</h3>
      <ul className="moves-details__list">
        {movesList.map(({ move, from, to }) => (
          <li key={move} className="moves-details__item">
            <div className="moves-details__item__inner">
              <span className="moves-details__item__detail">{move}.</span>
              <span className="moves-details__item__detail">{from}</span>
              <span className="moves-details__item__detail">{to}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

MovesDetails.propTypes = {
  heading: PropTypes.string.isRequired,
  movesList: PropTypes.array.isRequired,
}

export default MovesDetails
