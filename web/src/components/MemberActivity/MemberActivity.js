import MiniButton from 'src/components/MiniButton'
import Table from 'src/components/Table/Table'

const MemberActivity = ({ memberActivity }) => {
  const getActivityRows = (activities) => {
    return [
      {
        activity: 'Your bid on item 123456789 was accepted!',
        date: 'April, 20 2020',
        action: (
          <MiniButton variant="green" onClick={(e) => handleClick(e)}>
            View
          </MiniButton>
        ),
      },
    ]
  }

  return (
    <div>
      <Table
        data={getActivityRows(activities)}
        colProportions={[4, 1, 1]}
        maxHeight={250}
      />
    </div>
  )
}

export default MemberActivity
