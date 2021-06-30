import { render } from '@redwoodjs/testing'

import TreasurePage from './TreasurePage'

describe('TreasurePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasurePage treasureId="42" />)
    }).not.toThrow()
  })
})
