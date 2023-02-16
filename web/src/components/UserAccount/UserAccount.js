import Icon from 'src/components/Icon/Icon'

export function getStyledUsernameFromCurrentUser(currentUser) {
  if (!currentUser?.id) {
    return ''
  }
  switch (currentUser.id.split('-')[0].toLowerCase()) {
    case 'discord':
      return (
        <div className="flex text-[#5865F2]">
          <div>{currentUser?.username}</div>
        </div>
      )
    case 'google':
      return (
        <div className="flex">
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'chess':
      return (
        <div className="flex">
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'twitter':
      return (
        <div className="flex">
          <div className="text-[#1DA1F2]">{currentUser?.username}</div>
        </div>
      )
    default:
      return <div className="flex text-gray-2000">{currentUser?.username}</div>
  }
}

export function getProviderIconFromCurrentUser(currentUser) {
  if (!currentUser?.id) {
    return <></>
  }
  switch (currentUser.id.split('-')[0].toLowerCase()) {
    case 'discord':
      return (
        <div className="mt-1 flex">
          <Icon width="24" name="discord" />
        </div>
      )
    case 'google':
      return (
        <div className="mt-1 flex">
          <Icon height="10" width="20" name="google" />
        </div>
      )
    case 'chess':
      return (
        <div className="mt-1 flex">
          <Icon height="18" name="chess_pawn" />
        </div>
      )
    case 'twitter':
      return (
        <div className="mt-1 flex">
          <Icon height="18" width="18" name="twitter" />
        </div>
      )
    case 'node_oidc':
      return (
        <div className="mt-1 flex">
          <Icon height="18px" width="18px" name="keypcircle" />
        </div>
      )
    default:
      return <></>
  }
}
const UserAccount = ({ currentUser, logOut }) => {
  return (
    <div
      className={`my-auto flex flex-row gap-x-16 rounded-md border border-gray-400 p-2 ${
        currentUser?.username ? 'sm:gap-x-4' : 'sm:gap-x-2'
      }`}
    >
      {getProviderIconFromCurrentUser(currentUser)}
      {getStyledUsernameFromCurrentUser(currentUser) || <></>}
      <button
        className="text-sm font-light text-gray-400 hover:text-gray-800"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  )
}

export default UserAccount
