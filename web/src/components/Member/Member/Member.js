import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import MemberActivityCell from 'src/components/MemberActivity/MemberActivityCell'
import GamesCell from 'src/components/Game/GamesCell'
import CardCell from 'src/components/CardCell'

const Member = ({ member }) => {
  const treasuresList = [
    ...member.treasuresPlayedBlack,
    ...member.treasuresPlayedWhite,
  ].sort((a, b) => new Date(a.endTime) < new Date(b.endTime))
  const [activeGameId, setActiveGameId] = React.useState(treasuresList[0]?.id)

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
              onRowClick={setActiveGameId}
              selectedRowId={activeGameId}
            />
          </div>
          <div>
            <br />
            <div className="flex justify-center items-center">
              <CardCell id={activeGameId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Member
