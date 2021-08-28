import { useState } from 'react'
import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import Table from 'src/components/Table/Table'
import GameCard from 'src/components/Game/GameCard'

const ProfilePage = ({
  userData,
  matchesData,
  matchesTableData,
  activitiesData,
}) => {
  const [activeMatchId, setActiveMatchId] = useState('')

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

  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Personal Profile</h1>
            <br />
            <ProfileBox {...userData} />
          </div>
          <div>
            <Table
              data={activitiesData}
              colProportions={[4, 1, 1]}
              maxHeight={250}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Chess.com Matches</h1>
            <Table
              data={matchesTableData}
              onRowClick={handleRowClick}
              selectedRowId={activeMatchId}
            />
          </div>
          <div>
            <br />
            <div className="flex justify-center items-center">
              {getActiveMatch()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
