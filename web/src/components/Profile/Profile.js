import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import UserDetails from 'src/components/User/UserDetails'
import UserActivityCell from 'src/components/User/UserActivityCell'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'
import FilterBar from 'src/components/FilterBar/FilterBar'
import { useFilter } from 'src/providers/filters'

const Profile = () => {
  const { currentUser } = useAuth()
  const { filter, sort, defaultParams } = useFilter()

  if (!currentUser) {
    return <></>
  }
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <UserDetails user={currentUser} isProfile />
          <UserActivityCell usernameOrAddress={currentUser?.username} />
        </div>
      </div>
      {/* <h1 className="mt-10">{t('Treasures Played')}</h1> */}
      <div className="flex mt-4 h-[476px]"></div>
    </div>
  )
}

export default Profile
