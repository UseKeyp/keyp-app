import users from '../../../../../scripts/seed/user'

import UserDetails from './UserDetails'

export const userTwitchConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <UserDetails user={users[2]} />
}

export const userTwitchNotConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <UserDetails user={users[3]} />
}

export const profileTwitchConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <UserDetails user={users[2]} isAccount />
}

export const profileTwitchNotConnected = () => {
  mockCurrentUser({
    twitchUsername: 'example_twitch_username',
  })

  return <UserDetails user={users[3]} isAccount />
}

export default { title: 'Components/UserDetails' }
