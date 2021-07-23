import PropTypes from 'prop-types'
import { Row, Cell } from './components'

const Table = ({
  maxHeight,
  onRowClick,
  data,
  showId,
  colProportions,
  selectedRowId,
}) => {
  const headRow = Object.keys(data[0])
    .filter((item) => item !== 'id' && !showId)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))

  let colSizesMap
  if (colProportions) {
    const total = colProportions.reduce((prev, curr) => {
      return prev + curr
    }, 0)
    colSizesMap = colProportions.map((num) => (100 / total) * num)
  }

  const colSize = 100 / headRow.length
  const colStyles = { width: `${colSize}%` }

  const getColStyle = (i) => {
    if (colSizesMap) {
      return { width: `${colSizesMap[i]}%` }
    } else {
      return colStyles
    }
  }

  const rows = data.map((row, i) => {
    const id = row.id
    const isSelected = row.id === selectedRowId
    const dataArray = Object.entries(row)
      .map(([key, value]) => {
        if (key === 'id' && !showId) return
        return value
      })
      .filter((item) => typeof item !== 'undefined')

    const cells = dataArray.map((item, i) => (
      <Cell key={i} style={getColStyle(i)}>
        {item}
      </Cell>
    ))
    return (
      <Row
        key={i}
        index={i + 1}
        onClick={() => onRowClick(id)}
        isSelected={isSelected}
      >
        {cells}
      </Row>
    )
  })

  return (
    <div className="table-wrapper" style={{ maxHeight }}>
      <div className="table-component-wrapper" role="table">
        <div className="table-component flex-col">
          <Row className="table-component-head">
            {headRow.map((item, i) => (
              <Cell style={getColStyle(i)} key={item}>
                {item}
              </Cell>
            ))}
          </Row>
          {rows}
        </div>
      </div>
    </div>
  )
}

Table.defaultProps = {
  maxHeight: 600,
  showId: false,
  onRowClick: () => {},
}
Table.propTypes = {
  maxHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  data: PropTypes.object.isRequired,
  showId: PropTypes.bool,
  colProportions: PropTypes.arrayOf(PropTypes.number),
  selectedRowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Table
