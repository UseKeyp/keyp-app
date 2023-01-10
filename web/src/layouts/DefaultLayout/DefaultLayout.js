import { useState } from 'react'

import { Person, WalletFill, QuestionCircle } from 'framework7-icons/react'
import { Tabbar, TabbarLink, Icon as KonstaIcon } from 'konsta/react'

import { navigate, routes, useLocation } from '@redwoodjs/router'

import Icon from 'src/components/Icon'
import { isMobile } from 'src/utils/helpers'

const DefaultLayout = ({ children, background }) => {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState(pathname.split('/')[1] || 'home')

  const onClick = (routeName) => {
    setActiveTab(routeName)
    navigate(routes[routeName]())
  }

  React.useEffect(() => {
    const cleanedPath = pathname.split('/')[1] || 'home'
    const tabs = ['wallet', 'profile']
    if (tabs.includes(cleanedPath)) setActiveTab(cleanedPath)
  }, [pathname])

  return (
    <div className={background ? background : 'chess-background'}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="max-w-7xl mx-4 sm:mx-auto px-0 sm:px-4 sm:max-w-screen">
            <div className="mx-4 min-h-screen mb-15 md:mb-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
