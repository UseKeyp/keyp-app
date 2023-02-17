import { useCallback, useEffect } from 'react'

import { Menu } from 'framework7-icons/react'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import Avatar from 'src/components/Avatar/Avatar'
import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import MobileMenu from 'src/components/MobileMenu/MobileMenu'
import SiteFooter from 'src/components/SiteFooter/SiteFooter'
import Tooltip from 'src/components/Tooltip/Tooltip'
import UserBalance from 'src/components/User/UserBalance'
import { useLocale } from 'src/providers/locale'
import { useRamp } from 'src/providers/ramp/ramp'
import { trimAddress } from 'src/utils/helpers'

const WalletBalance = () => {
  const { deposit } = useRamp()
  return (
    <div className="flex flex-col flex-1 text-sm">
      <div className={'header__nav__balance'}>
        <UserBalance />
      </div>
      <div>
        <Button
          onClick={deposit}
          textColor="blue"
          className={'header__nav__fund-wallet'}
        >
          {t('Add Funds')}
        </Button>
      </div>
    </div>
  )
}

const MobileNav = () => {
  const { isAuthenticated: isLoggedIn, logOut } = useAuth()
  const { t } = useLocale()

  const navItemClasses = 'block text-center mt-4 flex'
  const navAnchorClasses = 'text-center w-full font-bold'

  return (
    <MobileMenu triggerContents={<Menu className="w-7 h-7" />}>
      <div className="flex-1 flex justify-center">
        <nav>
          <ul className="h-full relative grid place-items-center">
            <li className={navItemClasses}>
              <Button to={routes.home()}>
                <Icon name="treasure_chess_full" height="35px" color="#fff" />
                <span className="sr-only">{t('home')}</span>
              </Button>
            </li>
            {!isLoggedIn ? (
              <li className={navItemClasses}>
                <Button className={navAnchorClasses} to={routes.login()}>
                  {t('Sign In')}
                </Button>
              </li>
            ) : (
              <>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} to={routes.account()}>
                    {t('Account')}
                  </Button>
                </li>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} onClick={logOut}>
                    {t('Log Out')}
                  </Button>
                </li>
                <div className="fixed bottom-0">
                  <SiteFooter />
                </div>
              </>
            )}
            <div className="fixed bottom-0">
              <SiteFooter />
            </div>
          </ul>
        </nav>
      </div>
    </MobileMenu>
  )
}

const Header = () => {
  const {
    isAuthenticated: isLoggedIn,
    currentUser: profile,
    logOut,
  } = useAuth()
  const { t } = useLocale()

  const imageSrc = profile?.imageSrc || null

  const address = trimAddress(profile?.address) || 'No address set'

  const handleUserStatus = useCallback(() => {
    if (profile) {
      if (profile?.banned) {
        logOut()
      }
    }
  }, [profile, logOut])

  useEffect(() => {
    handleUserStatus()
  }, [handleUserStatus])

  return (
    <div className={'header'}>
      <div className="flex flex-1 items-center justify-end lg:hidden">
        <MobileNav />
      </div>
      <div className={'header__nav hidden lg:flex'}>
        {isLoggedIn ? (
          <div className="flex items-center">
            <div className="mr-4 w-8 h-8 flex items-center justify-center">
              <Avatar size="32px" src={imageSrc} />
            </div>
            <div className="mr-4">
              <div className="flex flex-col text-sm text-left">
                <Button
                  to={routes.account()}
                  textColor="blue"
                  className="header__nav__username"
                >
                  {profile?.username}
                </Button>
                <div className="header__nav__address">{address}</div>
              </div>
            </div>
            <WalletBalance />
            <div className="ml-4">
              <Button onClick={logOut}>
                <Tooltip
                  id="logout-tooltip"
                  effect="solid"
                  text="Log Out"
                  position="bottom"
                  bgColor="dark"
                >
                  <Icon name="logout" color="grey" />
                </Tooltip>
              </Button>
            </div>
          </div>
        ) : (
          <Button to={routes.login()}>{t('Sign In')}</Button>
        )}
      </div>
    </div>
  )
}

export default Header
