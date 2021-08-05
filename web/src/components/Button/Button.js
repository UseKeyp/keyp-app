import PropTypes from 'prop-types'

const Button = ({ children, variant, onClick }) => {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'grey',
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
}

export default Button
