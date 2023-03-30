import { Icon } from '@usekeyp/components-soft-ui'

export function getStyledUsernameFromCurrentUser(currentUser, sizeVariant) {
  if (!currentUser?.id) {
    return ''
  }
  switch (currentUser.id.split('-')[0].toLowerCase()) {
    case 'discord':
      return (
        <div className={`flex text-[#5865F2] ${sizeVariant || 'text-[12px]'}`}>
          <div>{currentUser?.username}</div>
        </div>
      )
    case 'google':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'chess':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'twitter':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-[#1DA1F2]">{currentUser?.username}</div>
        </div>
      )
    case 'twitch':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-[#9146FF]">{currentUser?.username}</div>
        </div>
      )
    default:
      return (
        <div className={`flex text-gray-2000 ${sizeVariant || 'text-[12px]'}`}>
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
        <div className="mt-0.5 flex">
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
    case 'twitch':
      return (
        <div className="flex">
          <Icon height="9.75" width="12" name="twitch_logo_purple" />
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
