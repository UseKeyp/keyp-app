import { useState } from 'react'

import UsernameSearchBar from 'src/components/UsernameSearchBar'
import { useFilter } from 'src/providers/filters'

const FilterBar = ({
  defaultParams,
  hideOnMobile = false,
  showScrollbar = false,
  disableUsername,
}) => {
  const { filter, setFilter, resetFilter } = useFilter()

  const [title, setTitle] = useState(filter.title)
  const [timeControl, setTimeControl] = useState(filter.timeControl)
  const [moveCount, setMoveCount] = useState(filter.moveCount)
  const [achievements, setAchievements] = useState(filter.achievements || [])
  const [opening, setOpening] = useState(
    filter.opening ?? defaultParams?.opening
  )
  const [color, setColor] = useState(filter.color)
  const [termination, setTermination] = useState(
    filter.termination ?? defaultParams?.termination
  )
  const [rarity, setRarity] = useState(filter.rarity)
  const [sale, setSale] = useState(filter.sale ?? defaultParams?.sale)
  const [outcome, setOutcome] = useState(
    filter.outcome ?? defaultParams?.outcome
  )
  const [lowPrice, setLowPrice] = useState(filter.lowPrice) // must be initialized to a string to control the input from initial render
  const [highPrice, setHighPrice] = useState(filter.highPrice)

  const updateFilter = () => {
    setFilter('filter', {
      ...(achievements?.length && { achievements }),
      ...(opening && opening !== defaultParams?.opening && { opening }),
      ...(color && { color }),
      ...(title && { title }),
      ...(timeControl && { timeControl }),
      ...(termination &&
        termination !== defaultParams?.termination && { termination }),
      ...(outcome?.length && outcome !== defaultParams?.outcome && { outcome }),
      ...(moveCount && { moveCount }),
      ...(rarity && { rarity }),
      ...(sale?.length && sale !== defaultParams?.sale && { sale }),
      ...(lowPrice && { lowPrice }),
      ...(highPrice && { highPrice }),
    })
  }
  const onReset = () => {
    setAchievements([])
    setOpening()
    setColor()
    setTitle()
    setTimeControl()
    setTermination(defaultParams?.termination)
    setOutcome(defaultParams?.outcome)
    setMoveCount()
    setRarity()
    setSale(defaultParams?.sale)
    setLowPrice() // must be initialized to a string to control the input from initial render
    setHighPrice()

    resetFilter()
  }

  React.useEffect(() => {
    updateFilter()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [
    achievements,
    opening,
    color,
    title,
    timeControl,
    termination,
    outcome,
    moveCount,
    rarity,
    sale,
    lowPrice,
    highPrice,
  ])

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  React.useEffect(() => updateFilter(), [])

  return (
    <div className="filterBarWrapper" data-hide-on-mobile={hideOnMobile}>
      <div className="filterBar" data-show-scrollbar={showScrollbar}>
        <div className="resetRow">
          <button className="reset" onClick={onReset}>
            Reset
          </button>
        </div>

        {!disableUsername && (
          <div className="dropdownRowSpacing">
            <h4 style={{ marginBottom: `0.5em` }}>Username</h4>
            <UsernameSearchBar />
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterBar
