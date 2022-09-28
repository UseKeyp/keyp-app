import UserDetails from 'src/components/User/UserDetails'
import UserActivityCell from 'src/components/User/UserActivityCell'
import { routes } from '@redwoodjs/router'
import { useFilter } from 'src/providers/filters'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'
import { MetaTags } from '@redwoodjs/web'

const User = ({ user, isLoading }) => {
  const { filter, sort, defaultParams } = useFilter()
  //const twitchSrc = `https://player.twitch.tv/?channel=${user.twitchUsername}&parent=${process.env.APP_DOMAIN}&muted=true&autoplay=true`
  // To test locally, uncomment and use domain "localhost"
  // const twitchSrc = `https://player.twitch.tv/?channel=jpegjames&parent=localhost&muted=true&autoplay=true`
  return (
    <div className="max-width-container">
      {user && <MetaTags title={user?.username} />}
      <div className="grid grid-rows-1 gap-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <UserDetails user={user} isLoading={isLoading} />
          <UserActivityCell usernameOrAddress={user.username} />
        </div>
      </div>
      {/*user.twitchUsername && (
        <div className="mt-10 px-2 w-full flex justify-center bg-black rounded-xl border-4 border-[#5A3E85]">
          <iframe
            title={`Twitch stream for ${user.twitchUsername}`}
            src={twitchSrc}
            allowFullScreen
            width={400}
            height={300}
          ></iframe>
        </div>
      )*/}

      <h1 className="mt-10">{t('Treasures Played')}</h1>
      <div className="flex mt-4"></div>
      <h1 className="mt-10">{t('Treasures Owned')}</h1>
      <div className="flex mt-4">
        <div className="md:mr-4 w-full">
          <div className="flex w-full justify-end relative mb-4">
            <SortingDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
