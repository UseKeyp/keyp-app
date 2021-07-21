const Avatar = ({ image, bgColor, size }) => {
  return (
    <di
      className="avatar"
      style={{ width: size, height: size, backgroundColor: bgColor }}
    >
      <img className="avatar-img" src={image} alt="avatar" />
    </di>
  )
}

Avatar.defaultProps = {
  bgColor: '#c4c4c4',
  size: 68,
}

export default Avatar
