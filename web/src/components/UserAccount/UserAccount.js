import Icon from 'src/components/Icon/Icon'

export function getStyledUsernameFromCurrentUser(currentUser) {
  if (!currentUser?.id) {
    return ''
  }
  switch (currentUser.id.split('-')[0].toLowerCase()) {
    case 'discord':
      return (
        <div className="flex text-[#5865F2] text-[12px]">
          <div>{currentUser?.username}</div>
        </div>
      )
    case 'google':
      return (
        <div className="flex text-[12px]">
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'chess':
      return (
        <div className="flex text-[12px]">
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'twitter':
      return (
        <div className="flex text-[12px]">
          <div className="text-[#1DA1F2]">{currentUser?.username}</div>
        </div>
      )
    default:
      return (
        <div className="flex text-gray-2000 text-[12px]">
          {currentUser?.username}
        </div>
      )
  }
}

export function getProviderIconFromCurrentUser(currentUser) {
  if (!currentUser?.id) {
    return <></>
  }
  switch (currentUser.id.split('-')[0].toLowerCase()) {
    case 'discord':
      return (
        <div className="flex">
          <Icon height="9.75" width="12" name="discord" />
        </div>
      )
    case 'google':
      return (
        <div className="flex">
          <Icon height="9.75" width="12" name="google" />
        </div>
      )
    case 'chess':
      return (
        <div className="flex">
          <Icon height="9.75" width="12" name="chess_pawn" />
        </div>
      )
    case 'twitter':
      return (
        <div className="flex">
          <Icon height="9.75" width="12" name="twitter" />
        </div>
      )
    case 'node_oidc':
      return (
        <div className="flex">
          <Icon height="9.75" width="12" name="keypcircle" />
        </div>
      )
    default:
      return <></>
  }
}
const UserAccount = ({ currentUser, logOut }) => {
  return (
    <div
      className={`my-auto flex flex-row gap-x-16 rounded-md border border-gray-400 items-center p-2 ${
        currentUser?.username ? 'sm:gap-x-4' : 'sm:gap-x-2'
      }`}
    >
      {getProviderIconFromCurrentUser(currentUser)}
      {getStyledUsernameFromCurrentUser(currentUser) || <></>}
      <button
        className="text-[12px] font-light text-gray-400 hover:text-red-1200"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  )
}

export default UserAccount
