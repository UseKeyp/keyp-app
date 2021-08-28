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

const cutMatch = {
  result: 'White won',
  moves: 46,
  date: 'April, 20 2020',
}

const data = [match, match, match, match, match, match]

const smallerData = [
  { ...cutMatch, id: 1 },
  { ...cutMatch, id: 2 },
  { ...cutMatch, id: 3 },
]

const proportions = [4, 1, 1]

const handleRowClick = (id) => {
  /* eslint-disable-next-line no-console */
  console.log(`Row with id "${id}" has been clicked`)
}

export const generated = () => {
  return <Table onRowClick={handleRowClick} data={data} maxHeight={300} />
}

export const withCustomProportions = () => {
  return (
    <Table
      onRowClick={handleRowClick}
      data={smallerData}
      colProportions={proportions}
    />
  )
}

export const selectedRowId = () => {
  return (
    <Table onRowClick={handleRowClick} data={smallerData} selectedRowId={2} />
  )
}

export default { title: 'Components/Table' }
