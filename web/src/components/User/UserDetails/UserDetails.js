import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button/Button'
import { Link, routes } from '@redwoodjs/router'
import { WalletFill, Gear } from 'framework7-icons/react'

import UserBalance from 'src/components/User/UserBalance'
import UserMintCredits from 'src/components/User/UserMintCredits'

import globalConfig from 'src/global.config'

const UserDetails = ({ user, isProfile }) => {
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
              <Button variant="green" size="small" className="w-40">
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
