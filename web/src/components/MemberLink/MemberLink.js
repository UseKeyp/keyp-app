import { trimAddress, isHexAddress } from 'src/utils/helpers'
import { routes, Link } from '@redwoodjs/router'

const MemberLink = ({ id, member }) => {
  // Pass a full member object, or just an id or address
  if (!member && !id) return <></>
  let idOrAddress = id
  if (member) idOrAddress = member.id || member.address
  const linkText = isHexAddress(idOrAddress)
    ? trimAddress(idOrAddress)
    : idOrAddress
  return <Link to={routes.member({ id: idOrAddress })}>{linkText}</Link>
}

export default MemberLink
