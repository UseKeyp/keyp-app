import Table from './Table'

const players = (
  <div className="flex-col">
    <p>first</p>
    <p>second</p>
  </div>
)

const mint = <button>Mint</button>

const match = {
  id: 1,
  players,
  result: 'White won',
  moves: 46,
  date: 'April, 20 2020',
  mint,
}
const data = [match, match, match, match]

const handleRowClick = (id) => {
  console.log(`Row with id "${id}" has been clicked`)
}

export const generated = () => {
  return <Table onRowClick={handleRowClick} data={data} />
}

export default { title: 'Components/Table' }
