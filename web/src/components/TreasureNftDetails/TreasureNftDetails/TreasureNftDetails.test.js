import { render } from '@redwoodjs/testing'

import TreasureNftDetails from './TreasureNftDetails'

describe('TreasureNftDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureNftDetails />)
    }).not.toThrow()
  })
})
