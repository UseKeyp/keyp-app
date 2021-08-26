import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import Table from 'src/components/Table/Table'
import GameCard from 'src/components/GameCard/GameCard'

const Member = ({ member }) => {
  const [activeMatchId, setActiveMatchId] = React.useState('')

  // const userData = {
  //   avatar,
  //   date: '21st May 2021',
  //   name: 'Username',
  //   score: 1337,
  //   address: '0x706342C7F358cF05370db27ae0d9b1791ADefd08',
  // }

  // matchesData,
  // matchesTableData,
  // activitiesData,
  //
  // const handleRowClick = (id) => {
  //   if (id === activeMatchId) {
  //     setActiveMatchId('')
  //   } else {
  //     setActiveMatchId(id)
  //   }
  // }
  // const getActiveMatch = () => {
  //   const current = matchesData.find((match) => match.id === activeMatchId)
  //   if (!current) return
  //   return <GameCard {...current} />
  // }

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
            {/*  <Table
              data={activitiesData}
              colProportions={[4, 1, 1]}
              maxHeight={250}
            />*/}
          </div>
        </div>
      </div>
      <br />
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Chess.com Games</h1>
            {/*  <Table
              data={matchesTableData}
              onRowClick={handleRowClick}
              selectedRowId={activeMatchId}
            />*/}
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
