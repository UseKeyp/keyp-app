import { useState } from 'react'
import Avatar from 'src/components/Avatar'
import Chip from 'src/components/Chip'
import Button from 'src/components/Button/Button'
import { Link, routes } from '@redwoodjs/router'
import { TwitchIcon } from 'src/components/Icon'
import { useOAuth } from 'src/providers/oAuth'
import { WalletFill, Gear } from 'framework7-icons/react'

import UserBalance from 'src/components/User/UserBalance'
import UserMintCredits from 'src/components/User/UserMintCredits'

import globalConfig from 'src/global.config'

import { useWallet } from 'src/providers/wallet'

import Tooltip from 'src/components/Tooltip/Tooltip'

const TWITCH = 'TWITCH'

const TwitchLink = ({ isProfile, username: twitchUsername }) => {
  const { openOAuthUrl, revokeOAuth, isLoading } = useOAuth()
  const [username, setUsername] = useState(twitchUsername)
  const onClickTwitch = async () => {
    if (username) {
      const revoked = await revokeOAuth(TWITCH)
      if (revoked) setUsername('')
    } else {
      await openOAuthUrl(TWITCH)
    }
  }

  if (isProfile) {
    return (
      <Button disabled={isLoading} onClick={onClickTwitch} className="ml-2">
        <Tooltip
          id="twitch-tooltip"
          effect="solid"
          tooltipChild={
            <div className="flex flex-col text-md text-bold text-center">
              <div className="whitespace-nowrap">Earn $5 in credits</div>
              <div className="whitespace-nowrap">when you connect</div>
              <div className="whitespace-nowrap">your Twitch account</div>
            </div>
          }
          position="right"
          bgColor="dark"
        >
          <div className="flex flex-row">
            <TwitchIcon color={username ? undefined : '#ABB6B9'} />
            <p className="ml-1">{username ? 'Disconnect' : 'Connect'}</p>
            {!twitchUsername ? <Chip variant="credit" /> : <></>}
          </div>
        </Tooltip>
      </Button>
    )
  }
  if (username)
    return (
      <div className="ml-2 flex">
        <a
          href={`https://www.twitch.tv/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          <TwitchIcon />
        </a>
      </div>
    )
  return null
}

const UserDetails = ({ user, isProfile }) => {
  const { getAddress } = useWallet()

  return (
    <section className="user-details p-4">
      <div className="user-details--inner">
        <div className="user-details--avatar">
          <Avatar size="8rem" src={user.imageSrc} />
        </div>

        <div className="user-details--user-info">
          <h3>
            <a
              href={`${globalConfig.CHESS_COM_BASE_URL}users/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              {user.username}
            </a>
          </h3>

          {/* <div className="mt-2 user-details--user-content">
            {user.masterTitle && (
              <div className="bg-red px-[5px] py-[3px] rounded-[3px] mr-2">
                <p className="font-bold">{user.masterTitle}</p>
              </div>
            )}
            <TwitchLink username={user.twitchUsername} isProfile={isProfile} />
          </div> */}
          {!isProfile && user.address && (
            <div className="mt-4 w-full content-center user-details--user-content">
              <Button
                onClick={() => getAddress(user.address)}
                variant="green"
                size="small"
                className="w-40"
              >
                {t('Donate')}
              </Button>
            </div>
          )}
          {isProfile && (
            <div className="mt-4 grid  gap-4  user-details--user-content">
              <p>
                <Link to={routes.user({ usernameOrAddress: user.id })}>
                  {t('Public Profile')}
                </Link>
              </p>
            </div>
          )}
        </div>

        {isProfile && (
          <div className="user-details--funds-actions">
            <UserBalance />
            <div className="mt-2">
              <UserMintCredits />
            </div>
            <div className="mt-4">
              <Button
                to={routes.wallet()}
                variant="blue"
                size="small"
                className="w-32"
              >
                <div className="flex py-1 justify-center items-center">
                  <WalletFill className="w-6 h-6 mr-3" />
                  <div>{t('Wallet')}</div>
                </div>
              </Button>
            </div>
            <div>
              <Button
                to={routes.settings()}
                variant="grey"
                size="small"
                className="w-32 mt-4"
              >
                <div className="flex py-1 justify-center items-center">
                  <Gear className="w-6 h-6 mr-3" />
                  <div>{t('Settings')}</div>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default UserDetails
