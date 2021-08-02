import PropTypes from 'prop-types'

const MiniButton = ({ variant, children, onClick }) => {
  return (
    <button onClick={onClick} className={`miniButton miniButton--${variant}`}>
      {children}
    </button>
  )
}

MiniButton.defaultProps = {
  variant: 'gold',
}
MiniButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
}

export default MiniButton
