import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import GameCard from 'src/components/GameCard/GameCard'
import MemberActivityCell from 'src/components/MemberActivityCell'
import GamesCell from 'src/components/GamesCell'

const Member = ({ member }) => {
  const [activeMatchId, setActiveMatchId] = React.useState('')

  const handleRowClick = (id) => {
    if (id === activeMatchId) {
      setActiveMatchId('')
    } else {
      setActiveMatchId(id)
    }
  }
  const getActiveMatch = () => {
    const current = matchesData.find((match) => match.id === activeMatchId)
    if (!current) return
    return <GameCard {...current} />
  }
  const treasuresList = [
    ...member.treasuresPlayedBlack,
    ...member.treasuresPlayedWhite,
  ].sort((a, b) => new Date(a.endTime) < new Date(b.endTime))

  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Personal Profile</h1>
            <br />
            <ProfileBox member={member} />
          </div>
          <div>
            <MemberActivityCell address={member.address} />
          </div>
        </div>
      </div>
      <br />
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Chess.com Games</h1>
            <GamesCell
              id={member.id}
              onRowClick={handleRowClick}
              selectedRowId={activeMatchId}
            />
          </div>
          <div>
            <br />
            <div className="flex justify-center items-center">
              {/*  {getActiveMatch()}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Member
