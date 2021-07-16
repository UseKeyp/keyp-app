import { Row, Cell } from './components'

const Table = ({ maxHeight, onRowClick, data, showId }) => {
  const headRow = Object.keys(data[0])
    .filter((item) => item !== 'id' && !showId)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))

  const colSize = 100 / headRow.length
  const colStyles = { width: `${colSize}%` }

  const rows = data.map((row, i) => {
    const id = row.id
    const dataArray = Object.entries(row)
      .map(([key, value]) => {
        if (key === 'id' && !showId) return
        return value
      })
      .filter((item) => typeof item !== 'undefined')
    const cells = dataArray.map((item, i) => (
      <Cell key={i} style={colStyles}>
        {item}
      </Cell>
    ))
    return (
      <Row key={i} onClick={() => onRowClick(id)}>
        {cells}
      </Row>
    )
  })

  return (
    <div className="table-wrapper" style={{ maxHeight }}>
      <div className="table-component-wrapper">
        <Row className="table-component-head">
          {headRow.map((item) => (
            <Cell style={colStyles} key={item}>
              {item}
            </Cell>
          ))}
        </Row>
        <div className="table-component flex-col">{rows}</div>
      </div>
    </div>
  )
}

Table.defaultProps = {
  maxHeight: 600,
  showId: false,
}

export default Table
