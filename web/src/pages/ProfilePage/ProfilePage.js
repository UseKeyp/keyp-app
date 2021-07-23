import { useState } from 'react'
import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import Table from 'src/components/Table/Table'
import GameCard from 'src/components/GameCard/GameCard'

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
    <div>
      <h1>Personal Profile</h1>
      <br />
      <ProfileBox {...userData} />
      <br />
      <h1>Chess.com Matches</h1>
      <br />
      <Table
        data={matchesTableData}
        onRowClick={handleRowClick}
        selectedRowId={activeMatchId}
      />
      <br />
      <h1>Selected match</h1>
      {getActiveMatch()}
      <br />
      <h1>Activities</h1>
      <br />
      <Table data={activitiesData} colProportions={[4, 1, 1]} maxHeight={300} />
      <br />
    </div>
  )
}

export default ProfilePage
